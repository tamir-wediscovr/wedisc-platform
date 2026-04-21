# weDISCOVR — Design System

**Permission Infrastructure for smart cities.** A consent-based behavioral data platform that connects Explorers, Cultural Curators, Brands, Spaces, and Cities through AR-powered cultural experiences. Currently preparing an Explorer MVP demo for an investor presentation.

This system is the source of truth for **weDISCOVR Explorer** — a mobile-first iOS super-app (iPhone 16 Pro, locked at **402×874px**) — and for the multi-role operating system dashboard **weDI Brain** (7 user-type views). Tamir designs in Figma, Sarannya implements in Base44.

Phase: **1 — Foundations complete.** Phase 2 (Primitives) and Phase 3 (Components) are next.

---

## Sources

- **Figma:** `weDISCOVR for Demo.fig` — mounted as a read-only VFS. Focused pages:
  - `/App-Screens` (Home, Drops, Survival Kit, Product Detail, Caught Gift, Amazingy Beauty Drop, Demo-screens)
  - `/App-Thumbnail` (brand mark on iOS icon)
- **Implementation target:** Base44 (web, React). Design tokens in this repo; code lives there.

---

## Product surfaces

| Product | Viewport | Status |
|---|---|---|
| **weDISCOVR Explorer** (iOS super-app) | 402 × 874 (iPhone 16 Pro) | MVP — demo for investors |
| **weDI Brain** (operating system dashboard) | Desktop, 7 role views | Not in Phase 1 scope |

The Explorer is the only surface covered in this Phase-1 design system. `weDI Brain` will be added in a later pass.

---

## Index (what lives at root)

| File / folder | Purpose |
|---|---|
| `README.md` | You are here. Product context, sources, and foundations. |
| `SKILL.md` | Agent skill manifest — loaded when another Claude invokes this system. |
| `colors_and_type.css` | Source-of-truth tokens. Color, type, spacing, radii, shadows, glass. |
| `fonts/` | Nunito (all weights). The only face in the system. |
| `assets/` | Logos, app icon, brand marks, category icons, imagery extracted from Figma. |
| `preview/` | One small HTML card per token cluster, component, and screen — populates the Design System tab. |
| `ui_kits/explorer/` | UI kit for the Explorer mobile app (iOS, 402×874). Core screens, components, click-thru prototype. |

---

## Content fundamentals

**Voice:** warm, direct, second-person, slightly cheeky. The app talks to *you* by name. Copy earns its space — there is no filler body text in the real screens; labels are short, titles are nouns or short action phrases.

**Examples observed in the Figma:**

- Greetings: `Hey Emma!` (not "Welcome back, Emma")
- Status lines under greetings use semantic color: `3 new events are near you` (green, 11px)
- Section titles are specific, not generic: `Your People's Moments`, `Happening Now`, `Curators Dropping This Week`
- CTAs are verbs with an arrow: `Join Berlin 50 →`, `View Event →`, `Redeem at Stand →`, `Explore more`
- System categories are ALL CAPS short labels: `LIVE`, `AR HUNT`, `BEAUTY`, `CURATED`, `EXCLUSIVE`, `✓ CLAIMED`
- Meta lines use middot separators: `Space Name · Day, Mon XX · XX:00–YY:00`, `34 events · Apr–Jun 2026`, `Mitte · This Weekend`
- Distances and counts are terse: `0.8km`, `3km away`, `+29 going`, `47 Explorers active in Neukölln`
- Points/rewards shorthand: `★ +YYY DISC`, `2,120 DISC`

**Casing:**
- Section titles: **Title Case** (`Happening Now`, `Who's going` — note: sometimes sentence case for secondary labels)
- Pill / badge labels: **UPPERCASE**, letter-spaced when over ~8 chars (`HOW TO REDEEM`, `LIVE`, `AR HUNT`, `EVENT TYPE`)
- Body and meta: sentence case (`Valid through Month XX, 20XX`, `Awarded by Brand Name`)

**Pronouns:** app is *you / your* (Explorer perspective). Curators and Brands are referred to in the third person (`Curators Dropping This Week`, `Awarded by Brand Name`).

**Emoji + unicode:** used sparingly as icons, never as punctuation.
- `📍` for location in context headers
- `🎁` for gift/reward steps
- `★` as a gold/DISC marker inline with numbers
- `✓` inside success pills (`✓ CLAIMED`)
- `→` for CTA direction
- `·` (middot) as the primary meta separator

**Naming rules (locked):**
- Cultural organizers are **Curators**, never "Ambassadors"
- The second nav tab is **Discover**, not "Explore"
- PR page is **The Terminal**, not "The Index"
- **Drop** = commerce item (not event). Events are containers that hold Drops.

---

## Visual foundations

**Surface / background.** Every app screen sits on a deep-space radial gradient — `radial-gradient(rgb(4,15,36) 0%, rgb(31,76,105) 0%, rgb(8,28,44) 100%)` or the simpler `radial-gradient(rgb(5,10,20) 0%, rgb(10,22,40) 100%)`. Never pure black — always blue-black, leaning teal in the corners. Status bar sits as a solid `rgb(5,10,20)` strip.

**Color.** Blue `#0066FF` is the *primary action* and identity color; white `#FFFFFF` is text and structure; `#050A14` / `#0A1628` are surface. Semantic accents are rationed — each has a meaning:
- **Purple #6968CB** — XP, levels, Explorer identity, "CURATED" badges, music category
- **Orange #FF5501** — rewards, unlocks, energy, AR Hunt pills, food category
- **Gold #FAC938** — DISC points, debit card, premium, beauty category
- **Green #7ED957** — success, live status, fitness/yoga category
- **Sky #2C9CE4** — location, map, distance indicators, AR elements, "Next: [day]"

**Never introduce a new hue.** Map new categories to this table or consult the design lead.

**Typography.** Nunito only. All weights (Light 300 → Black 900) but the working set is `Regular 400 / SemiBold 600 / Bold 700 / ExtraBold 800`. No serifs, no second family. Line-height is a tight `100%` on headlines and labels — text is deliberately compact.

**Spacing.** `16px` screen margins on the left/right edge of every App screen. `20px` interior padding for content sections and cards. Card internal padding is `14px 16px 16px 16px`. Section gaps of `24px` between major blocks, `12px` between sibling cards.

**Corners.** Radii step by role:
- `6–8px` — small pills and badges (CATEGORY, DISC counter)
- `14px` — thumbnails, inline tags
- `18–20px` — content cards (About, Schedule, Curated By)
- `24px` — hero cards, full-screen sheets
- `26px` — primary CTA buttons
- Full circle (`50%` / 9999) — avatars and status dots

**Glassmorphism.** The signature surface. `background: rgba(255,255,255,0.06–0.12)` with `border: 1px solid rgba(255,255,255,0.08–0.14)`, `backdrop-filter: blur(20–28px)`, and a soft ambient shadow `0 8px 24px rgba(0,0,0,0.25)`. This is how every card and the bottom nav sit on top of the radial background.

**Shadows.** Two layers:
1. **Ambient card shadow** — `0 8px 24px rgba(0,0,0,0.25)` — every glass card.
2. **Colored CTA glow** — matches the button's accent, e.g. `0 6px 16px rgba(0,107,255,0.45)` for the primary blue CTA, `0 2px 10px rgba(255,102,0,0.5)` for the orange AR Hunt pill, `0 0 10px rgba(126,217,87,0.45)` for the green LIVE pill. Glow intensity scales with importance.

**Borders.** Almost always a single 1px hairline of `rgba(255,255,255,0.08–0.14)` on glass, or a semantic `rgba(accent, 0.35–0.65)` to tint the pill. Primary CTAs get a `1.5px solid rgba(255,255,255,0.2)` highlight stroke on top of the gradient fill.

**Gradients.** Used in three specific roles only:
1. **Screen background** — the deep blue-black radial.
2. **Primary CTA fill** — `linear-gradient(rgb(0,107,255) → rgb(120,82,242))` (blue → violet) *or* `linear-gradient(rgb(64,166,255) → rgb(0,71,224))` (sky-blue → deep blue).
3. **Image-protection overlay** — on hero photos, `linear-gradient(rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.92) 100%)` — the text sits in the dark bottom.

Orange/gold CTAs use a separate gradient `linear-gradient(rgba(255,85,1,0.92) → rgba(250,201,56,0.92))` — AR Hunt / unlocks only.

**Text-on-image.** Always over a protection gradient. Never white text on a raw photo.

**Imagery.** Warm-to-neutral photography, hero-framed, filling a card edge-to-edge. Avatars are circular, bordered with a 2.5px accent ring when active (`rgb(0,102,255)`). No illustrations. No hand-drawn SVG — when an image is needed and not available, a solid `rgb(105,104,203)` (purple) placeholder block stands in with the gradient overlay on top.

**Iconography.** Stroke icons at `1.5–2px` weight, white at 65–85% opacity for inactive, pure white for active. Tab icons are ~24×24 with a 9px label underneath. The system leans on a handful of glyphs (bell, home, discover, map, passport, profile) drawn as SVG vectors inside Figma, plus a few inline emoji for context (`📍 🎁 ★ ✓ →`). See the ICONOGRAPHY section below.

**Animation.** (Observed indirectly — Figma frame naming implies states.) Expect:
- Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (smooth ease-out) for sheets and content.
- Duration: `220ms` for taps, `320ms` for sheet opens, `480ms` for celebrations (gift reveal, caught gift).
- Pressed state observed in the component library: `0.96` scale with a subtle brightness drop. No bounces on primary UI; bounces reserved for reward moments.
- Live dots pulse at ~1.2s. AR Hunt gradients shimmer slowly.

**Hover / press.** Desktop hover is not native to this surface; press is primary.
- **Press** — scale `0.96`, darken `4%`, glow intensifies by ~15%. Glass cards lift shadow opacity from `0.25 → 0.35`.
- **Disabled** — `rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.24)` text. No shadow.

**Transparency & blur.** Blur `20px` is the signature depth cue — used on glass cards, the bottom nav (`blur(28px)`), and overlays. Never use raw translucent colors without a blur behind them on this surface; the radial background shows through and muddies the hue.

**Protection gradients vs capsules.** Over photography → protection gradient. Over solid background → capsule pill. Don't mix.

**Layout rules (fixed elements).**
- Status bar overlay: solid `#050A14`, 48px tall, always on top.
- Tab bar: fixed bottom, 83px tall, `rgba(5,10,20,0.88)` + `blur(28px)` + 1px white/8% top border.
- Content scrolls between them with 16px side margins.

**Density.** High. Text drops to `9–11px` in meta rows — do not shrink below `8px`. Tap targets are still ≥44px vertical; dense labels live inside larger pressable zones.

---

## Iconography

Icons in the weDISCOVR Figma are custom-drawn SVG vectors (tab icons, bell, chevrons, arrows). There is **no built-in icon font in the design**. They are:

- **Stroke-based, 1.5–2px**, `round` line-cap/join, on a 24×24 artboard
- Rendered at **24px** in tab bars, **20px** in inline action slots, **12–14px** inline with text
- Color: pure white (active), `rgba(255,255,255,0.4–0.6)` (inactive), or the accent color for category/state

**Current approach (substitution flagged):** since the source SVGs are inside the Figma binary and hand-specific per node, this design system **substitutes Lucide Icons** (CDN, matching 2px stroke, round joins) for everything except the wordmark and category marks. Where a one-to-one Lucide match exists (`home`, `compass`, `map-pin`, `bell`, `user`, `scan-line`, `gift`, `star`, `chevron-right`), that is the preferred pick.

Lucide is loaded from CDN in previews:
```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

**Inline unicode/emoji used as icons:**
- `📍` location, in-context (not for nav)
- `🎁` reward / gift step
- `★` gold marker next to DISC numbers (can also use Lucide `star` filled gold)
- `✓` success confirmation inside pills
- `→` CTA direction (ASCII arrow; use literal char, not unicode arrow)
- `·` middot separator

**Logos & brand marks** (copied into `assets/`):
- `assets/app-icon.svg` — the "we|DISCOVR" pill mark that lives on the iOS home icon
- `assets/wordmark.svg` — the same mark, scalable for in-app

If the user needs the real Figma tab icons, copy them with `fig_copy_files` from the specific frame's `/Vector*.svg` paths — they're in each screen's folder.

---

## What's next (for the user to decide)

1. **weDI Brain dashboard.** 7 role views are out of scope for Phase 1; they should be added as a second UI kit under `ui_kits/wedi-brain/` once designs are ready.
2. **Real Lucide mapping.** Every custom icon node in the Figma was substituted with Lucide — confirm the mapping or export the originals.
3. **Phase 2 Primitives:** input fields, toasts, bottom sheets, empty states, loading states — not present in the demo screens.
