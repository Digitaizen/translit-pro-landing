/**
 * Application configuration.
 * Reads from environment variables with sensible defaults.
 */

/**
 * Show/hide the "Under Construction" banner in the header.
 * Set to true to display the banner, false to hide it.
 */
export const SHOW_UNDER_CONSTRUCTION = true;

/**
 * Base URL for the main TranslitPro app.
 * - Development: Set PUBLIC_APP_URL in .env to your local app URL
 * - Production: Defaults to https://app.translitpro.com
 */
export const APP_BASE_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.translitpro.com';

/**
 * Build a URL to the main app with optional path and language parameter.
 * @param path - Optional path (e.g., '/login', '/signup', '/trial')
 * @param currentLang - Current language code (adds ?lang= param if not 'en')
 * @param queryParams - Optional additional query parameters (e.g., 'plan=pro')
 * @returns Full URL to the main app
 */
export function buildAppUrl(path: string = '', currentLang: string = 'en', queryParams: string = ''): string {
  const base = `${APP_BASE_URL}${path}`;
  const langParam = currentLang !== 'en' ? `lang=${currentLang}` : '';
  
  if (queryParams && langParam) {
    return `${base}?${queryParams}&${langParam}`;
  } else if (queryParams) {
    return `${base}?${queryParams}`;
  } else if (langParam) {
    return `${base}?${langParam}`;
  }
  return base;
}

