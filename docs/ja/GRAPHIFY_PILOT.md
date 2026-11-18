# Graphifyコード構造パイロット

[한국어](../GRAPHIFY_PILOT.md) · [English](../en/GRAPHIFY_PILOT.md) · [日本語](GRAPHIFY_PILOT.md) · [Español](../es/GRAPHIFY_PILOT.md) · [简体中文](../zh-CN/GRAPHIFY_PILOT.md)

公開コミット [`365ab5b`](https://github.com/clevekim00/mj_repo_saas/commit/365ab5bef0fbe41c57785892b44ab5f9601bf52c) の `public/app.js` と `server.mjs` を解析します。入力はこの公開スナップショットの二ファイルです。導入方法は[Graphify公式文書](https://github.com/Graphify-Labs/graphify)を参照してください。パイロットは導入済みCLI `0.8.43` で検証しました。

リポジトリのルートから実行します。

```sh
sh scripts/graphify-pilot.sh
```

一時ディレクトリに `graph.json`、`graph.html`、`GRAPH_REPORT.md` を生成し、パスを表示します。`graphify update` のローカルコード解析を使用します。アプリ・Codex設定、Gitフック、グローバルグラフはパイロットの変更対象外です。この `graph.html` は単独の可視化出力です。ダッシュボードの統合グラフ表示は別途実装しています。

## 検証結果

二ファイルから21ノード、25接続が抽出され、すべて `EXTRACTED` と表示されました。`upsertCard()` → `createCard()`、`createCard()` → `projectFields()`・`commitChart()` はソースと一致しました。`server.mjs` は解析対象ですが、`createApp()` 内のAPIルーティングとキャッシュ分岐、ブラウザーとサーバー間のHTTP接続は抽出されませんでした。

ソースを直接確認した取得手順は次のとおりです。

1. [`public/app.js`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/public/app.js) が入力を `fetchRepository()` → `GET /api/repository` に渡します。
2. [`server.mjs`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/server.mjs) がURLを検証し、公開の個別照会でキャッシュ・進行中要求を再利用するかGitHub/GitLabに問い合わせます。プロフィールと認証付きGitHub照会には別経路があります。
3. `public/app.js` が応答を `upsertCard()` → `createCard()` に渡してカードを表示します。

グラフはコード探索に使用します。全体のプロジェクトフローにはHTTP境界とサーバー内部の流れをソース根拠付きで追加する必要があります。実行時動作、実際のデプロイ、リリース版の確認には追加の証拠が必要です。
