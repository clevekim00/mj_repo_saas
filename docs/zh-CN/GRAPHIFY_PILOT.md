# Graphify 代码结构试点

[한국어](../GRAPHIFY_PILOT.md) · [English](../en/GRAPHIFY_PILOT.md) · [日本語](../ja/GRAPHIFY_PILOT.md) · [Español](../es/GRAPHIFY_PILOT.md) · [简体中文](GRAPHIFY_PILOT.md)

本试点分析公开提交 [`365ab5b`](https://github.com/clevekim00/mj_repo_saas/commit/365ab5bef0fbe41c57785892b44ab5f9601bf52c) 中的 `public/app.js`、`server.mjs`，输入为这两个文件的公开快照。安装方式见 [Graphify 官方文档](https://github.com/Graphify-Labs/graphify)。试点使用已安装的 CLI `0.8.43` 验证。

在仓库根目录执行。

```sh
sh scripts/graphify-pilot.sh
```

脚本在临时目录生成 `graph.json`、`graph.html`、`GRAPH_REPORT.md`，并输出路径。使用 `graphify update` 的本地代码分析。应用/Codex 配置、Git hooks 和全局图谱不属于本试点的修改范围。生成的 `graph.html` 是独立可视化输出，仪表板中的 Graphify 视图由另一套集成实现。

## 验证结果

两个文件共提取 21 个节点、25 条连接，均标记为 `EXTRACTED`。`upsertCard()` → `createCard()`、`createCard()` → `projectFields()`、`commitChart()` 与源码一致。虽然包含 `server.mjs`，但未提取 `createApp()` 内的 API 路由、缓存分支及浏览器到服务器的 HTTP 连接。

直接检查源码后确认的查询流程如下。

1. [`public/app.js`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/public/app.js) 接收用户输入，经 `fetchRepository()` 请求 `GET /api/repository`。
2. [`server.mjs`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/server.mjs) 校验 URL，单个公开仓库查询复用缓存或进行中的请求，也可查询 GitHub/GitLab。个人主页和认证 GitHub 请求使用独立路径。
3. `public/app.js` 将响应传给 `upsertCard()` → `createCard()` 显示卡片。

图谱用于代码探索。完整项目流程需要根据源码另行建模 HTTP 边界和服务器内部流程。运行行为、实际部署和发布版本需要额外证据。
