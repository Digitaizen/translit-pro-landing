# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:4321)
npm run build    # production build
npm run preview  # preview production build locally
```

There are no lint or test commands.

## Architecture

**Astro 5 static site** deployed to Cloudflare Pages. All 13 language variants are pre-rendered at build time.

### Routing & i18n

- `/` → English (no prefix)
- `/{lang}/` → all other languages (e.g. `/ru/`, `/he/`)
- `src/pages/index.astro` — English page
- `src/pages/[lang]/index.astro` — generates all other locales via `getStaticPaths()`
- Hebrew (`he`) gets `dir="rtl"` on `<html>`; all others are LTR
- `BaseLayout.astro` contains a client-side script that reads a `?lang=xx` query param and redirects to the matching locale route (preserving hash anchors). This is how external links pass language context.

### Translation system

Locale JSON files live in `src/i18n/locales/{lang}.json`. Load them via:

```ts
import { getTranslations } from '../i18n/utils';
const t = getTranslations(lang); // falls back to 'en'
```

Every component receives `t: any` and `currentLang: string` as props and accesses keys directly (`t.hero.headline`, `t.features.title`, etc.). Translations do **not** cover pricing — those live in code (see below).

Adding a new language requires: a new locale JSON file, an entry in `src/i18n/languages.ts`, and a new locale in `astro.config.mjs`.

### Pricing

`src/features/pricing/getPricingTiers.ts` is the single source of truth for all prices. It auto-computes savings and cost-per-day from the base constants. Prices are intentionally **not** in locale files so browser translation extensions can't mangle them.

### App URL building

`src/config.ts` exports `buildAppUrl(path, currentLang, queryParams)`. Always use this for CTA links — it appends `?lang=xx` for non-English users so the main app can open in the right language.

### Auth state (no-flicker pattern)

The main app sets a `tp_logged_in=1` cookie on `.translitpro.com`. `Header.astro` reads this cookie in an inline `<script>` block (runs before first paint) and swaps "Sign In" → "Back to App" without a flash of wrong content.

### Lightbox pattern

Used in both `FeatureSpotlights.astro` (videos + images) and `Features.astro` (feature card images). Pattern: a trigger element with `id="*-lightbox-trigger"`, a hidden overlay div with `id="*-lightbox"`, and a close button with `id="*-lightbox-close"`. Vanilla JS wires them up in a `<script>` block. Escape key and background click both dismiss.

In `Features.astro`, set `image: '/screenshots/filename.png'` on any feature object to activate its lightbox. Leave as `undefined` to keep the card non-interactive.

### Esbuild / TypeScript caveat

Astro frontmatter TypeScript is processed by esbuild in TSX mode. **Avoid object-type index signatures** (`{ [key: string]: T }`) and generic utility types (`Partial<Record<...>>`) in frontmatter — esbuild chokes on them. Use `any`, inline values, or no type annotation instead.
