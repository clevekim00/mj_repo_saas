"use strict";

const githubDialog = $("github-dialog");
const githubForm = $("github-form");
const githubToken = $("github-token");
const githubFeedback = $("github-feedback");
let githubImport;

function githubLocation(value) {
  const match = /^https:\/\/github\.com\/([a-z0-9-]+)(?:\/([a-z0-9_.-]+))?\/?$/i.exec(value.trim());
  if (!match) throw new Error("GitHub 프로필 또는 저장소 주소를 입력해 주세요.");
  const repo = match[2]?.replace(/\.git$/i, "");
  if (match[2] && (!repo || repo === "." || repo === "..")) throw new Error("저장소 주소를 확인해 주세요.");
  return { owner: match[1].toLowerCase(), repo };
}

async function githubRequest(path, token, signal) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = "Bearer " + token;
  const response = await fetch("https://api.github.com/" + path, {
    headers,
    signal,
    cache: "no-store",
    credentials: "omit",
  });
  if (response.ok) return response;
  if (response.status === 401) throw new Error("토큰이 유효하지 않거나 만료됐어요.");
  if (response.status === 429 || response.headers.get("x-ratelimit-remaining") === "0") {
    throw new Error("GitHub 조회 한도에 도달했어요. 잠시 후 다시 시도해 주세요.");
  }
  if (response.status === 403 || response.status === 404) {
    throw new Error("GitHub 주소와 토큰의 저장소 접근 권한을 확인해 주세요.");
  }
  throw new Error("GitHub에서 저장소 정보를 가져오지 못했어요.");
}

async function githubRepositories({ owner, repo }, token, signal) {
  if (repo) return [await (await githubRequest("repos/" + owner + "/" + repo, token, signal)).json()];
  const endpoints = ["users/" + owner + "/repos"];
  if (token) endpoints.push("user/repos");
  const results = new Map();
  for (const endpoint of endpoints) {
    for (let page = 1; ; page++) {
      const response = await githubRequest(endpoint + "?per_page=100&sort=full_name&page=" + page, token, signal);
      for (const item of await response.json()) {
        if (item.owner.login.toLowerCase() === owner) results.set(item.full_name.toLowerCase(), item);
      }
      if (!/;\s*rel="next"/.test(response.headers.get("link") || "")) break;
    }
  }
  return [...results.values()];
}

function mergeGitHubRepositories(repositories, token) {
  const byRepo = new Map(data.filter(p => p.repo).map(p => [p.repo.toLowerCase().replace(/\/$/, ""), p]));
  let added = 0;
  for (const repository of repositories) {
    const url = "https://github.com/" + repository.full_name;
    const key = url.toLowerCase();
    if (token) graphTokens.set(key, token);
    const metadata = {
      private: repository.private,
      language: repository.language,
      stars: repository.stargazers_count,
      watchers: repository.subscribers_count,
      forks: repository.forks_count,
    };
    const existing = byRepo.get(key);
    if (existing) {
      existing.github = metadata;
      continue;
    }
    const project = {
      name: repository.name, slug: repository.full_name, icon: "▦", state: "미확인",
      desc: repository.description || "", imported: true, flow: [], repo: url, github: metadata,
    };
    byRepo.set(key, project);
    data.push(project);
    added++;
  }
  saveLocal(importedKey, data.filter(project => project.github));
  renderStats();
  render();
  return added;
}

$("github-open").addEventListener("click", () => {
  githubFeedback.textContent = "";
  githubDialog.showModal();
});
$("github-close").addEventListener("click", () => githubDialog.close());
githubDialog.addEventListener("close", () => {
  githubImport?.abort();
  githubToken.value = "";
});

githubForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (githubImport) return;
  const button = githubForm.querySelector('[type="submit"]');
  const operation = new AbortController();
  githubImport = operation;
  button.disabled = true;
  githubFeedback.textContent = "GitHub 저장소를 조회하는 중이에요…";
  try {
    const location = githubLocation($("github-url").value);
    const token = githubToken.value.trim();
    const items = await githubRepositories(location, token, operation.signal);
    if (operation.signal.aborted) return;
    const added = mergeGitHubRepositories(items, token);
    githubToken.value = "";
    githubFeedback.textContent = items.length
      ? `저장소 ${items.length}개를 확인했어요. 새 카드 ${added}개를 추가했어요.`
      : "가져올 수 있는 저장소가 없어요.";
  } catch (error) {
    if (!operation.signal.aborted) githubFeedback.textContent = error instanceof TypeError
      ? "GitHub에 연결하지 못했어요. 네트워크를 확인하고 다시 시도해 주세요."
      : error.message;
  } finally {
    githubImport = undefined;
    button.disabled = false;
  }
});
