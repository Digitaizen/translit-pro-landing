# Theme Customization Guide

This document explains the color theme used in the TranslitPro landing page and how to customize it.

## Overview

The landing page uses **static Tailwind CSS classes** for all styling. The `src/theme.config.ts` file serves as a **reference document** showing the color palette, but components use hardcoded Tailwind classes directly.

**Why static classes?** Tailwind v4's JIT (Just-In-Time) compiler doesn't support dynamic class generation using template literals (e.g., `` `bg-${variable}` ``). All classes must be statically analyzable at build time.

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

Since all components use static Tailwind classes, changing the theme requires **find-and-replace** across component files.

### Option 1: Quick Color Swap (e.g., Indigo → Blue)

1. **Search and replace** across all files in `src/components/`:
   - `indigo-400` → `blue-400`
   - `indigo-500` → `blue-500`
   - `indigo-600` → `blue-600`
   - `indigo-900` → `blue-900`

2. Update `src/theme.config.ts` to reflect the new colors (for documentation)

3. Rebuild: `npm run build`

### Option 2: Complete Theme Overhaul

To create a completely custom theme:

1. **Plan your color palette** using Tailwind's color system
2. **Find and replace** all color classes in `src/components/`:
   - Primary colors: `indigo-*` → your brand color
   - Backgrounds: `slate-*` → your background colors
   - Text colors: `white`, `slate-300`, `slate-400` → your text colors
3. **Update** `src/theme.config.ts` for reference
4. **Test** all components for proper contrast and accessibility
5. **Rebuild**: `npm run build`

### Option 3: Light Theme

To convert to a light theme, replace:

**Backgrounds:**
- `bg-slate-900` → `bg-white`
- `bg-slate-800` → `bg-gray-50`
- `bg-slate-950` → `bg-gray-100`
- `bg-slate-700` → `bg-gray-200`

**Text:**
- `text-white` → `text-gray-900`
- `text-slate-300` → `text-gray-700`
- `text-slate-400` → `text-gray-500`

**Borders:**
- `border-slate-700` → `border-gray-300`
- `border-slate-800` → `border-gray-200`

## Dynamic Theme Switching

The current implementation **does not support runtime theme switching**. All classes are static and compiled at build time.

### To Enable Dynamic Themes:

If you need runtime theme switching (e.g., light/dark mode toggle), consider:

1. **CSS Variables** (Recommended):
   ```css
   :root {
     --color-primary: #6366f1;
     --color-bg: #0f172a;
   }
   [data-theme="light"] {
     --color-bg: #ffffff;
   }
   ```
   Then use: `style="background: var(--color-bg)"`

2. **Tailwind Safelist**:
   Add all possible theme classes to `tailwind.config.mjs`:
   ```js
   safelist: ['bg-indigo-600', 'bg-blue-600', ...]
   ```

3. **Class Toggling**:
   Use JavaScript to toggle classes like `dark` mode:
   ```html
   <body class="dark">
   <div class="bg-white dark:bg-slate-900">
   ```

## Reusing Colors in Other Apps

To maintain visual consistency with your main TranslitPro app:

1. **Copy the color palette** from `src/theme.config.ts`
2. **Use the same Tailwind color tokens** in your app
3. **Or extract to CSS variables** for framework-agnostic usage:
   ```css
   :root {
     --color-primary: #4f46e5; /* indigo-600 */
     --color-bg: #0f172a;      /* slate-900 */
   }
   ```

## Components Using Static Tailwind Classes

All components use static Tailwind classes directly:

- `src/components/Header.astro` - Navigation and CTAs
- `src/components/Hero.astro` - Hero section with gradients
- `src/components/Features.astro` - Feature cards
- `src/components/Pricing.astro` - Pricing tiers
- `src/components/FAQ.astro` - FAQ accordion
- `src/components/Footer.astro` - Footer section
- `src/components/LanguageDropdown.astro` - Language selector
- `src/layouts/BaseLayout.astro` - Base page layout

**Note**: `src/theme.config.ts` exists for reference only and is not imported by components.

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

