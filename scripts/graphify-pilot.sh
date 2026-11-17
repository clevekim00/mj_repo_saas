#!/bin/sh
set -eu

# Limit this pilot to two files from the reviewed public snapshot.
revision=365ab5bef0fbe41c57785892b44ab5f9601bf52c
repo=$(CDPATH='' cd -- "$(dirname -- "$0")/.." && pwd)
if ! graphify=$(command -v graphify); then
  printf 'Graphify CLI is required. See docs/GRAPHIFY_PILOT.md.\n' >&2
  exit 1
fi
if ! git -C "$repo" cat-file -e "$revision^{commit}" 2>/dev/null; then
  printf 'Public pilot commit %s is missing. Fetch it before running the pilot.\n' "$revision" >&2
  exit 1
fi

base=${TMPDIR:-/tmp}
work=$(mktemp -d "${base%/}/mj_repo_saas_graphify.XXXXXXXX")
mkdir -p "$work/input/public" "$work/home"
git -C "$repo" show "$revision:public/app.js" > "$work/input/public/app.js"
git -C "$repo" show "$revision:server.mjs" > "$work/input/server.mjs"

# The installed CLI's update command is local AST extraction. Keep credentials,
# model settings, existing graphs, and uncommitted files outside the run.
(
  cd "$work/input"
  env -i HOME="$work/home" PATH="$(dirname "$graphify"):/usr/bin:/bin" \
    GRAPHIFY_BACKEND=none GRAPHIFY_NO_TIPS=1 GRAPHIFY_QUERY_LOG_DISABLE=1 \
    "$graphify" update .
)
test -s "$work/input/graphify-out/graph.json"
printf '\nGraphify 결과: %s\n' "$work/input/graphify-out"
