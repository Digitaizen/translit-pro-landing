# TranslitPro Landing Page

Marketing landing page for [TranslitPro](https://app.translitpro.com) - a desktop transliteration suite for 13+ languages.

## Overview

This is a static landing page built with Astro and Tailwind CSS, deployed to Cloudflare Pages. It showcases TranslitPro's features, pricing, and FAQs to convert visitors into users.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.x
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **SEO**: Auto-generated sitemap, structured data for FAQs

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
│   │   ├── Header.astro      # Navigation header
│   │   ├── Hero.astro        # Hero section with CTA
│   │   ├── Features.astro    # Features grid
│   │   ├── Pricing.astro     # Pricing tiers
│   │   ├── FAQ.astro         # FAQ accordion with structured data
│   │   └── Footer.astro      # Footer with links
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base HTML layout with SEO meta tags
│   ├── pages/
│   │   └── index.astro       # Main landing page
│   └── styles/
│       └── global.css        # Global styles (Tailwind imports)
├── astro.config.mjs          # Astro configuration
├── wrangler.jsonc            # Cloudflare Workers config
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

## SEO Features

- Open Graph meta tags for social sharing
- Twitter Card meta tags
- FAQ structured data (JSON-LD) for rich snippets
- Auto-generated sitemap at `/sitemap-index.xml`
- robots.txt configured

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
