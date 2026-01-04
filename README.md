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
│   │   └── LanguageDropdown.astro  # Language switcher component
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
4. **Pricing** - 4 tiers: Free, Basic ($1.50/mo), Pro ($5/mo), Founder ($50 once)
5. **FAQ** - 8 expandable questions with SEO structured data
6. **Footer** - Product links, Scripts (Cyrillic, Hebrew, Greek, etc.), Legal, Social (Twitter, Facebook)

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

## Next Steps Checklist

- [ ] **Domain Setup**: Point `translitpro.com` to Cloudflare Pages
- [ ] **App Subdomain**: Ensure `app.translitpro.com` points to the main app
- [ ] **Privacy Policy**: Create `/privacy` page with privacy policy content
- [ ] **Terms of Service**: Create `/terms` page with terms content
- [ ] **Social Media**: Create Twitter (@translitpro) and Facebook (facebook.com/translitpro) pages
- [ ] **Analytics**: Add Cloudflare Web Analytics or Google Analytics
- [ ] **Images**: Add Open Graph image (`/og-image.png`) for social sharing
- [x] **Branding**: Logo, title, and favicon images integrated
- [ ] **Contact Form**: Consider adding a contact form or support email
- [ ] **Blog**: Consider adding a blog section for SEO content marketing
- [ ] **A/B Testing**: Set up conversion tracking for CTA buttons
- [ ] **Performance**: Run Lighthouse audit and optimize as needed

## Links

- **App**: https://app.translitpro.com
- **Landing Page**: https://translitpro.com (after deployment)
