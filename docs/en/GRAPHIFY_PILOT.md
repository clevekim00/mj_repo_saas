# Graphify code-structure pilot

[한국어](../GRAPHIFY_PILOT.md) · [English](GRAPHIFY_PILOT.md) · [日本語](../ja/GRAPHIFY_PILOT.md) · [Español](../es/GRAPHIFY_PILOT.md) · [简体中文](../zh-CN/GRAPHIFY_PILOT.md)

This pilot analyzes `public/app.js` and `server.mjs` from public commit [`365ab5b`](https://github.com/clevekim00/mj_repo_saas/commit/365ab5bef0fbe41c57785892b44ab5f9601bf52c). Its input is this two-file public snapshot. Installation instructions are in the [Graphify documentation](https://github.com/Graphify-Labs/graphify). The pilot was verified with installed CLI version `0.8.43`.

Run from the repository root.

```sh
sh scripts/graphify-pilot.sh
```

The script creates `graph.json`, `graph.html`, and `GRAPH_REPORT.md` in a temporary directory and prints the path. It uses local code analysis through `graphify update`. App/Codex configuration, Git hooks, and the global graph are outside this pilot's changes. Its `graph.html` is a standalone visualization. The dashboard's integrated Graphify views are implemented separately.

## Verification results

The two files produced 21 nodes and 25 edges, all labeled `EXTRACTED`. The calls `upsertCard()` → `createCard()` and `createCard()` → `projectFields()`/`commitChart()` matched the source. Extraction covered `server.mjs` but omitted the API routing and cache branches inside `createApp()`, along with the browser-to-server HTTP boundary.

Source inspection establishes the following lookup flow.

1. [`public/app.js`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/public/app.js) takes user input through `fetchRepository()` to `GET /api/repository`.
2. [`server.mjs`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/server.mjs) validates the URL and reuses cache/in-progress requests or queries GitHub/GitLab for individual public repositories. Profiles and authenticated GitHub requests use separate paths.
3. `public/app.js` passes the response through `upsertCard()` → `createCard()` to display the card.

The graph supports code navigation. Modeling full project flows requires source-backed HTTP boundaries and server-internal flows. Runtime behavior, actual deployment, and release versions require additional evidence.
