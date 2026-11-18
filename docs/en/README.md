# mj_repo_saas

[한국어](../../README.md) · [English](README.md) · [日本語](../ja/README.md) · [Español](../es/README.md) · [简体中文](../zh-CN/README.md)

**A dashboard that organizes multiple GitHub repositories into project cards.**

Group frontend, API, and documentation repositories into one project to understand its purpose and deployment progress at a glance.

> Current implementation includes local GitHub account repository lists and GitHub/GitLab.com repository statistics.

## Run locally

With Node.js 20 or later, run this command from the repository root.

```sh
node server.mjs
```

Choose 한국어, English, 日本語, Español, or 简体中文 at the top of the page. The main dashboard and Atlas share the browser's saved language preference. Repository descriptions and user input retain their original language.

- Open [Project Atlas](http://127.0.0.1:9090/atlas/) and expand **Project flow · Details → Expand graph** on the `mj_repo_saas` card.
- Import another GitHub repository and expand its details to load a saved graph or generate one using the local Graphify CLI. `graphify` must be on the server's PATH. Analysis covers up to 24 supported code files from the default branch. Larger repositories display a partial graph.
- Imported Atlas cards and generated graphs, including private repository data, are stored in this browser's local storage. Tokens are kept only in the open page. To regenerate a private graph after reopening the page, import the repository again with a token granting **Contents: Read-only**.
- On the [main dashboard](http://127.0.0.1:9090/), GitHub cards survive page reloads. Their details reuse existing graphs from the same browser and origin.
- Enter a profile such as `https://github.com/owner` to load its public repositories. **Load detailed statistics** retrieves weekly commits, Watch counts, and language shares.
- For private GitHub repositories, enter a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) under **GitHub token (optional)**. Grant **Metadata: Read-only** for selected repositories and **Contents: Read-only** for commits and Graphify.
- An individual GitHub or public GitLab.com repository URL loads a detailed card directly. GitLab.com cards last for the open page.

## Planned first-version features

1. Create cards from public GitHub or GitLab.com repository URLs.
2. Group related repositories and edit their roles and project descriptions.
3. Expand user/component flows and follow repository, release, and deployment links.
4. Distinguish GitHub releases, repository tags, and deployment evidence. Show an unverified release status when evidence is missing.

For example, one card can group frontend, API, and documentation repositories, with a deployment link, GitHub release v0.3.0, and documentation site respectively. This version is illustrative.

## Documents

- [Product plan](PRODUCT_PLAN.md) covers users, MVP, evidence, privacy, acceptance criteria, and roadmap.
- [Graphify code pilot](GRAPHIFY_PILOT.md) covers reproduction, extracted connections, and limitations.

Automatic refresh will be considered after initial validation.
