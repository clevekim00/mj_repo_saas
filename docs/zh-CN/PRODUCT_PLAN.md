# mj_repo_saas 产品计划

[한국어](../PRODUCT_PLAN.md) · [English](../en/PRODUCT_PLAN.md) · [日本語](../ja/PRODUCT_PLAN.md) · [Español](../es/PRODUCT_PLAN.md) · [简体中文](PRODUCT_PLAN.md)

草案 · 2026-11-14

## 产品假设

独立开发者和小团队可能将前端、API、应用与文档放在不同仓库。在查看 Issue 或提交前，他们希望快速了解**项目做什么、应该打开哪个仓库、现在能使用什么**。

初期特色是将多个仓库整理为**用户定义的项目**，并并列展示各组件的部署依据。单个仓库也可构成项目。GitHub Projects 用于任务跟踪，DeepWiki 用于解释单个仓库。

## 用户与首屏

- 面向管理多个个人项目的开发者和管理多个仓库的小团队。
- 卡片摘要展示图标、名称、一句话目标、简短说明、项目状态、代表性发布依据或确认状态。
- 详情展示仓库角色、托管平台、语言、Star/Watch/Fork 数量、最近一年每周提交、最新稳定发布与版本、来源链接、最后确认时间、用户或组件流程。有可确认数据时显示可选字段，展开收起和每周图表值支持键盘操作。
- 列表支持名称、说明、仓库搜索，状态筛选，以及仓库、发布、部署页面跳转。

## MVP 使用流程

1. 无需登录粘贴公开 GitHub 或 GitLab.com 仓库 URL，去除重复仓库。对于私有、删除、临时错误，仅在证据允许的范围内解释。
2. 根据公开元数据和 README 创建卡片草稿。没有 README 时填写已确认名称和说明，允许编辑空白字段。
3. 合并或拆分卡片，指定 Web、API、文档等角色，编辑目标、说明、图标和流程。默认流程示例为用户 → Web → API。
4. 保存到浏览器后重新打开。MVP 的保证范围为同一浏览器内使用。
5. 用户请求刷新时更新收集的信息，保留用户编辑。查询失败时展示最后确认值和失败时间。

## 数据与显示规则

| 信息 | 规则 |
|---|---|
| 目标、说明、流程 | 用户输入优先，其次 README 或仓库描述。未来的 AI 摘要也应作为可编辑草稿。 |
| 开发状态 | 用户指定规划、开发、测试、运行、暂停等状态，不根据提交频率推断。 |
| 平台与语言 | 按仓库显示托管平台。GitHub 语言占比根据各语言字节合计计算，仅知道主要语言时只显示名称。 [语言 API](https://docs.github.com/en/rest/repos/repos#list-repository-languages) |
| Star、Watch、Fork | 使用 `stargazers_count`、`subscribers_count`、`forks_count`。保留零值，省略缺失字段。旧字段 `watchers_count` 表示 Star 数量。 [Watch API](https://docs.github.com/en/rest/activity/watching) |
| 提交活动 | 按 GitHub 默认分支展示最近一年每周提交柱状图，排除合并提交。可查看周起始日期、数量和原仓库链接。`202` 时稍后重试，`204` 或未查询时省略新图表。更新失败时保留旧值及确认时间。 [统计 API](https://docs.github.com/en/rest/metrics/statistics#get-the-last-year-of-commit-activity) |
| 最新稳定发布 | 使用公开稳定 GitHub Releases，预发布单独标注。单独标签不足以证明发布。 |
| 部署依据 | 用户登记的部署、商店、下载、文档链接按类型展示。仅登记 URL 无法确认功能运行或部署成功。 |
| 发布状态与版本 | 按组件展示。公开文档本身无法证明应用发布。查询成功但缺少依据时标注发布未确认，查询失败单独标注。 |

最小模型包括项目、带托管平台和原始 URL 的仓库、带角色与顺序的项目–仓库关联、流程步骤、带来源和确认时间的版本及部署依据。语言、指标、活动作为仓库可选数据并保存来源，用户编辑与自动采集数据分开。

## 其他仓库服务

| 服务 | 数据与条件 |
|---|---|
| GitLab.com | 项目 API 提供 Star/Fork 和语言占比，按时间范围汇总默认分支提交。项目响应缺少公开 Watch 数量，因此省略。 [项目](https://docs.gitlab.com/api/projects/) · [提交](https://docs.gitlab.com/api/commits/) |
| Bitbucket Cloud | 可使用 `language` 和提交列表。Watch/Fork 来自独立分页列表，按访问范围确认，考虑省略语言占比和 Star。 [仓库](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-repositories/) · [提交](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-commits/) |
| Codeberg | 基于 Forgejo，提供 Watch/Star/Fork 和活动。接入前确认实例匿名 API 范围及语言、提交响应。 [仓库指南](https://docs.codeberg.org/getting-started/first-repository/) · [Forgejo API](https://forgejo.org/docs/latest/user/api/usage/) |

支持公开 GitHub、GitLab.com 仓库。GitLab 按默认分支提交时间汇总 52 周，包含本周，以 UTC 周日开始并排除合并提交。如无法获取完整期间记录则省略图表。

## 实现方向与安全标准

- 复用静态卡片、搜索、详情 UI，将公开查询与自动更新值分离。使用 [GitHub REST API](https://docs.github.com/en/rest) 获取 Releases、README、元数据。
- 接受 GitHub、GitLab.com 仓库 URL，通过解析路径请求固定 API。README 视为不可信输入，渲染时移除可执行 HTML。
- 对外部请求使用缓存与限制，达到上限时提示。服务器令牌避免暴露到浏览器。
- 初期支持无需 AI 使用。未来使用 AI 时，将 README 当作摘要数据并忽略内嵌指令，向外部 AI 发送私有内容需要单独同意。
- 将来私有集成通过 [GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) 为所选仓库请求必要的读取权限。默认禁止公开分享私有卡片，断开连接时制定停止同步及数据删除策略。

## 初期验收标准

- 输入三个公开 URL，合并其中两个，在**三分钟内**查看目标、角色、最新发布和依据链接。
- 仅稳定发布、仅预发布、仅标签、无 README、达到限额等组合下，避免错误发布声明。
- 区分 Watch 为零和未提供。提交统计准备中或失败时避免显示为零提交。合并的仓库仍各自保留已确认语言和指标。
- 刷新浏览器或更新仓库信息后保留编辑内容。
- 邀请五位初期用户创建项目。三位无需帮助完成卡片、两位在七天内再次打开或更新，作为方向判断依据，避免泛化小样本结果。

## 顺序与商业假设

1. 公开仓库导入、编辑、分组、发布依据展示。
2. 观察早期用户。分享需求高于复访时聚焦作品集生成，复访和更新需求高时聚焦管理工具。
3. 确认重复使用后，将私有仓库集成和自动更新作为付费候选验证。价格未定。

首版范围之外包括 Bitbucket/Codeberg、全部代码的 AI 分析、团队权限、自动部署、支付和公开作品集托管。
