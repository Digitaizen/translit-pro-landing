/**
 * Theme configuration for TranslitPro landing page.
 * 
 * This file centralizes all color definitions to make theme customization easy.
 * To change the theme, simply update the color values here and rebuild.
 * 
 * @example
 * // To use a different primary color, change:
 * primary: { main: 'blue-600', ... }
 */

export const theme = {
  colors: {
    // Primary brand color (used for CTAs, highlights, links)
    primary: {
      light: 'indigo-400',
      main: 'indigo-500',
      dark: 'indigo-600',
      darker: 'indigo-900',
    },
    
    // Secondary accent color (used for gradients, special highlights)
    secondary: {
      main: 'cyan-500',
    },
    
    // Background colors
    background: {
      base: 'slate-900',      // Main background
      elevated: 'slate-800',  // Cards, elevated surfaces
      darker: 'slate-950',    // Footer, deeper sections
      subtle: 'slate-700',    // Hover states, secondary surfaces
    },
    
    // Border colors
    border: {
      default: 'slate-700',
      subtle: 'slate-800',
      primary: 'indigo-500',
    },
    
    // Text colors
    text: {
      primary: 'white',
      secondary: 'slate-300',
      muted: 'slate-400',
    },
    
    // Status/semantic colors
    status: {
      success: 'green-400',
      warning: 'amber-500',
      warningText: 'amber-950',
      error: 'red-500',
      info: 'yellow-500',
    },
  },
  
  // Opacity values for consistent transparency
  opacity: {
    subtle: '50',      // For bg-slate-800/50
    light: '20',       // For bg-indigo-500/20
    medium: '80',      // For bg-slate-900/80
  },
} as const;

/**
 * Helper function to get a theme color class.
 * 
 * @param path - Dot-notation path to the color (e.g., 'primary.main', 'background.base')
 * @param prefix - Tailwind prefix (e.g., 'bg', 'text', 'border')
 * @returns Full Tailwind class name
 * 
 * @example
 * getThemeColor('primary.main', 'bg') // Returns 'bg-indigo-500'
 * getThemeColor('text.primary', 'text') // Returns 'text-white'
 */
export function getThemeColor(path: string, prefix: string): string {
  const keys = path.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) {
      console.warn(`Theme color not found: ${path}`);
      return '';
    }
  }
  
  return `${prefix}-${value}`;
}

/**
 * Type-safe theme color paths for autocomplete support.
 */
export type ThemeColorPath = 
  | 'primary.light'
  | 'primary.main'
  | 'primary.dark'
  | 'primary.darker'
  | 'secondary.main'
  | 'background.base'
  | 'background.elevated'
  | 'background.darker'
  | 'background.subtle'
  | 'border.default'
  | 'border.subtle'
  | 'border.primary'
  | 'text.primary'
  | 'text.secondary'
  | 'text.muted'
  | 'status.success'
  | 'status.warning'
  | 'status.warningText'
  | 'status.error'
  | 'status.info';

