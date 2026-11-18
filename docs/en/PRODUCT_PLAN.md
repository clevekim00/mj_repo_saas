# mj_repo_saas product plan

[한국어](../PRODUCT_PLAN.md) · [English](PRODUCT_PLAN.md) · [日本語](../ja/PRODUCT_PLAN.md) · [Español](../es/PRODUCT_PLAN.md) · [简体中文](../zh-CN/PRODUCT_PLAN.md)

Draft · 2026-11-14

## Product hypothesis

Independent developers and small teams may keep frontend, API, app, and documentation in separate repositories. They want to understand **what a project does, which repository to open, and what is usable today** before inspecting issues or commits.

The initial distinction is grouping repositories into **user-defined projects** and presenting deployment evidence for each component alongside one another. A project may contain one repository. GitHub Projects handles task tracking and DeepWiki explains individual repositories.

## Users and first screen

- Intended users are developers with several side projects and small teams managing multiple repositories.
- Card summaries include an icon, name, one-line purpose, short description, project status, and representative release evidence or verification status.
- Details show repository roles, hosting platform, languages, Star/Watch/Fork counts, a year of weekly commits, latest stable release and version, source links, last check time, and user or component flow. Optional fields appear when verified data exists. Details and weekly chart values support keyboard navigation.
- Lists support searches by name, description, or repository, status filters, and links to repository, release, and deployment pages.

## MVP workflow

1. Paste a public GitHub or GitLab.com repository URL without signing in. Deduplicate repositories. Explain private, deleted, and temporary failures only as far as the evidence allows.
2. Draft a card from public metadata and README. Without README, fill verified name and description and allow editing empty fields.
3. Merge or split cards, assign web/API/docs roles, and edit purpose, description, icon, and flow. An example template is user → web → API.
4. Save and reopen the dashboard in the browser. Browser-external sharing and cross-device synchronization are beyond the MVP guarantee.
5. Refresh collected repository data on user request, preserving user edits. On failure, show the last verified value and failure time.

## Data and display rules

| Information | Rule |
|---|---|
| Purpose, description, flow | Prefer user input, followed by README or repository description. Any future AI summary is an editable draft. |
| Development status | User-defined planning, development, testing, live, or on hold. Commit frequency does not determine status. |
| Platform and languages | Show hosting per repository. Compute GitHub percentages from language byte totals. If only the main language is known, show its name. [Languages API](https://docs.github.com/en/rest/repos/repos#list-repository-languages) |
| Star, Watch, Fork | Use `stargazers_count`, `subscribers_count`, and `forks_count`. Preserve zero and omit missing fields. Legacy `watchers_count` represents stars. [Watching API](https://docs.github.com/en/rest/activity/watching) |
| Commit activity | Bar chart of weekly commits over the last year on the default GitHub branch, excluding merges. Show week start and count, link to source, and retry after `202`. For `204` or unqueried data, omit the new chart. After update failure, retain prior values with check time. [Statistics API](https://docs.github.com/en/rest/metrics/statistics#get-the-last-year-of-commit-activity) |
| Latest stable release | Public stable GitHub Releases. Label prereleases separately. A tag alone is insufficient release evidence. |
| Deployment evidence | User-added deployment/store/download/docs links labeled by type. A URL alone does not verify functionality or deployment. |
| Release and version | Per component. Public documentation alone does not establish app release. Successful queries with missing evidence show “Release unverified”. Query failures show “Lookup failed”. |

The minimal model comprises projects, repositories with hosting/source URL, project–repository links with role/order, flow steps, and version/deployment evidence with source/check time. Languages, metrics, and activity are optional repository data with provenance. Keep user edits separate from collected data.

## Other repository services

| Service | Available data and conditions |
|---|---|
| GitLab.com | Project API provides Star/Fork and language percentages. Aggregate default-branch commits within a period. Omit public Watch, which project responses lack. [Projects](https://docs.gitlab.com/api/projects/) · [Commits](https://docs.gitlab.com/api/commits/) |
| Bitbucket Cloud | Repository `language` and commits are available. Watch/Fork counts come from separate paginated lists as far as accessible. Consider omitting language shares and Star. [Repositories](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-repositories/) · [Commits](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-commits/) |
| Codeberg | Forgejo-based, with Watch/Star/Fork and activity. Verify anonymous API access and language/commit responses on its instance before integration. [Repository guide](https://docs.codeberg.org/getting-started/first-repository/) · [Forgejo API](https://forgejo.org/docs/latest/user/api/usage/) |

Support public GitHub and GitLab.com repositories. GitLab aggregates commit timestamps into 52 weeks including this week, starting Sundays in UTC, excluding merges. Omit the chart if the period cannot be fully retrieved.

## Implementation and safety

- Reuse static cards, search, and details UI. Separate public lookups and refreshed values. Use the [GitHub REST API](https://docs.github.com/en/rest) for Releases, README, and metadata.
- Accept GitHub/GitLab.com repository URLs and request only their fixed API endpoints using parsed paths. Treat README as untrusted input and remove executable HTML when rendering.
- Cache and limit outbound requests, explaining rate limits. Keep server tokens out of browser responses.
- Begin with functionality usable without AI. If AI is added, treat README as summary data and ignore embedded instructions. Sending private content to external AI requires separate consent.
- For future private integration, request necessary read permissions for selected repositories through a [GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party). Block public sharing of private cards by default and define synchronization shutdown and deletion on disconnect.

## Initial acceptance criteria

- Add three public URLs, group two, and inspect purpose, roles, latest release, and evidence links **within three minutes**.
- Avoid incorrect release claims across stable-only, prerelease-only, tags-only, missing README, and rate-limit cases.
- Distinguish Watch zero from unavailable Watch. Pending or failed commit lookups must not appear as zero commits. Grouped repositories retain their own verified languages and metrics.
- Preserve edits across browser reloads and repository updates.
- Ask five initial users to create their own projects. Three completing a card unaided and two returning or refreshing within seven days guide direction. Avoid generalizing this small experiment.

## Sequence and business hypothesis

1. Public import, editing, grouping, and release evidence.
2. Observe early users. If sharing demand exceeds repeat visits, focus on portfolio generation. If repeat use and refresh demand are strong, focus on project management.
3. Once repeat use is established, evaluate private repositories and automatic refresh as paid candidates. Pricing remains undecided.

Outside the first version are Bitbucket/Codeberg, AI analysis of all code, team permissions, deployment automation, payments, and public portfolio hosting.
