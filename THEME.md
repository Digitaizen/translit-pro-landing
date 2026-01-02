# Theme Customization Guide

This document explains how to customize the color theme for the TranslitPro landing page.

## Overview

All color definitions are centralized in `src/theme.config.ts`. This makes it easy to:
- Change the entire color scheme in one place
- Maintain consistency across all components
- Reuse the same theme in other applications (like the main TranslitPro app)

## Current Color Scheme

The landing page uses a **dark theme** with the following color palette:

### Primary Colors (Brand)
- **Light**: `indigo-400` - Used for links and light accents
- **Main**: `indigo-500` - Used for hover states and gradients
- **Dark**: `indigo-600` - Used for primary CTAs and buttons
- **Darker**: `indigo-900` - Used for background gradients

### Secondary Colors
- **Main**: `cyan-500` - Used for gradient accents

### Background Colors
- **Base**: `slate-900` - Main page background
- **Elevated**: `slate-800` - Cards and elevated surfaces
- **Darker**: `slate-950` - Footer and deeper sections
- **Subtle**: `slate-700` - Hover states and secondary surfaces

### Border Colors
- **Default**: `slate-700` - Standard borders
- **Subtle**: `slate-800` - Subtle dividers
- **Primary**: `indigo-500` - Highlighted borders

### Text Colors
- **Primary**: `white` - Main headings and important text
- **Secondary**: `slate-300` - Navigation links and secondary text
- **Muted**: `slate-400` - Descriptions and less important text

### Status Colors
- **Success**: `green-400` - Checkmarks and success indicators
- **Warning**: `amber-500` - Warning badges
- **Warning Text**: `amber-950` - Text on warning badges
- **Error**: `red-500` - Error states (browser chrome)
- **Info**: `yellow-500` - Info states (browser chrome)

## How to Change the Theme

### Option 1: Quick Color Swap

To change to a different color scheme (e.g., from indigo to blue):

1. Open `src/theme.config.ts`
2. Replace all `indigo-*` values with your preferred color (e.g., `blue-*`)
3. Rebuild the site with `npm run build`

Example:
```typescript
primary: {
  light: 'blue-400',    // was indigo-400
  main: 'blue-500',     // was indigo-500
  dark: 'blue-600',     // was indigo-600
  darker: 'blue-900',   // was indigo-900
},
```

### Option 2: Complete Theme Overhaul

To create a completely custom theme:

1. Open `src/theme.config.ts`
2. Update all color values in the `theme.colors` object
3. Keep the same structure (primary, background, border, text, status)
4. Rebuild the site

Example for a green theme:
```typescript
export const theme = {
  colors: {
    primary: {
      light: 'emerald-400',
      main: 'emerald-500',
      dark: 'emerald-600',
      darker: 'emerald-900',
    },
    secondary: {
      main: 'teal-500',
    },
    // ... rest of the colors
  },
  // ...
}
```

### Option 3: Light Theme

To convert to a light theme:

1. Update background colors to light variants:
   ```typescript
   background: {
     base: 'white',
     elevated: 'gray-50',
     darker: 'gray-100',
     subtle: 'gray-200',
   }
   ```

2. Update text colors to dark variants:
   ```typescript
   text: {
     primary: 'gray-900',
     secondary: 'gray-700',
     muted: 'gray-500',
   }
   ```

3. Update border colors:
   ```typescript
   border: {
     default: 'gray-300',
     subtle: 'gray-200',
     primary: 'indigo-500', // Keep brand color
   }
   ```

## Using the Theme in Other Apps

To use this theme in the main TranslitPro app:

1. Copy `src/theme.config.ts` to your app's source directory
2. Import and use the theme object:
   ```typescript
   import { theme } from './theme.config';
   
   // Use in your components
   const buttonClass = `bg-${theme.colors.primary.dark} text-${theme.colors.text.primary}`;
   ```

3. Or use the helper function:
   ```typescript
   import { getThemeColor } from './theme.config';
   
   const bgClass = getThemeColor('primary.dark', 'bg');
   const textClass = getThemeColor('text.primary', 'text');
   ```

## Components Using the Theme

All components have been updated to use the centralized theme:

- `src/components/Header.astro` - Navigation and CTAs
- `src/components/Hero.astro` - Hero section with gradients
- `src/components/Features.astro` - Feature cards
- `src/components/Pricing.astro` - Pricing tiers
- `src/components/FAQ.astro` - FAQ accordion
- `src/components/Footer.astro` - Footer section
- `src/components/LanguageDropdown.astro` - Language selector
- `src/layouts/BaseLayout.astro` - Base page layout

## Testing Your Changes

After making theme changes:

1. Run the dev server: `npm run dev`
2. Check all sections of the landing page
3. Test hover states and interactions
4. Verify contrast ratios for accessibility
5. Build for production: `npm run build`

## Tips

- **Maintain Contrast**: Ensure sufficient contrast between text and backgrounds (WCAG AA: 4.5:1 for normal text)
- **Test Dark Mode**: If your users prefer dark mode, test the theme in both light and dark system settings
- **Brand Consistency**: Keep primary colors aligned with your brand guidelines
- **Semantic Naming**: The theme uses semantic names (primary, secondary, etc.) rather than specific colors, making it easier to swap themes

