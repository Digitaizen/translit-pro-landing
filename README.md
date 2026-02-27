# TranslitPro Landing Page

Marketing landing page for [TranslitPro](https://app.translitpro.com) - a desktop transliteration suite for 13+ languages.

## Overview

This is a static landing page built with Astro and Tailwind CSS, deployed to Cloudflare Pages. It showcases TranslitPro's features, pricing, and FAQs to convert visitors into users.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.x
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **i18n**: Multi-language support for 13 languages
- **SEO**: Auto-generated sitemap, structured data for FAQs, hreflang tags

## Project Structure

```text
/
├── public/
│   ├── logo.png              # App logo icon (keyboard with arrows)
│   ├── title.png             # App title image (TranslitPro text)
│   ├── favicon.png           # App favicon (simplified keyboard icon)
│   └── robots.txt            # Search engine directives
├── src/
│   ├── components/
│   │   ├── Header.astro      # Navigation header with language dropdown
│   │   ├── Hero.astro        # Hero section with CTA
│   │   ├── Features.astro    # Features grid
│   │   ├── Pricing.astro     # Pricing tiers
│   │   ├── FAQ.astro         # FAQ accordion with structured data
│   │   ├── Footer.astro      # Footer with links
│   │   ├── ContactModal.astro # Contact support modal with EmailJS
│   │   └── LanguageDropdown.astro  # Language switcher component
│   ├── features/
│   │   └── pricing/
│   │       └── getPricingTiers.ts # Centralized plan prices (single source of truth)
│   ├── i18n/
│   │   ├── locales/          # Translation files for all languages
│   │   │   ├── en.json       # English (default)
│   │   │   ├── ru.json       # Russian
│   │   │   ├── uk.json       # Ukrainian
│   │   │   ├── be.json       # Belarusian
│   │   │   ├── bg.json       # Bulgarian
│   │   │   ├── he.json       # Hebrew
│   │   │   ├── hy.json       # Armenian
│   │   │   ├── ka.json       # Georgian
│   │   │   ├── el.json       # Greek
│   │   │   ├── lt.json       # Lithuanian
│   │   │   ├── tg.json       # Tajik
│   │   │   ├── rue.json      # Rusyn
│   │   │   └── kk.json       # Kazakh
│   │   ├── languages.ts      # Language configuration and metadata
│   │   └── utils.ts          # i18n utilities and translation loader
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base HTML layout with SEO meta tags
│   ├── pages/
│   │   ├── index.astro       # Main landing page (English)
│   │   └── [lang]/
│   │       └── index.astro   # Localized landing pages
│   ├── styles/
│   │   └── global.css        # Global styles (Tailwind imports)
│   └── theme.config.ts       # Centralized theme configuration
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind CSS configuration
├── wrangler.jsonc            # Cloudflare Workers config
├── THEME.md                  # Theme customization guide
├── THEME_SUMMARY.md          # Quick theme reference
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Start dev server at localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Local Testing with Main App

To test the landing page CTAs with a locally running main app:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Set `PUBLIC_APP_URL` in `.env` to your local app URL:
   ```
   PUBLIC_APP_URL=http://localhost:5173
   ```

3. Run both apps:
   - Main app at `http://localhost:5173`
   - Landing page at `http://localhost:4321`

4. All CTA buttons will now link to your local app for testing.

**Note:** Remove or comment out `PUBLIC_APP_URL` in `.env` before deploying, or simply delete the `.env` file. The production default (`https://app.translitpro.com`) will be used automatically.

## Styling

The landing page uses **Tailwind CSS v4** with static utility classes for styling.

### Current Color Scheme

- **Primary Brand**: Indigo (`indigo-400` to `indigo-900`)
- **Secondary Accent**: Purple (`purple-400`)
- **Backgrounds**: Dark slate (`slate-700` to `slate-950`)
- **Text**: White, `slate-300`, `slate-400`

### Changing Colors

All components use static Tailwind classes directly in the markup. To change the color scheme:

1. **Find and replace** color classes across component files in `src/components/`
2. Example: Replace all `indigo-600` with `blue-600` for a blue theme
3. Rebuild the site with `npm run build`

**Note**: The site currently uses static Tailwind classes (not dynamic theme variables) for compatibility with Tailwind v4's JIT compiler. Dynamic class generation using template literals is not supported.

### Theme Reference

See `src/theme.config.ts` for a reference of the color palette used throughout the site. This file is **for documentation purposes only** and is not actively used by components.

For detailed color usage, see:
- **`THEME.md`** - Complete color palette and usage guide
- **`THEME_SUMMARY.md`** - Quick reference with all colors and their hex values

## Deployment

The site is configured for Cloudflare Pages deployment:

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

Or connect the GitHub repo to Cloudflare Pages for automatic deployments on push.

## Landing Page Sections

1. **Header** - Fixed navigation with logo, nav links (Features, Pricing, FAQ), Sign In and Try Free CTAs
2. **Hero** - Main headline, subheadline, CTA buttons, visual demo, trust indicators
3. **Features** - 8 feature cards: Type Naturally, 13+ Languages, Add Any Language, Bookmarklet, Translation, AI Spellcheck, Powerful Editor, Export
4. **Pricing** - 4 tiers with tabbed cards:
   - **Free** — Preview tab (no account) / Workspace tab (free account); different feature lists per tab
   - **Basic** — $3/mo or $29/yr; Monthly/Annual tabs; monthly view shows approximate cost per day (~$0.10/day), annual view shows savings (Save $7)
   - **Pro** — $7/mo or $69/yr; Monthly/Annual tabs; monthly view shows approximate cost per day (~$0.23/day), annual view shows savings (Save $15); "Most Popular" yellow badge
   - **Founder** — $79 one-time; "Limited Time" brand-purple badge in tab-sized frame; launch pricing note below price
5. **FAQ** - 8 expandable questions with SEO structured data, Contact Support button
6. **Contact Modal** - Contact support form with EmailJS integration (RTL-aware)
7. **Footer** - Product links, Scripts (Cyrillic, Hebrew, Greek, etc.), Legal, Social (Twitter, Facebook)

### Pricing configuration

Plan prices are **not** stored in translation files.

- **Single source of truth**: `src/features/pricing/getPricingTiers.ts` — edit constants here to change prices. The file computes `annualSavings` for Basic and Pro, as well as the approximate `costPerDay` (monthly price ÷ 30). Set `SHOW_COST_PER_DAY = false` to hide the cost-per-day line globally without touching the template.
- **i18n locales** (`src/i18n/locales/*.json`) contain only localized copy: plan names, taglines, feature lists, period labels, CTA text, badge text, and the `launchPricingNote` for the Founder tier.

Key i18n keys under `pricing` in `en.json`:
- `tabs.anonymous` / `tabs.registered` — tab labels for the Free card
- `tabs.monthly` / `tabs.annual` — tab labels for Basic and Pro cards
- `free.anonymous` / `free.registered` — separate tagline, period, CTA, and features per Free tab
- `founder.launchPricingNote` — subtle note displayed below the Founder price
- `saveLabel` — prefix used in savings display (e.g. "Save $7")
- `perDayLabel` — suffix used in the cost-per-day line shown on the monthly tab (e.g. "/day")

**Translation workflow**: finalize `en.json` first; other locale files use a legacy fallback renderer and must be updated separately once English copy is confirmed.

To update prices, edit the constants in `getPricingTiers.ts` and rebuild.

## Internationalization (i18n)

The landing page supports 13 languages with full localization:

### Supported Languages

1. **English** (en) - Default at `/`
2. **Russian** (ru) - `/ru/`
3. **Ukrainian** (uk) - `/uk/`
4. **Belarusian** (be) - `/be/`
5. **Bulgarian** (bg) - `/bg/`
6. **Hebrew** (he) - `/he/` (RTL support)
7. **Armenian** (hy) - `/hy/`
8. **Georgian** (ka) - `/ka/`
9. **Greek** (el) - `/el/`
10. **Lithuanian** (lt) - `/lt/`
11. **Tajik** (tg) - `/tg/`
12. **Rusyn** (rue) - `/rue/`
13. **Kazakh** (kk) - `/kk/`

### Features

- **Language Switcher**: Dropdown in header with native language names
- **Static Generation**: All language pages pre-rendered at build time
- **SEO Optimized**: Proper `hreflang` tags for all language variants
- **RTL Support**: Right-to-left layout for Hebrew
- **Localized Content**: All sections (hero, features, pricing, FAQ, footer) fully translated
- **Responsive Headlines**: Hero headlines use CSS `clamp()` for viewport-responsive font sizing that maintains 2-line layout across all languages

### Adding a New Language

1. Create a new translation file in `src/i18n/locales/{lang}.json`
2. Add the language to `SUPPORTED_LANGUAGES` in `src/i18n/utils.ts`
3. Import the translation file in `src/i18n/utils.ts`
4. Add the language to the `translations` object
5. Build the site - the new language page will be auto-generated

## SEO Features

- Open Graph meta tags for social sharing
- Twitter Card meta tags
- FAQ structured data (JSON-LD) for rich snippets
- Auto-generated sitemap at `/sitemap-index.xml`
- robots.txt configured
- hreflang tags for all language variants
- Canonical URLs for each language

## Main App Integration

The landing page CTAs link directly to the main app at `app.translitpro.com` with deep linking support for authentication modals and language preferences.

### Landing Page inbound deep links

The main app can link to the landing page with a `?lang=xx` query parameter to automatically set the landing page UI language.

- Example (open landing in Russian): `https://www.translitpro.com/?lang=ru`
- Example (open a specific section in Russian): `https://www.translitpro.com/?lang=ru#features`

The landing page will redirect to the corresponding localized route (e.g. `/ru/`) while preserving the hash (e.g. `#features`, `#pricing`, `#faq`).

### Supported Routes

| Route              | Modal Opened           |
| ------------------ | ---------------------- |
| `/login`           | Login modal            |
| `/signup`          | Signup modal (generic) |
| `/trial`           | Start Free Trial modal |
| `/forgot-password` | Forgot password modal  |

### Main app URL parameters

| Parameter  | Values                                                                        | Effect                    |
| ---------- | ----------------------------------------------------------------------------- | ------------------------- |
| `?lang=xx` | `en`, `ru`, `uk`, `be`, `bg`, `tg`, `hy`, `ka`, `el`, `kk`, `he`, `rue`, `lt` | Sets UI language          |
| `?action=` | `login`, `signup`, `trial`, `forgot-password`                                 | Opens corresponding modal |
| `?plan=`   | `basic`, `pro`, `founder`                                                     | Pre-selects pricing plan  |

### Landing Page Button Mapping

| Button                | URL                                                               |
| --------------------- | ----------------------------------------------------------------- |
| Header: "Start Now"   | `https://app.translitpro.com/trial` (+ `?lang=xx` if non-English) |
| Header: "Sign In"     | `https://app.translitpro.com/login`                               |
| Hero: Primary CTA     | `https://app.translitpro.com` (+ `?lang=xx` if non-English)       |
| Pricing: Free (Preview) | `https://app.translitpro.com`                                   |
| Pricing: Free (Workspace) | `https://app.translitpro.com/signup`                          |
| Pricing: Basic tier   | `https://app.translitpro.com/signup?plan=basic`                   |
| Pricing: Pro tier     | `https://app.translitpro.com/signup?plan=pro`                     |
| Pricing: Founder tier | `https://app.translitpro.com/signup?plan=founder`                 |

### Language Pass-through

When a user visits a localized landing page (e.g., `/ru/`), all CTA links automatically include the `?lang=xx` parameter to ensure a seamless language experience when transitioning to the main app. English users get clean URLs without the language parameter.

## Translation TODOs

The following translations need manual review:

- [x] **Armenian (hy.json)**: The `preventCombinations` FAQ entry has English placeholder text that needs to be translated to Armenian.

## Next Steps Checklist

- [ ] **Domain Setup**: Point `translitpro.com` to Cloudflare Pages
- [ ] **App Subdomain**: Ensure `app.translitpro.com` points to the main app
- [x] **Privacy Policy**: Create `/privacy` page with privacy policy content (app.translitpro.com/privacy)
- [x] **Terms of Service**: Create `/terms` page with terms content (app.translitpro.com/terms)
- [x] **Social Media**: Create Facebook (facebook.com/translitpro) pages
- [x] **Images**: Add Open Graph image (`/og-image.png`) for social sharing
- [x] **Branding**: Logo, title, and favicon images integrated
- [x] **Contact Form**: Contact support modal with EmailJS integration
- [ ] **Analytics**: Add Cloudflare Web Analytics or Google Analytics
- [ ] **Blog**: Consider adding a blog section for SEO content marketing
- [ ] **A/B Testing**: Set up conversion tracking for CTA buttons
- [ ] **Performance**: Run Lighthouse audit and optimize as needed

## Links

- **App**: https://app.translitpro.com
- **Landing Page**: https://translitpro.com (after deployment)
