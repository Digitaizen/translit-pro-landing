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

## Theme Customization

The landing page uses a centralized theme system that separates styling from content. All colors and design tokens are defined in `src/theme.config.ts`.

### Quick Theme Change

To change the color scheme (e.g., from indigo to blue):

1. Open `src/theme.config.ts`
2. Replace color values in the `theme.colors` object
3. Rebuild the site with `npm run build`

Example:
```typescript
primary: {
  light: 'blue-400',   // was indigo-400
  main: 'blue-500',    // was indigo-500
  dark: 'blue-600',    // was indigo-600
  darker: 'blue-900',  // was indigo-900
}
```

### Current Theme

- **Primary Brand**: Indigo (`indigo-400` to `indigo-900`)
- **Secondary Accent**: Cyan (`cyan-500`)
- **Backgrounds**: Dark slate (`slate-700` to `slate-950`)
- **Text**: White, `slate-300`, `slate-400`

### Documentation

- **`THEME.md`** - Complete theme customization guide
- **`THEME_SUMMARY.md`** - Quick reference with color palette and usage examples

### Reusing in Main App

To use this theme in your main TranslitPro app:

1. Copy `src/theme.config.ts` to your app
2. Import and use the theme object:
   ```typescript
   import { theme } from './theme.config';
   const buttonClass = `bg-${theme.colors.primary.dark} text-${theme.colors.text.primary}`;
   ```

This ensures visual consistency between the landing page and the main application.

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
