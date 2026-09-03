# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Header banner**: The "under reconstruction" notice is now DB-backed and dismissable instead of a hardcoded, permanent `SHOW_UNDER_CONSTRUCTION` constant. It reads `public.app_status_banner.translitpro_show` client-side over PostgREST (new `PUBLIC_SUPABASE_URL`/`PUBLIC_SUPABASE_ANON_KEY` env vars — must be set in Cloudflare Pages, static build inlines them), so it can be toggled from Supabase without a redeploy, and a dismiss (✕) persists for the session via `sessionStorage`.
- **Routing**: Added a dedicated English `/transliteration/` page that preserves the original transliteration-focused landing experience.
- **Homepage**: Added modular workspace landing sections in `src/components/workspace/` (`WorkspaceHero`, `WorkspacePillars`, `WorkspaceAnywhere`) for the English root page.
- **Screenshots**: Added `public/screenshots/feature-ai-rewrite.png` to the marketing asset set.

### Changed
- **Pricing copy (2026-08-28, second pass)**: The previous pass caught the numeric caps but left three claims that the repricing had made false, all of them the "unlimited" wording rather than a number — which is exactly why a grep for the old digits missed them. Pro's `Unlimited Prompt Library` → `Prompt library (100 saved)` (`SAVED_PROMPTS_LIMITS.pro` is 100, and `TEMPLATE_LIMITS.pro` is 50); Pro's `Unlimited Language Normalization` → `Language normalization (250/day)` (capped by migration `20260828110000`). The FAQ's `freeTrial` answer described cloud storage as `5 docs in free account, 50 in Basic, unlimited in Pro` (en, sr) or `local in Trial, cloud in Pro` (the other 12) — both wrong since document count stopped gating anything above Free and cloud storage exists on free accounts; all 14 now state the storage ladder (`500 MB free, 5 GB on Basic, 25 GB on Pro`). `Unlimited documents` (Basic) and `Unlimited images in documents` (Pro) were checked and are still true — both are bytes-bound by the storage cap, not count-capped. Basic's `AI writing assistance (50/day)` was left at 50 even though `ai_spellcheck.basic` is now 100, because the same label also covers `ai_rewrite.basic` at 50 and the page should quote the lower of the two.
  - **Files:** `src/i18n/locales/*.json` (all 14)
- **Pricing copy**: The 2026-08-27 repricing changed the prices but not the published feature lists, so the grid advertised the pre-repricing caps beside the new prices in all 14 locales. Corrected: Free is "Save up to 100 documents" (was 5) with "500 MB storage" and "AI writing assistance (10/day)" (was 50 — Starter's real spellcheck cap) and now lists document folders (moved out of the Pro-only gate); Plus is "Unlimited documents" (was "up to 50") with "5 GB storage", device sync, "AI writing assistance (50/day)" (was 100) and images at 5 MB (was 10 — the real `IMAGE_SIZE_LIMITS_MB.basic`); Pro replaces "Unlimited AI writing assistance" with "(250/day)" and adds "25 GB storage", dropping the two bullets that now sit in Plus. Also fixed three pre-existing romanized-Armenian bullets in `hy.json` ("Minchev 3 patker dastagrouml" → Armenian script).
  - **Files:** `src/i18n/locales/*.json` (all 14)
- **Pricing**: 2026-08-27 repricing — Basic → Plus $6/mo·$48/yr, Pro $12/mo·$96/yr (2× each), matching `translit-pro`'s `tierLimits.ts`. Founder card removed from the public pricing grid (retired for new sales; constant kept in `getPricingTiers.ts` for grandfathered billing-portal references).
  - **Files:** `src/features/pricing/getPricingTiers.ts`, `src/components/Pricing.astro`
- **Homepage**: Repositioned the English `/` landing page around an AI-powered multilingual writing workspace while keeping localized `/{lang}/` pages on the existing transliteration-focused structure.
- **WorkspaceHero**: Updated the hero headline copy and applied brand-color emphasis to “multilingual” and “workspace”.
- **Screenshots**: Replaced `public/screenshots/feature-type-naturally.png` with an updated image.
- **FeatureSpotlights**: Restructured keyboard and bookmarklet spotlight sections from a 50/50 side-by-side grid to a full-width layout (text centered above, visual spanning the full container width), matching the existing editor spotlight layout
- **FeatureSpotlights**: All three spotlight visuals (two videos + one image) are now clickable and open in a full-screen lightbox overlay; videos play with controls and audio in the lightbox, and reset when closed
