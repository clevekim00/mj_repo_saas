import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const maxFiles = 24;
const maxFileBytes = 128 * 1024;
const maxNodes = 240;
const maxEdges = 800;
const codePath = /^(?:[a-z\d_-][\w.-]*\/)*[a-z\d_-][\w.-]*\.(?:[cm]?js|jsx|ts|tsx|py|rs|go|java|kt|kts|swift|dart|rb|php|cs|c|cc|cpp|h|hpp)$/i;
const ignoredDirectory = /(?:^|\/)(?:node_modules|vendor|dist|build|target|coverage|graphify-out)\//i;

export class GraphifyError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function githubJson(path, token, fetchUpstream, signal) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetchUpstream(`https://api.github.com/${path}`, { headers, signal }).catch(() => {
    if (signal.aborted) throw new GraphifyError(504, 'GitHub 소스 파일을 가져오는 데 시간이 너무 오래 걸렸어요.');
    throw new GraphifyError(502, '로컬 서버에서 GitHub API에 연결할 수 없어요. 네트워크를 확인해 주세요.');
  });
  if (response.ok) return response.json();
  if (response.status === 429 || response.headers.get('x-ratelimit-remaining') === '0') {
    throw new GraphifyError(429, 'GitHub 조회 한도에 도달했어요. 잠시 후 다시 시도해 주세요.');
  }
  if (response.status === 401) throw new GraphifyError(401, 'GitHub 토큰이 유효하지 않거나 만료됐어요. 새 토큰으로 저장소를 다시 가져와 주세요.');
  if (response.status === 403) throw new GraphifyError(403, 'GitHub가 코드 조회를 거부했어요. 토큰의 Contents 읽기 권한을 확인해 주세요.');
  if (response.status === 404) {
    throw new GraphifyError(404, path.includes('/git/')
      ? 'GitHub에서 코드에 접근할 수 없어요. 토큰의 Contents 읽기 권한을 확인해 주세요.'
      : 'GitHub에서 저장소를 찾을 수 없어요. 주소를 확인하고, 비공개 저장소는 읽기 토큰으로 다시 가져와 주세요.');
  }
  if (response.status === 409) throw new GraphifyError(422, '저장소에 분석할 코드가 없어요.');
  throw new GraphifyError(502, 'GitHub에서 소스 파일을 가져오지 못했어요.');
}

export async function generateRepositoryGraph(path, token, fetchUpstream) {
  const signal = AbortSignal.timeout(45_000);
  const repo = `repos/${path}`;
  const get = endpoint => githubJson(endpoint, token, fetchUpstream, signal);
  const metadata = await get(repo);
  const tree = await get(`${repo}/git/trees/${encodeURIComponent(metadata.default_branch)}?recursive=1`);
  const candidates = tree.tree.filter(file =>
    file.type === 'blob' && ['100644', '100755'].includes(file.mode) &&
    /^[a-f0-9]{40}$/i.test(file.sha) && codePath.test(file.path) &&
    !ignoredDirectory.test(file.path) && !/\.min\.js$/i.test(file.path)
  );
  const files = candidates.filter(file => file.size <= maxFileBytes)
    .sort((a, b) => a.path.split('/').length - b.path.split('/').length || a.path.localeCompare(b.path))
    .slice(0, maxFiles);
  if (!files.length) throw new GraphifyError(422, '분석할 수 있는 코드 파일이 없어요.');

  const work = await mkdtemp(join(tmpdir(), 'atlas-graphify-'));
  try {
    const input = join(work, 'input');
    const home = join(work, 'home');
    await mkdir(home);
    for (let i = 0; i < files.length; i += 4) {
      const batch = await Promise.all(files.slice(i, i + 4).map(async file => {
        const blob = await get(`${repo}/git/blobs/${file.sha}`);
        if (blob.encoding !== 'base64' || blob.size > maxFileBytes) {
          throw new GraphifyError(502, '소스 파일을 읽을 수 없어요.');
        }
        const contents = Buffer.from(blob.content, 'base64');
        if (contents.length > maxFileBytes) throw new GraphifyError(502, '소스 파일이 너무 커요.');
        return { file, contents };
      }));
      for (const { file, contents } of batch) {
        const filename = join(input, file.path);
        await mkdir(dirname(filename), { recursive: true });
        await writeFile(filename, contents, { flag: 'wx' });
      }
    }
    try {
      await run('graphify', ['update', '.'], {
        cwd: input,
        timeout: 45_000,
        env: {
          HOME: home,
          PATH: process.env.PATH,
          GRAPHIFY_BACKEND: 'none',
          GRAPHIFY_NO_TIPS: '1',
          GRAPHIFY_QUERY_LOG_DISABLE: '1',
        },
      });
    } catch (error) {
      if (error.code === 'ENOENT') throw new GraphifyError(503, '로컬 서버에서 Graphify CLI를 찾을 수 없어요.');
      if (error.killed) throw new GraphifyError(504, '로컬 Graphify 분석 시간이 초과됐어요.');
      throw new GraphifyError(502, '로컬 Graphify CLI가 코드 분석 중 종료됐어요.');
    }
    const graph = JSON.parse(await readFile(join(input, 'graphify-out', 'graph.json'), 'utf8'));
    const nodes = graph.nodes.slice(0, maxNodes);
    if (!nodes.length) throw new GraphifyError(422, 'Graphify가 코드에서 그래프 항목을 찾지 못했어요.');
    const ids = new Map(nodes.map((node, index) => [node.id, index]));
    const edges = graph.links.filter(edge => ids.has(edge.source) && ids.has(edge.target));
    return {
      nodes: nodes.map(node => ({
        label: node.label, file: node.source_file, location: node.source_location, group: node.community,
      })),
      edges: edges.slice(0, maxEdges)
        .map(edge => ({ from: ids.get(edge.source), to: ids.get(edge.target), relation: edge.relation })),
      files: files.length,
      partial: tree.truncated || files.length < candidates.length ||
        nodes.length < graph.nodes.length || edges.length < graph.links.length || edges.length > maxEdges,
    };
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}
