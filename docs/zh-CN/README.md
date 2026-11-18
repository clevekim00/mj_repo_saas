# mj_repo_saas

[한국어](../../README.md) · [English](../en/README.md) · [日本語](../ja/README.md) · [Español](../es/README.md) · [简体中文](README.md)

**将多个 GitHub 仓库整理为项目卡片的仪表板。**

把前端、API、文档仓库归为同一项目，便于了解项目目标和部署进展。

> 当前已实现本地 GitHub 账户仓库列表，以及 GitHub、GitLab.com 仓库统计查询。

## 本地运行

使用 Node.js 20 或更高版本，在仓库根目录执行。

```sh
node server.mjs
```

在页面顶部选择 한국어、English、日本語、Español 或简体中文。语言选择保存在浏览器中，由主页面和 Atlas 共享。仓库描述和用户输入保持原文。

- 打开 [Project Atlas](http://127.0.0.1:9090/atlas/)，在 `mj_repo_saas` 卡片选择 **项目流程 · 详情 → 放大图谱**。
- 导入其他 GitHub 仓库并展开详情，可加载已保存图谱，或使用本地 Graphify CLI 生成。服务器 PATH 中需要有 `graphify`。最多分析默认分支的 24 个受支持代码文件，超过限制时显示部分图谱。
- Atlas 导入的卡片和生成的图谱，包括私有仓库数据，都保存在浏览器本地存储。令牌仅在当前页面中保留。重新打开页面后如需重新生成私有图谱，请使用具有 **Contents: Read-only** 权限的令牌再次导入仓库。
- [主页面](http://127.0.0.1:9090/)的 GitHub 卡片在刷新后恢复，详情会复用同一浏览器和同源地址下保存的图谱。
- 输入 `https://github.com/owner` 一类个人主页地址，可加载该账户拥有的公开仓库。**加载详细统计**用于查询每周提交、Watch 数量和语言占比。
- 查看私有仓库时，在 **GitHub 令牌（可选）** 中输入 [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)。为目标仓库授予 **Metadata: Read-only**，查看提交与 Graphify 时还需 **Contents: Read-only**。
- 输入单个 GitHub 或公开 GitLab.com 仓库地址可直接加载详细卡片。GitLab.com 卡片仅在当前页面保留。

## 首个版本的计划功能

1. 从公开 GitHub 或 GitLab.com 仓库 URL 创建卡片。
2. 合并相关仓库并编辑仓库角色和项目说明。
3. 展开用户或组件流程，跳转到仓库、发布和部署页面。
4. 区分 GitHub Releases、标签和实际部署依据，缺少依据时标记为发布未确认。

例如，一个卡片可包含前端、API 和文档仓库，分别展示部署链接、GitHub release v0.3.0 和文档网站。该版本号仅用于举例。

## 文档

- [产品计划](PRODUCT_PLAN.md)说明用户、MVP、数据依据、隐私、验收标准和路线图。
- [Graphify 代码试点](GRAPHIFY_PILOT.md)说明重现方式、提取的连接和限制。

自动更新将在初期验证后考虑。
