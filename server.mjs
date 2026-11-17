import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { generateRepositoryGraph, GraphifyError } from './graphify.mjs';

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/atlas/', ['atlas/index.html', 'text/html; charset=utf-8']],
  ['/atlas/style.css', ['atlas/style.css', 'text/css; charset=utf-8']],
  ['/atlas/app.js', ['atlas/app.js', 'text/javascript; charset=utf-8']],
  ['/atlas/projects.js', ['atlas/projects.js', 'text/javascript; charset=utf-8']],
  ['/atlas/github-import.js', ['atlas/github-import.js', 'text/javascript; charset=utf-8']],
]);

const weekSeconds = 7 * 24 * 60 * 60;

function repositoryLocation(input) {
  const profile = /^https:\/\/github\.com\/([a-z0-9-]+)\/?$/i.exec(input?.trim() ?? '');
  if (profile) return { host: 'github.com', owner: profile[1].toLowerCase() };

  const match = /^https:\/\/(github\.com|gitlab\.com)\/([\w.-]+(?:\/[\w.-]+)+)\/?$/i.exec(input?.trim() ?? '');
  if (!match) return null;

  const host = match[1].toLowerCase();
  const segments = match[2].replace(/\.git$/i, '').split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) return null;
  if (host === 'gitlab.com' && segments.includes('-')) return null;
  if (host === 'github.com' && (segments.length !== 2 || !/^[\w-]+$/.test(segments[0]))) return null;
  const path = segments.join('/');
  return { host, path: host === 'github.com' ? path.toLowerCase() : path };
}

export function createApp(fetchUpstream = fetch, retryDelay = 1500) {
  const cache = new Map();
  const pending = new Map();
  let activeGraphs = 0;

  function github(path, token) {
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetchUpstream(`https://api.github.com/${path}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
  }

  function gitlab(path, signal = AbortSignal.timeout(8000)) {
    return fetchUpstream(`https://gitlab.com/api/v4/projects/${path}`, {
      headers: { Accept: 'application/json' },
      redirect: 'error',
      signal,
    });
  }

  async function optionalData(request, retry = false) {
    try {
      let response = await request();
      if (response.status === 202 && retry) {
        await delay(retryDelay);
        response = await request();
      }
      return response.status === 200 ? await response.json() : null;
    } catch {
      return null;
    }
  }

  function checkMetadata(response, platform, authenticated = false) {
    if (authenticated && response.status === 401) {
      return { status: 401, message: 'GitHub 토큰이 유효하지 않습니다. 토큰 값과 만료 여부를 확인해 주세요.' };
    }
    if (authenticated && response.status === 404) {
      return { status: 404, message: 'GitHub 주소와 토큰에 허용된 저장소를 확인해 주세요.' };
    }
    if (response.status === 404) {
      return {
        status: 404,
        message: `${platform}에서 공개 저장소를 찾을 수 없습니다. 주소와 저장소 공개 여부를 확인해 주세요.`,
      };
    }
    if (response.status === 429 || response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
      return { status: 429, message: `${platform} 조회 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.` };
    }
    if (authenticated && response.status === 403) {
      return { status: 403, message: 'GitHub 토큰의 저장소 접근 권한을 확인해 주세요.' };
    }
    if (response.status !== 200) throw new Error(`${platform} repository lookup failed`);
    return null;
  }

  function githubRepository(metadata, path) {
    return {
      platform: 'GitHub',
      name: metadata.full_name ?? path,
      url: `https://github.com/${path}`,
      description: metadata.description,
      stars: metadata.stargazers_count,
      watchers: metadata.subscribers_count,
      forks: metadata.forks_count,
      private: metadata.private,
      languages: metadata.language ? [{ name: metadata.language }] : [],
      commits: [],
    };
  }

  async function loadGitHubProfile(owner, token) {
    const repositories = new Map();
    const sources = token
      ? [['user/repos', token], [`users/${owner}/repos`, token]]
      : [[`users/${owner}/repos`, undefined]];
    for (const [endpoint, credential] of sources) {
      for (let page = 1; ; page++) {
        const query = new URLSearchParams({ per_page: '100', sort: 'full_name', page: String(page) });
        const response = await github(`${endpoint}?${query}`, credential);
        const error = checkMetadata(response, 'GitHub', Boolean(credential));
        if (error) return error;
        for (const metadata of await response.json()) {
          if (metadata.owner.login.toLowerCase() !== owner) continue;
          const path = metadata.full_name.toLowerCase();
          repositories.set(path, githubRepository(metadata, path));
        }
        if (!/;\s*rel="next"/.test(response.headers.get('link') ?? '')) break;
      }
    }
    return { status: 200, repositories: [...repositories.values()].sort((a, b) => a.name.localeCompare(b.name)) };
  }

  async function loadGitHub(path, token) {
    const response = await github(`repos/${path}`, token);
    const error = checkMetadata(response, 'GitHub', Boolean(token));
    if (error) return error;
    const metadata = await response.json();
    const [languageBytes, activity] = await Promise.all([
      optionalData(() => github(`repos/${path}/languages`, token)),
      optionalData(() => github(`repos/${path}/stats/commit_activity`, token), true),
    ]);
    const languages = Object.entries(languageBytes ?? {})
      .filter(([, bytes]) => Number.isFinite(bytes) && bytes > 0)
      .sort(([, left], [, right]) => right - left);
    const totalBytes = languages.reduce((total, [, bytes]) => total + bytes, 0);
    const commits = Array.isArray(activity)
      ? activity.filter(({ week, total }) =>
        Number.isInteger(week) && week > 0 && week <= 8.64e12 && Number.isInteger(total) && total >= 0
      ).sort((left, right) => left.week - right.week)
        .map(({ week, total }) => ({ week, total }))
      : [];

    return {
      status: 200,
      repository: {
        ...githubRepository(metadata, metadata.full_name?.toLowerCase() ?? path),
        languages: languages.length
          ? languages.map(([name, bytes]) => ({ name, percent: bytes / totalBytes * 100 }))
          : metadata.language ? [{ name: metadata.language }] : [],
        commits,
      },
      partial: languageBytes === null || activity === null,
    };
  }

  async function gitlabActivity(project, branch) {
    if (!branch) return [];

    const now = new Date();
    const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 1000;
    const start = midnight - now.getUTCDay() * 86400 - 51 * weekSeconds;
    const weeks = Array.from({ length: 52 }, (_, index) => ({ week: start + index * weekSeconds, total: 0 }));
    const seen = new Set();
    const query = new URLSearchParams({
      ref_name: branch,
      since: new Date(start * 1000).toISOString(),
      until: now.toISOString(),
      per_page: '100',
    });
    const signal = AbortSignal.timeout(12000);

    try {
      for (let page = 1; page <= 50; page++) {
        query.set('page', String(page));
        const response = await gitlab(`${project}/repository/commits?${query}`, signal);
        if (response.status !== 200) return null;
        const commits = await response.json();
        if (!Array.isArray(commits)) return null;
        for (const { id, committed_date, parent_ids } of commits) {
          const timestamp = Date.parse(committed_date) / 1000;
          if (!id || !Number.isFinite(timestamp) || !Array.isArray(parent_ids)) return null;
          const index = Math.floor((timestamp - start) / weekSeconds);
          if (index < 0 || index >= weeks.length || timestamp > now.getTime() / 1000 || seen.has(id)) continue;
          seen.add(id);
          if (parent_ids.length < 2) weeks[index].total++;
        }

        const nextPage = response.headers.get('x-next-page');
        const hasNextLink = /;\s*rel="next"/.test(response.headers.get('link') ?? '');
        if (!nextPage && !hasNextLink && (nextPage === '' || commits.length < 100)) {
          return seen.size ? weeks : [];
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  async function loadGitLab(path) {
    const response = await gitlab(encodeURIComponent(path));
    const error = checkMetadata(response, 'GitLab.com');
    if (error) return error;
    const metadata = await response.json();
    if (metadata.visibility !== 'public') {
      return { status: 404, message: '공개 저장소를 찾을 수 없습니다.' };
    }
    const project = encodeURIComponent(String(metadata.id ?? path));
    const [languageShares, commits] = await Promise.all([
      optionalData(() => gitlab(`${project}/languages`)),
      gitlabActivity(project, metadata.default_branch),
    ]);
    const canonicalPath = metadata.path_with_namespace ?? path;
    return {
      status: 200,
      repository: {
        platform: 'GitLab.com',
        name: canonicalPath,
        url: `https://gitlab.com/${canonicalPath.split('/').map(encodeURIComponent).join('/')}`,
        description: metadata.description,
        stars: metadata.star_count,
        forks: metadata.forks_count,
        languages: Object.entries(languageShares ?? {})
          .filter(([, percent]) => Number.isFinite(percent) && percent >= 0 && percent <= 100)
          .sort(([, left], [, right]) => right - left)
          .map(([name, percent]) => ({ name, percent })),
        commits: commits ?? [],
      },
      partial: languageShares === null || commits === null,
    };
  }

  function getRepository({ host, path }) {
    const key = `${host}/${path}`;
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.result;
    if (pending.has(key)) return pending.get(key);

    const loadRepository = host === 'gitlab.com' ? loadGitLab : loadGitHub;
    const request = loadRepository(path).then((result) => {
      if (result.status === 200) {
        if (cache.size >= 200) cache.delete(cache.keys().next().value);
        cache.set(key, { result, expires: Date.now() + (result.partial ? 30_000 : 300_000) });
      }
      return result;
    }).finally(() => pending.delete(key));
    pending.set(key, request);
    return request;
  }

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      if (url.pathname === '/api/graphify') {
        response.setHeader('Cache-Control', 'no-store');
        const reply = (status, body) => response.writeHead(status, {
          'Content-Type': 'application/json; charset=utf-8',
        }).end(JSON.stringify(body));
        if (request.method !== 'POST') {
          response.writeHead(405, { Allow: 'POST' }).end();
          return;
        }
        if (request.headers['x-atlas-graphify'] !== '1' || request.headers['sec-fetch-site'] === 'cross-site') {
          return reply(403, { message: '아틀라스 페이지에서 그래프를 요청해 주세요.' });
        }
        const location = repositoryLocation(url.searchParams.get('url'));
        if (location?.host !== 'github.com' || !location.path) {
          return reply(400, { message: '개별 GitHub 저장소 주소가 필요해요.' });
        }
        if (activeGraphs >= 2) return reply(429, { message: '다른 그래프를 생성 중이에요. 잠시 뒤 다시 시도해 주세요.' });
        const token = /^Bearer (\S+)$/i.exec(request.headers.authorization ?? '')?.[1];
        activeGraphs++;
        try {
          return reply(200, await generateRepositoryGraph(location.path, token, fetchUpstream));
        } catch (error) {
          return reply(error instanceof GraphifyError ? error.status : 502, {
            message: error instanceof GraphifyError ? error.message : '그래프를 생성하지 못했어요. 잠시 뒤 다시 시도해 주세요.',
          });
        } finally {
          activeGraphs--;
        }
      }
      if (request.method !== 'GET') {
        response.writeHead(405, { Allow: 'GET' }).end();
        return;
      }
      if (url.pathname === '/atlas') {
        response.writeHead(308, { Location: '/atlas/' }).end();
        return;
      }
      if (url.pathname === '/api/repository') {
        response.setHeader('Cache-Control', 'no-store');
        const location = repositoryLocation(url.searchParams.get('url'));
        const token = location?.host === 'github.com'
          ? /^Bearer (\S+)$/i.exec(request.headers.authorization ?? '')?.[1]
          : undefined;
        let result;
        if (!location) {
          result = { status: 400, message: 'GitHub 프로필 또는 GitHub·GitLab.com 저장소 URL을 입력해 주세요.' };
        } else if (location.owner) {
          result = await loadGitHubProfile(location.owner, token);
        } else if (token) {
          result = await loadGitHub(location.path, token);
        } else {
          result = await getRepository(location);
        }
        const body = result.repositories ? { repositories: result.repositories }
          : result.repository ?? { message: result.message };
        response.writeHead(result.status, { 'Content-Type': 'application/json; charset=utf-8' })
          .end(JSON.stringify(body));
        return;
      }
      const asset = assets.get(url.pathname);
      if (!asset) {
        response.writeHead(404).end();
        return;
      }
      const [file, contentType] = asset;
      const contents = await readFile(new URL(`./public/${file}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': contentType }).end(contents);
    } catch {
      response.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
        .end(JSON.stringify({ message: '저장소 정보를 가져오지 못했습니다. 다시 시도해 주세요.' }));
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = process.env.PORT || 9090;
  createApp().listen(port, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:${port}`);
  });
}
