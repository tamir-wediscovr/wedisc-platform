# weDISCOVR — working with this repo

You're helping Tamir iterate on the **weDISCOVR Platform** — a B2B design prototype. This file is loaded at every session start; read it before acting.

## What this is

- **Not production code.** These are design prototypes written in HTML + JSX (via Babel standalone in the browser). The job is fast visual iteration, not shipping software.
- The primary surface is `project/ui_kits/platform/index.html`, a bundled single-file React app that runs with zero build tooling beyond CDN scripts.
- There's also `project/ui_kits/explorer/` (the consumer iOS-locked app). Don't touch it unless Tamir asks.

## Quick start

```bash
cd project/ui_kits/platform
python3 -m http.server 8000        # serves at http://localhost:8000/
./build.sh                          # regenerate index.html from JSX sources
```

**Edit a JSX file → run `./build.sh` → refresh browser.** That's the whole loop.

## Repo layout

```
project/
├── colors_and_type.css             ← design tokens (source of truth for colors/type)
├── ui_kits/platform/               ← THE B2B PROTOTYPE (primary workspace)
│   ├── index.html                  ← BUNDLED OUTPUT — don't hand-edit
│   ├── build.sh                    ← regenerates index.html from sources
│   ├── App.jsx                     ← router, role switcher, tweaks, demo flags
│   ├── Icons.jsx                   ← 70+ line icons, 1.75 stroke
│   ├── Primitives.jsx              ← Btn, Card, StatCard, Pill, Avatar, Row, Stack, Field, Input, …
│   ├── WSI.jsx                     ← match-score viz (bars / radar / reasons)
│   ├── Shell.jsx                   ← single-role sidebar + topbar
│   ├── DemoNav.jsx                 ← ⌘K launcher, 6-act story arc
│   ├── data.js                     ← curators, spaces, brands, events
│   ├── data_brlo.js                ← BRLO entity + CAPABILITY map + inbox
│   ├── Curator/                    ← Dashboard, CreateEvent wizard, Earnings
│   ├── Brand/                      ← SponsorFeed, Recall (AR studio), Report
│   ├── Space/Calendar.jsx
│   ├── Ops/QAQueue.jsx
│   └── BRLO/                       ← multi-cap persona: Shell, Dashboard, Inbox, Profile, Onboarding, Handoff, CapabilityExpand
└── ui_kits/explorer/               ← consumer iOS app (secondary)
```

## The design system — rules to follow

These are real rules that were debated and settled. Don't rediscover them.

### Color has one job at a time

| Role | What it communicates | Tokens / hexes |
|---|---|---|
| **Category hue** | Identity of an event/curator/brand | Music `#6968CB`, Food `#FF5501`, Beauty `#FAC938`, Fitness `#7ED957`, Culture `#2C9CE4`, Talk `#0066FF` |
| **Status** | State of a thing (draft/pending/live/paid) | slate `#334155`, amber `#D97706`, green-ink, grey `#5B6476` |
| **Brand primary** | UI chrome, primary actions | `#0066FF` |
| **Health ramp** | Quantitative scores (wSI bars) | green-ink → blue → gold-ink → orange-ink |

**Never** use a category hue to express status, or a status color to express category. Example: the Space Calendar shows availability by status (`soft-green` = open, `dark` = booked, `amber-dashed` = pending). The event's category appears as a thin 3px left stripe inside booked cells — secondary, never the fill.

### Accessibility

`#7ED957` and `#FAC938` fail WCAG AA on white as text (1.8:1, 1.6:1). Use **ink variants** for anything that carries text meaning — numbers, labels, small icons inside sentences:

- `--wd-green-ink: #2F7A1A` (AA on white)
- `--wd-gold-ink: #8A6500` (AA on white)
- `--wd-orange-ink: #C43D00` (AA on white)

Bright originals stay for fills, bars, avatar backgrounds, large tinted surfaces.

### Typography

- **Nunito only.** Served from Google Fonts in the standalone build. No other faces.
- Weight: 600–800 for UI chrome, 400 for body.
- Scale: see tokens in `colors_and_type.css`. Don't hand-specify new sizes outside that ladder.

### Copy tone

- **No em dashes (—) in user-visible text.** Tamir doesn't like them. En dashes (–) for numeric ranges are fine ("25–40", "Apr 1 – Apr 30").
- Avoid marketing fluff; write the way a product would talk to a pro user.

### Imagery

- Curator avatars and space thumbnails are Unsplash URLs in `data.js`. Direct URLs, not a loader shim.
- Brand logos stay as monograms (real logos are copyrighted).

## BRLO — the multi-capability persona

BRLO is both a Space (Kreuzberg brewery/taproom) and a Brand (craft beer sponsor). This persona is the headliner: it demonstrates that a single entity wears multiple hats with one unified dashboard.

- Space capability → **green** (`#7ED957`)
- Brand capability → **orange** (`#FF5501`)
- Curator capability → **purple** (`#6968CB`)
- Talent capability → **gold** (`#FAC938`)

Capability color shows up on nav dots, section stripes, inbox left-borders, pill backgrounds. See `data_brlo.js` for the `CAPABILITY` map.

## The demo story arc (6 acts)

1. **Curator has an idea** — DJ Kleo drafts "Midsommar Listening" via Create Event wizard
2. **BRLO wears Space hat** — request lands in unified inbox
3. **Cross-cap handoff** — accept space request → get nudged to also sponsor (self-sponsor upside)
4. **BRLO builds activation** — Recall Studio AR setup
5. **Report lands** — campaign report with zero-PII wEID trail
6. **Onboarding flashback** — how BRLO got onto the platform (multi-capability selection)

Reachable via ⌘K in the running app. Preserve these flows when refactoring.

## Common tasks

### Add a new screen to an existing role
1. Create `project/ui_kits/platform/<Role>/<Screen>.jsx`
2. Append it to the `JSX` array in `build.sh` (primitives before pages)
3. Add a nav entry to `NAV[<role>]` in `Shell.jsx`
4. Add routing in `App.jsx`
5. Add a `titleMap` entry in `App.jsx`
6. `./build.sh`

### Add a new role
1. Create `<Role>/` folder with the screens
2. Add to `ROLES` in `Shell.jsx`
3. Add to `NAV` in `Shell.jsx`
4. Wire `titleMap` and renderers in `App.jsx`
5. Add to `ROLE_COLORS` and `ALL_FLOWS` in `DemoNav.jsx`

### Change a design token
Edit `project/colors_and_type.css` and the inline `<style>` block in `build.sh` (both hold tokens). Keep them in sync.

### Change something inline in index.html
**Don't.** Edit the JSX source, run `./build.sh`. `index.html` is a generated artifact.

## Things not to do

- Don't run `git push --force`, `git reset --hard`, or bypass `--no-verify` without asking.
- Don't write em dashes in user-visible strings (see copy tone above).
- Don't mix category hues with status meaning (see color rules).
- Don't use `#7ED957` or `#FAC938` as small text on white.
- Don't hand-edit `index.html` — always edit sources and rebuild.
- Don't add new fonts.

## When stuck or unsure

Ask Tamir a short, pointed question rather than guessing. The design system has specific opinions; default to confirming rather than inventing.
