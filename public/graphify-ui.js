"use strict";

window.graphifyUI = (() => {
  const graphRequests = new Map();
  const sessionGraphs = new Map();
  let graphId = 0;

  function readLocal(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }

  function saveLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function appendGraphify(container, root) {
    const id = ++graphId;
    const select = root.querySelector('select');
    const nodes = Array.from(root.querySelectorAll('[data-node]'));
    const edges = Array.from(root.querySelectorAll('[data-edge]'));
    select.addEventListener('change', () => {
      const selected = select.value;
      const neighbors = new Set([selected]);
      for (const edge of edges) {
        const endpoints = edge.dataset.edge.split(' ');
        const relevant = endpoints.includes(selected);
        if (relevant) endpoints.forEach(id => neighbors.add(id));
        edge.classList.toggle('dimmed', selected !== '' && !relevant);
      }
      for (const node of nodes) {
        node.classList.toggle('dimmed', selected !== '' && !neighbors.has(node.dataset.node));
      }
    });
    const expand = el("button", "graphify-button graphify-expand", "확대 보기");
    expand.type = "button";
    expand.setAttribute("aria-haspopup", "dialog");
    expand.setAttribute("aria-controls", "graphify-dialog-" + id);

    const dialog = el("dialog", "graphify-dialog");
    dialog.id = "graphify-dialog-" + id;
    dialog.setAttribute("aria-labelledby", "graphify-dialog-title-" + id);
    const header = el("div", "graphify-dialog-header");
    const title = el("h2", null, "Graphify 확대 보기");
    title.id = "graphify-dialog-title-" + id;
    const close = el("button", "graphify-button", "닫기");
    close.type = "button";
    close.autofocus = true;
    header.append(title, close);
    dialog.append(header);

    expand.addEventListener("click", () => {
      dialog.append(root);
      dialog.showModal();
      dialog.scrollTop = 0;
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      expand.after(root);
      expand.focus();
    });

    container.append(expand, root, dialog);
  }

  function appendRepositoryGraph(details, url, getToken) {
    const repo = url.toLowerCase();

    const panel = el("section", "repository-graph");
    const status = el("p", "graphify-status");
    status.setAttribute("role", "status");
    const failure = el("p", "graphify-error");
    failure.setAttribute("role", "alert");
    const retry = el("button", "graphify-button", "다시 시도");
    retry.type = "button";
    retry.hidden = true;
    panel.append(status, failure, retry);
    details.append(panel);
    let loading = false;
    let rendered = false;

    async function load() {
      if (!details.open || loading || rendered) return;
      loading = true;
      retry.hidden = true;
      failure.textContent = "";
      status.textContent = "Graphify 그래프를 불러오는 중이에요…";
      try {
        const graph = await repositoryGraph(repo, getToken);
        if (!panel.isConnected) return;
        appendGraphify(panel, renderRepositoryGraph(graph.data));
        status.textContent = graph.saved ? "" : "브라우저 저장 공간을 사용할 수 없어 이번 페이지에서만 그래프를 유지해요.";
        rendered = true;
      } catch (error) {
        status.textContent = "";
        failure.textContent = "그래프 생성 실패 · " + (error.message || "원인을 확인할 수 없어요.");
        retry.hidden = false;
      } finally {
        loading = false;
      }
    }
    details.addEventListener("toggle", load);
    retry.addEventListener("click", load);
  }

  async function repositoryGraph(repo, getToken) {
    const key = "atlas:graphify:v1:" + repo;
    const stored = readLocal(key, null);
    if (stored?.nodes?.length && Array.isArray(stored.edges)) return { data: stored, saved: true };
    if (sessionGraphs.has(repo)) return sessionGraphs.get(repo);
    if (graphRequests.has(repo)) return graphRequests.get(repo);

    const request = (async () => {
      const headers = { "X-Atlas-Graphify": "1" };
      const token = getToken();
      if (token) headers.Authorization = "Bearer " + token;
      const response = await fetch("/api/graphify?" + new URLSearchParams({ url: repo }), {
        method: "POST", headers, cache: "no-store",
      }).catch(() => {
        throw new Error("로컬 아틀라스 서버에 연결할 수 없어요. 서버가 실행 중인지 확인해 주세요.");
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const message = data?.message ?? "로컬 서버에서 Graphify 응답을 받지 못했어요. 최신 코드로 서버를 다시 시작해 주세요.";
        throw new Error(`${message} (HTTP ${response.status})`);
      }
      if (!data?.nodes?.length || !Array.isArray(data.edges)) {
        throw new Error("로컬 서버에서 읽을 수 있는 그래프 데이터를 받지 못했어요.");
      }
      const graph = { data, saved: saveLocal(key, data) };
      sessionGraphs.set(repo, graph);
      return graph;
    })();
    graphRequests.set(repo, request);
    try { return await request; }
    finally { graphRequests.delete(repo); }
  }

  function renderRepositoryGraph(graph) {
    const root = el("section", "dynamic-graphify");
    const count = `노드 ${graph.nodes.length}개 · 연결 ${graph.edges.length}개 · 분석 파일 ${graph.files}개`;
    root.append(el("h4", null, "Graphify 코드 그래프"), el("p", null, count));
    if (graph.partial) root.append(el("p", null, "저장소 전체에서 일부 코드와 연결을 표시해요."));
    const label = el("label", null, "연결 확인");
    const select = el("select");
    const all = el("option", null, "전체 노드");
    all.value = "";
    select.append(all);
    label.append(select);
    root.append(label);

    const svg = (tag, attrs, content) => {
      const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
      if (content !== undefined) element.textContent = content;
      return element;
    };
    const columns = 3;
    const positions = graph.nodes.map((_, index) => ({
      x: 72 + index % columns * 144,
      y: 23 + Math.floor(index / columns) * 43,
    }));
    const height = Math.ceil(positions.length / columns) * 43 + 4;
    const picture = svg("svg", { viewBox: `0 0 432 ${height}`, role: "img", "aria-label": "코드 노드와 연결" });
    for (const { from, to, relation } of graph.edges) {
      const a = positions[from];
      const b = positions[to];
      if (!a || !b) continue;
      const middle = (a.y + b.y) / 2;
      const d = a.y === b.y
        ? `M${a.x},${a.y} Q${(a.x + b.x) / 2},${a.y - 34} ${b.x},${b.y}`
        : `M${a.x},${a.y} C${a.x},${middle} ${b.x},${middle} ${b.x},${b.y}`;
      const edge = svg("path", { d, "data-edge": from + " " + to, class: relation === "contains" ? "contains" : "related" });
      edge.append(svg("title", {}, relation));
      picture.append(edge);
    }
    graph.nodes.forEach((node, index) => {
      const { x, y } = positions[index];
      const description = [node.label, node.file, node.location].filter(Boolean).join(" · ");
      const option = el("option", null, description);
      option.value = index;
      select.append(option);
      const mark = svg("g", { "data-node": index, class: "group-" + ((node.group ?? 0) % 3) });
      const name = node.label.length > 18 ? node.label.slice(0, 17) + "…" : node.label;
      mark.append(svg("title", {}, description), svg("rect", { x: x - 65, y: y - 11, width: 130, height: 22, rx: 5 }),
        svg("text", { x, y, "text-anchor": "middle", "dominant-baseline": "central" }, name));
      picture.append(mark);
    });
    root.append(picture);
    return root;
  }

  return { appendGraphify, appendRepositoryGraph, readLocal, saveLocal };
})();
