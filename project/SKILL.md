---
name: wedi-design
description: Use this skill to generate well-branded interfaces and assets for weDISCOVR — the consent-based behavioral-data platform for smart cities (Explorer iOS super-app + weDI Brain dashboard). Use for production Base44 work or for throwaway prototypes, mocks, decks, and pitch assets.
user-invocable: true
---

Read `README.md` first — it has product context, voice, content rules, and visual foundations.
Then explore:

- `colors_and_type.css` — source of truth for color / type / spacing / radii / shadow / glass tokens. Never re-define these elsewhere.
- `fonts/Nunito-*.ttf` — the only face in the system. All weights, variable.
- `assets/` — logos, wordmark, app icon.
- `preview/*.html` — one tokenized specimen per concept. Read these to see how tokens compose.
- `ui_kits/explorer/` — iOS super-app. `index.html` is a click-thru prototype. `*.jsx` are the atoms and screens.

**Non-negotiables (do not drift):**
- Nunito only. No other font family.
- Primary = `#0066FF` blue. White `#FFFFFF`. Dark `#222222`.
- Secondary accents map to categories: Purple = Music/XP/Curated, Orange = Food/AR Hunt/Rewards, Gold = Beauty/DISC/Premium, Green = Fitness/Live/Success, Sky = Location/Map/Next-day.
- Glassmorphism: white 8–12%, blur 20px, radius 30px primitive (20px for cards, 24px for hero, 26px for CTA).
- 16px screen margin · 20px block padding.
- Device is locked at **402×874** for Explorer. Status bar 48px, tab bar 83px.
- Copy: warm, second-person, short. "Hey Emma!" · "3 new events are near you" · CTAs end with `→`. Categories are ALL CAPS pills. Meta uses middot separators (·).
- Naming: **Curators** (never Ambassadors), **Discover** (not Explore), **The Terminal** (not The Index), **Drop** = commerce item.
- Background is blue-black radial, never pure black. Never white text on raw photo — always protection gradient.

**If invoked with no guidance:** ask the user what they want to build (marketing slide? pitch deck? new Explorer screen? weDI Brain dashboard?), then act as an expert designer. Output HTML for one-off artifacts, real component files when working inside Base44. Copy tokens from `colors_and_type.css`; copy logos and imagery from `assets/`.
