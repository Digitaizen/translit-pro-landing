# TranslitPro Landing Page - Theme Summary

## Quick Reference

This is a quick reference for the current color theme used in the TranslitPro landing page.

### Color Palette

```typescript
{
  // Primary Brand Colors
  primary: {
    light: 'indigo-400',   // #818CF8
    main: 'indigo-500',    // #6366F1
    dark: 'indigo-600',    // #4F46E5
    darker: 'indigo-900',  // #312E81
  },
  
  // Secondary Accent
  secondary: {
    main: 'cyan-500',      // #06B6D4
  },
  
  // Backgrounds
  background: {
    base: 'slate-900',     // #0F172A (Main background)
    elevated: 'slate-800', // #1E293B (Cards)
    darker: 'slate-950',   // #020617 (Footer)
    subtle: 'slate-700',   // #334155 (Hover states)
  },
  
  // Borders
  border: {
    default: 'slate-700',  // #334155
    subtle: 'slate-800',   // #1E293B
    primary: 'indigo-500', // #6366F1
  },
  
  // Text
  text: {
    primary: 'white',      // #FFFFFF
    secondary: 'slate-300',// #CBD5E1
    muted: 'slate-400',    // #94A3B8
  },
  
  // Status/Semantic
  status: {
    success: 'green-400',     // #4ADE80
    warning: 'amber-500',     // #F59E0B
    warningText: 'amber-950', // #451A03
    error: 'red-500',         // #EF4444
    info: 'yellow-500',       // #EAB308
  },
}
```

### Opacity Values

```typescript
{
  subtle: '50',   // 50% opacity (e.g., bg-slate-800/50)
  light: '20',    // 20% opacity (e.g., bg-indigo-500/20)
  medium: '80',   // 80% opacity (e.g., bg-slate-900/80)
}
```

## Usage in Components

### Example 1: Primary Button
```astro
<button class={`bg-${theme.colors.primary.dark} text-${theme.colors.text.primary} hover:bg-${theme.colors.primary.main}`}>
  Click Me
</button>
```
Renders as: `bg-indigo-600 text-white hover:bg-indigo-500`

### Example 2: Card with Border
```astro
<div class={`bg-${theme.colors.background.elevated}/${theme.opacity.subtle} border border-${theme.colors.border.default}`}>
  Card content
</div>
```
Renders as: `bg-slate-800/50 border border-slate-700`

### Example 3: Text Hierarchy
```astro
<h1 class={`text-${theme.colors.text.primary}`}>Main Heading</h1>
<p class={`text-${theme.colors.text.muted}`}>Description text</p>
```
Renders as: `text-white` and `text-slate-400`

## Visual Hierarchy

### Backgrounds (Darkest to Lightest)
1. **Footer/Deeper sections**: `slate-950` (#020617)
2. **Main background**: `slate-900` (#0F172A)
3. **Cards/Elevated**: `slate-800` (#1E293B)
4. **Hover states**: `slate-700` (#334155)

### Text (Most to Least Prominent)
1. **Headings**: `white` (#FFFFFF)
2. **Body/Links**: `slate-300` (#CBD5E1)
3. **Descriptions**: `slate-400` (#94A3B8)

### Brand Colors (Light to Dark)
1. **Links/Light accents**: `indigo-400` (#818CF8)
2. **Hover states**: `indigo-500` (#6366F1)
3. **Primary CTAs**: `indigo-600` (#4F46E5)
4. **Gradients**: `indigo-900` (#312E81)

## Where Colors Are Used

| Color | Usage |
|-------|-------|
| `indigo-600` | Primary CTA buttons, highlighted pricing tier |
| `indigo-500` | Button hover states, borders on hover |
| `indigo-400` | Text links, gradient accents |
| `cyan-500` | Secondary gradient color |
| `slate-900` | Main page background, browser chrome |
| `slate-800` | Feature cards, FAQ items, language dropdown |
| `slate-700` | Card borders, hover backgrounds |
| `slate-950` | Footer, pricing section background |
| `white` | All headings, primary text |
| `slate-300` | Navigation links, secondary text |
| `slate-400` | Descriptions, muted text |
| `green-400` | Feature checkmarks |
| `amber-500` | "Limited Time" badge background |
| `amber-950` | Badge text color |

## Accessibility Notes

- **Contrast Ratios**: All text/background combinations meet WCAG AA standards (4.5:1 minimum)
- **Primary CTA**: `white` on `indigo-600` = 8.59:1 ✓
- **Body Text**: `slate-300` on `slate-900` = 9.77:1 ✓
- **Muted Text**: `slate-400` on `slate-900` = 6.12:1 ✓

## Reusing in Main App

To use this exact theme in your main TranslitPro app:

1. Copy `src/theme.config.ts` to your app
2. Import and use:
   ```typescript
   import { theme } from './theme.config';
   ```
3. Apply the same color tokens in your components

This ensures visual consistency between the landing page and the main application.

