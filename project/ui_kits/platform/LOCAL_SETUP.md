# Running the Platform prototype locally

## Getting the code onto your machine

**Option A — Tarball (simplest)**
1. In your Claude Code file explorer, download `wedisc-platform.tar.gz` from the repo root.
2. `tar -xzf wedisc-platform.tar.gz` into the folder where you want it.
3. You'll get a `project/` directory containing the full design system.

**Option B — Git remote**
1. Create an empty private repo on GitHub (e.g. `wedisc-platform`).
2. Ask Claude to add the remote and push:
   ```
   git remote add origin git@github.com:YOU/wedisc-platform.git
   git push -u origin main
   ```
3. On your machine: `git clone git@github.com:YOU/wedisc-platform.git`

## Running locally

```bash
cd project/ui_kits/platform
python3 -m http.server 8000
```

Then open **http://localhost:8000/** in a browser.

You can also just double-click `index.html` — everything is CDN-loaded — but serving over HTTP is more reliable.

## Iterating on flows

Edit any `.jsx` or `.js` file, then:

```bash
./build.sh      # regenerates index.html from sources
```

Refresh your browser.

## Adding a new flow

1. Create a new file, e.g. `Brand/Insurance.jsx`.
2. Add it to the `JSX` array in `build.sh`, in dependency order (primitives first, pages that use them later).
3. Wire it into the router in `App.jsx`.
4. Run `./build.sh`.

## Navigating in the browser

- **Bottom-right role switcher** — Curator / Brand / Space / Ops / BRLO
- **Bottom-left "Tweaks"** — shell variant, wSI visualization, demo-flow triggers
- **⌘K / Ctrl+K** — Demo Navigator (story arc + every flow)

## Moving to Claude Code desktop

Sessions don't sync between web and desktop, so:

1. Install Claude Code desktop from claude.com/download.
2. Open this project folder there.
3. Drop a short `CLAUDE.md` at the repo root describing the project, the color/status rules, and where to make changes — so the next session starts with context.
4. Start a fresh conversation.
