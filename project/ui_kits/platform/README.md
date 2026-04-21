# The Platform (weDISCOVR B2B)

Internal OS for Curators · Spaces · Brands · weDISCOVR Ops. Responsive desktop, 1280–1920 wide.

## Files

- `index.html` — entry. Loads tokens, fonts, all JSX. Includes Tweaks (role + shell variant + density).
- `App.jsx` — root: reads Tweaks state, renders shell + active role view.
- `Shell.jsx` — sidebar + topbar + page container. Adapts per role.
- `Primitives.jsx` — Button, Card, StatCard, Pill, Badge, MatchBar, WSIScore, Avatar, Progress, Field, Checkbox, Radio, SegmentedControl, Divider.
- `Icons.jsx` — inline 1.75-stroke line icons (home, calendar, zap, etc.)
- `WSI.jsx` — three wSI visualization variants (score+breakdown, radar, ring).
- `Curator/Dashboard.jsx`, `Curator/CreateEvent.jsx`, `Curator/Earnings.jsx`
- `Brand/SponsorFeed.jsx`, `Brand/Recall.jsx`, `Brand/Report.jsx`
- `Space/Calendar.jsx`
- `Ops/QAQueue.jsx`
- `data.js` — sample events/curators/spaces/brands, shared across views.

## Color-role system

Colors carry **one job each**. Mixing roles = confusion (e.g. orange meaning both "Food" and "Pending"). We avoid that by reserving palettes:

### 1. Category hue — *identity*
Music=`#6968CB` · Food=`#FF5501` · Beauty=`#FAC938` · Fitness=`#7ED957` · Culture=`#2C9CE4` · Talk=`#0066FF`

Used for: category pills, avatar chips, thin category stripes on cards, sparklines that represent a specific category entity. **Never** used to communicate state.

### 2. Status — *state*
Draft=`#8892A4` · Published/Confirmed=`#334155` slate · Pending/QA=`#D97706` amber · Live/Paid=`--wd-green-ink` · Completed=`#5B6476` · Sponsor-matched=`#6968CB` (sponsor domain)

Used for: status pills, calendar cell fills, progress dots, workflow step indicators. Reserved palette — never borrows from categories.

### 3. Brand primary — *UI chrome & actions*
`#0066FF`

Primary buttons, nav highlights, focus rings, key links, progress accents. It's the "weDISCOVR-is-speaking" color.

### 4. Metric health — *quantitative ramp*
`var(--wd-green-ink)` → `#334155` → `var(--wd-gold-ink)` → `var(--wd-orange-ink)`

For wSI scores, health indicators, delta arrows. Never uses category hues.

### Calendar example
The Space calendar used to fill booked cells with the category color (Food=orange), which collided with the "Pending" status also being orange. Now: **cells colored by status only** (available/booked/pending/blocked), category shown as a 3px left stripe inside booked cells. Status is the foreground signal, category is secondary identity.

## Design principles

- **Light-primary, hybrid optional.** Dark sidebar + light content is default; a Tweak flips to full-light or full-dark.
- **Nunito only.** All weights, all sizes.
- **Data density: airy.** Cards with embedded mini-charts are the default shape — tables exist but aren't the first choice.
- **Layered communication UX.** No free-text-first interactions. Structured chips, picks, and option flows per the Comms model.

## Entities modeled in `data.js`

- 8 events (mixed: Berlin 50, KDK, various neighborhoods & formats)
- 6 curators, 5 spaces, 6 brands
- wSI scores with full breakdown (EPI/BSI/CPI/SVI/DAS) for every entity

## Naming guardrails

Curators (never Ambassadors) · Discover · The Terminal · Drop = commerce item.
