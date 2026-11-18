# Graphify 코드 구조 파일럿

[한국어](GRAPHIFY_PILOT.md) · [English](en/GRAPHIFY_PILOT.md) · [日本語](ja/GRAPHIFY_PILOT.md) · [Español](es/GRAPHIFY_PILOT.md) · [简体中文](zh-CN/GRAPHIFY_PILOT.md)

공개 커밋 [`365ab5b`](https://github.com/clevekim00/mj_repo_saas/commit/365ab5bef0fbe41c57785892b44ab5f9601bf52c)의 `public/app.js`, `server.mjs` 두 파일만 분석합니다. 현재 작업 중인 파일, 문서, 비공개 저장소나 토큰은 분석하지 않습니다. [Graphify 공식 문서](https://github.com/Graphify-Labs/graphify)에서 설치 방법을 확인할 수 있습니다. 파일럿에서는 이미 설치된 CLI `0.8.43`으로 검증했습니다.

```sh
sh scripts/graphify-pilot.sh
```

스크립트는 임시 디렉터리에 `graph.json`, `graph.html`, `GRAPH_REPORT.md`를 생성하고 경로를 출력합니다. `graphify update`의 로컬 코드 분석만 사용하며, 앱·Codex 설정·Git 훅·글로벌 그래프에는 손대지 않습니다. `graph.html`은 별도의 시각화 출력이며 서비스에 배포하거나 카드에서 렌더링하지 않습니다.

## 검증 결과

두 파일에서 노드 21개와 연결 25개를 찾았으며, 연결은 모두 `EXTRACTED`로 표시됐습니다. `upsertCard()` → `createCard()`, `createCard()` → `projectFields()`·`commitChart()`는 실제 코드와 일치했습니다. `server.mjs`도 포함됐지만, `createApp()` 내부의 API 라우팅과 캐시 분기, 브라우저에서 서버로 이어지는 HTTP 연결은 추출되지 않았습니다.

원본 코드를 직접 확인한 조회 흐름은 아래와 같습니다. 이것은 **Graphify가 추출한 전체 경로가 아닙니다.**

1. [`public/app.js`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/public/app.js): 사용자 입력 → `fetchRepository()` → `GET /api/repository`.
2. [`server.mjs`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/server.mjs): URL 확인 → 공개 개별 조회는 캐시·진행 중 요청을 재사용하거나 GitHub/GitLab에 조회. 프로필과 인증된 GitHub 조회는 별도 경로를 사용.
3. `public/app.js`: 응답 → `upsertCard()` → `createCard()` → 카드 표시.

현재 그래프는 코드 탐색용으로 남깁니다. 카드에 프로젝트 흐름으로 표시하려면 먼저 HTTP 경계와 서버 내부 흐름을 소스 근거와 함께 별도로 모델링해야 합니다. 그래프가 런타임 동작, 실제 배포 상태나 출시 버전을 증명하지는 않습니다.
