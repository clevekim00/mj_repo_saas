const form = document.querySelector('#lookup');
const input = document.querySelector('#repo-url');
const tokenInput = document.querySelector('#github-token');
const tokenGuide = document.querySelector('#token-guide');
const status = document.querySelector('#status');
const repositories = document.querySelector('#repositories');
const cards = new Map();
const savedGitHubCards = new Map();
const githubCardsKey = 'repository-dashboard:github-cards:v1';
const { appendRepositoryGraph, readLocal, saveLocal } = window.graphifyUI;
const number = new Intl.NumberFormat('ko-KR');
const date = new Intl.DateTimeFormat('ko-KR', { timeZone: 'UTC', dateStyle: 'medium' });

document.querySelector('#open-token-guide').addEventListener('click', () => tokenGuide.showModal());

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function commitChart(commits) {
  const section = element('section', 'commits');
  const figure = element('figure');
  const chart = element('div', 'chart');
  const value = element('p', 'chart-value');
  const highest = Math.max(1, ...commits.map(({ total }) => total));
  chart.setAttribute('aria-label', '주별 커밋 수. 좌우 방향키로 주를 이동할 수 있습니다.');
  chart.setAttribute('role', 'group');
  const bars = commits.map(({ week, total }, index) => {
    const label = `${date.format(week * 1000)} 시작 주 · 커밋 ${number.format(total)}건`;
    const button = element('button', 'bar');
    button.type = 'button';
    button.tabIndex = index === commits.length - 1 ? 0 : -1;
    button.setAttribute('aria-label', label);
    button.style.setProperty('--height', `${total / highest * 100}%`);
    button.addEventListener('pointerenter', () => { value.textContent = label; });
    button.addEventListener('focus', () => {
      for (const bar of bars) bar.tabIndex = bar === button ? 0 : -1;
      value.textContent = label;
    });
    button.addEventListener('keydown', (event) => {
      const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
      if (!step) return;
      event.preventDefault();
      bars[index + step]?.focus();
    });
    return button;
  });
  chart.append(...bars);
  const first = date.format(commits[0].week * 1000);
  const last = date.format(commits.at(-1).week * 1000);
  value.textContent = first === last ? first : `${first} – ${last}`;
  figure.append(chart, value);
  section.append(element('h3', '', '주간 커밋'), figure);
  return section;
}

function projectFields(repository) {
  const storageKey = `project-summary:${repository.url}`;
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    // The editor still works when browser storage is unavailable.
  }

  const summary = element('div', 'project-summary');
  const editor = element('details', 'project-editor');
  const editForm = element('form');
  const purpose = element('input');
  const description = element('textarea');
  const projectStatus = element('select');
  for (const [value, label] of [
    ['', '상태 선택'], ['기획', '기획'], ['개발', '개발'], ['테스트', '테스트'], ['운영', '운영'], ['보류', '보류'],
  ]) {
    const option = element('option', '', label);
    option.value = value;
    projectStatus.append(option);
  }
  purpose.value = saved.purpose ?? '';
  description.value = saved.description ?? repository.description ?? '';
  projectStatus.value = saved.status ?? '';

  for (const [label, input] of [
    ['프로젝트 목적', purpose], ['프로젝트 설명', description], ['프로젝트 상태', projectStatus],
  ]) {
    const field = element('label', '', label);
    field.append(input);
    editForm.append(field);
  }
  description.rows = 3;
  const saveStatus = element('p', 'detail-status');
  saveStatus.setAttribute('role', 'status');
  editForm.append(element('button', 'secondary-button', '저장'), saveStatus);
  editor.append(element('summary', '', '프로젝트 정보 편집'), editForm);

  function renderSummary() {
    summary.replaceChildren();
    const text = saved.description ?? repository.description;
    if (saved.purpose) summary.append(element('p', 'project-purpose', saved.purpose));
    if (text) summary.append(element('p', 'description', text));
    if (saved.status) summary.append(element('p', 'project-status', `상태 · ${saved.status}`));
  }

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saved = {
      purpose: purpose.value.trim(),
      description: description.value.trim(),
      status: projectStatus.value,
    };
    renderSummary();
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      saveStatus.textContent = '프로젝트 정보를 저장했습니다.';
    } catch {
      saveStatus.textContent = '현재 카드에 적용했습니다. 브라우저에 저장할 수 없습니다.';
    }
  });
  renderSummary();
  return [summary, editor];
}

function createCard(repository, showDetails = false) {
  const card = element('article', 'repository');
  const title = element('h2');
  const link = element('a', '', repository.name);
  link.href = repository.url;
  title.append(link);
  const platform = repository.private ? `${repository.platform} · 비공개` : repository.platform;
  card.append(element('p', 'platform', platform), title);
  card.append(...projectFields(repository));

  const metrics = element('dl', 'metrics');
  for (const [label, count] of [
    ['Star', repository.stars], ['Watch', repository.watchers], ['Fork', repository.forks],
  ]) {
    if (!Number.isInteger(count) || count < 0) continue;
    const metric = element('div');
    metric.append(element('dt', '', label), element('dd', '', number.format(count)));
    metrics.append(metric);
  }
  if (metrics.childElementCount) card.append(metrics);

  if (repository.languages.length) {
    const languages = element('section', 'languages');
    const list = element('ul');
    for (const { name, percent } of repository.languages) {
      const item = element('li', '', name);
      if (percent !== undefined) {
        const share = percent > 0 && percent < 0.1 ? '<0.1%' : `${number.format(Number(percent.toFixed(1)))}%`;
        item.append(element('span', '', share));
      }
      list.append(item);
    }
    languages.append(element('h3', '', '사용 언어'), list);
    card.append(languages);
  }
  if (repository.commits.length) card.append(commitChart(repository.commits));
  if (repository.platform === 'GitHub') {
    const graph = element('details', 'graphify-disclosure');
    graph.append(element('summary', '', '프로젝트 흐름 · 상세'));
    appendRepositoryGraph(graph, repository.url, () => tokenInput.value.trim());
    card.append(graph);
  }

  if (showDetails) {
    const button = element('button', 'details-button', '상세 통계 불러오기');
    button.type = 'button';
    const detailStatus = element('p', 'detail-status');
    detailStatus.setAttribute('role', 'status');
    button.addEventListener('click', async () => {
      button.disabled = true;
      detailStatus.textContent = '상세 통계를 조회하는 중…';
      try {
        const details = await fetchRepository(repository.url);
        if (cards.get(repository.url) !== card) return;
        upsertCard(details);
        if (details.url !== repository.url) {
          card.remove();
          cards.delete(repository.url);
          savedGitHubCards.delete(repository.url);
        }
        if (!saveGitHubCards()) status.textContent = '브라우저에 저장할 수 없어 이번 페이지에서만 변경 내용을 유지합니다.';
        cards.get(details.url).querySelector('h2 a').focus();
      } catch (error) {
        detailStatus.textContent = lookupError(error);
      } finally {
        button.disabled = false;
      }
    });
    card.append(button, detailStatus);
  }

  return card;
}

async function fetchRepository(url) {
  const token = tokenInput.value.trim();
  const headers = {};
  if (token && new URL(url).origin === 'https://github.com') {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`/api/repository?${new URLSearchParams({ url })}`, { headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

function upsertCard(repository, showDetails = false) {
  const existing = cards.get(repository.url);
  if (showDetails && existing && !existing.querySelector('.details-button')) return true;
  const card = createCard(repository, showDetails);
  if (existing) existing.replaceWith(card);
  else repositories.prepend(card);
  cards.set(repository.url, card);
  if (repository.platform === 'GitHub') savedGitHubCards.set(repository.url, { repository, showDetails });
  return Boolean(existing);
}

function saveGitHubCards() {
  return saveLocal(githubCardsKey, [...savedGitHubCards.values()]);
}

function lookupError(error) {
  return error instanceof TypeError || error instanceof SyntaxError
    ? '서버 응답을 받지 못했습니다. 다시 시도해 주세요.'
    : error.message || '저장소를 조회하지 못했습니다.';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = form.querySelector('button');
  if (submit.disabled) return;
  const url = input.value.trim();
  submit.disabled = true;
  status.textContent = '저장소를 조회하는 중…';
  try {
    const result = await fetchRepository(url);
    if (result.repositories) {
      for (const repository of result.repositories.toReversed()) upsertCard(repository, true);
      status.textContent = result.repositories.length
        ? `저장소 ${number.format(result.repositories.length)}개를 불러왔습니다.`
        : '조회할 수 있는 저장소가 없습니다.';
    } else {
      const existing = upsertCard(result);
      status.textContent = existing ? '저장소를 갱신했습니다.' : '저장소를 추가했습니다.';
    }
    if ((result.repositories || result.platform === 'GitHub') && !saveGitHubCards()) {
      status.textContent += ' 브라우저에 저장할 수 없어 이번 페이지에서만 카드를 유지합니다.';
    }
    if (input.value.trim() === url) input.value = '';
  } catch (error) {
    status.textContent = lookupError(error);
  } finally {
    submit.disabled = false;
  }
});

const restoredCards = readLocal(githubCardsKey, []);
if (Array.isArray(restoredCards)) {
  for (const { repository, showDetails } of restoredCards) upsertCard(repository, showDetails);
}
