#!/usr/bin/env bash
# Regenerate standalone index.html from the JSX source modules.
# Usage:  ./build.sh        → writes index.html in this directory
#
# Edit the .jsx / .js source files, re-run this script, refresh the browser.
# Keep the order in SOURCES matching dependencies: primitives before pages.

set -euo pipefail
cd "$(dirname "$0")"

OUT="index.html"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

# ── Source files in load order ──────────────────────────────────────────
# Plain JS (globals, no JSX) — loaded as <script>
PLAIN_JS=(
  data.js
  data_brlo.js
)

# JSX modules — loaded as <script type="text/babel">
JSX=(
  Icons.jsx
  Primitives.jsx
  WSI.jsx
  Shell.jsx
  Curator/Dashboard.jsx
  Curator/CreateEvent.jsx
  Curator/Earnings.jsx
  Brand/SponsorFeed.jsx
  Brand/Recall.jsx
  Brand/Report.jsx
  Space/Calendar.jsx
  Ops/QAQueue.jsx
  BRLO/Shell.jsx
  BRLO/Dashboard.jsx
  BRLO/Inbox.jsx
  BRLO/Profile.jsx
  BRLO/Onboarding.jsx
  BRLO/CapabilityExpand.jsx
  BRLO/Handoff.jsx
  DemoNav.jsx
  App.jsx
)

# ── Sanity-check all sources exist before writing anything ──────────────
for f in "${PLAIN_JS[@]}" "${JSX[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "✘ missing source: $f" >&2
    exit 1
  fi
done

# ── HEAD ────────────────────────────────────────────────────────────────
cat > "$TMP" <<'HEAD_EOF'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Platform · weDISCOVR B2B</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
<style>
:root {
  --wd-blue: #0066FF; --wd-blue-ink: #0047E0; --wd-blue-sky: #40A6FF;
  --wd-purple: #6968CB; --wd-orange: #FF5501; --wd-gold: #FAC938;
  --wd-green: #7ED957; --wd-sky: #2C9CE4; --wd-red: #FA2E2E;
  --wd-green-ink: #2F7A1A; --wd-gold-ink: #8A6500; --wd-orange-ink: #C43D00;
  --wd-pg: #F7F8FB; --wd-pg-2: #EEF1F6; --wd-surface: #FFFFFF;
  --wd-line: #E5E8EF; --wd-line-2: #D7DBE4; --wd-line-3: #BFC5D1;
  --wd-ink: #0B1220; --wd-ink-2: #2A3346; --wd-ink-3: #5B6476;
  --wd-ink-4: #8892A4; --wd-ink-5: #B0B7C6;
  --wd-nav-bg: #0B1220; --wd-nav-fg: rgba(255,255,255,0.72);
  --wd-nav-fg-hi: #FFFFFF; --wd-nav-hover: rgba(255,255,255,0.06);
  --wd-nav-active: rgba(0,102,255,0.18);
  --wd-font: "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
  --wd-ease: cubic-bezier(0.22, 0.61, 0.36, 1);
}
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; background: var(--wd-pg);
  font-family: var(--wd-font); color: var(--wd-ink); min-height: 100vh;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
#root { min-height: 100vh; }
button, input, textarea, select { font-family: var(--wd-font); }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.pulse { animation: pulse 1.8s infinite; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-thumb { background: #D7DBE4; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #BFC5D1; }
</style>
</head>
<body>
<div id="root"></div>

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

HEAD_EOF

# ── Data files (plain JS) ───────────────────────────────────────────────
# Some data sources reference window.__resources for the bundler — swap
# those to direct Unsplash URLs so the standalone file has no dependencies.
for f in "${PLAIN_JS[@]}"; do
  echo "<!-- source: $f -->" >> "$TMP"
  echo '<script>' >> "$TMP"
  cat "$f" >> "$TMP"
  echo '</script>' >> "$TMP"
done

# ── JSX modules (Babel-transformed) ─────────────────────────────────────
for f in "${JSX[@]}"; do
  echo "<!-- source: $f -->" >> "$TMP"
  echo '<script type="text/babel">' >> "$TMP"
  cat "$f" >> "$TMP"
  echo '</script>' >> "$TMP"
done

# ── FOOT ────────────────────────────────────────────────────────────────
cat >> "$TMP" <<'FOOT_EOF'

</body>
</html>
FOOT_EOF

mv "$TMP" "$OUT"

LINES=$(wc -l < "$OUT")
BYTES=$(wc -c < "$OUT")
printf "✔ wrote %s  (%s lines, %s bytes)\n" "$OUT" "$LINES" "$BYTES"
