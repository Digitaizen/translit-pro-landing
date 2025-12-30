/**
 * Language configuration for the landing page.
 * Matches the 13+ languages supported in the TranslitPro app.
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', dir: 'ltr' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', dir: 'ltr' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', dir: 'ltr' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', dir: 'ltr' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', dir: 'ltr' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', dir: 'ltr' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', dir: 'ltr' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', dir: 'ltr' },
  { code: 'rue', name: 'Rusyn', nativeName: 'Русиньскый', dir: 'ltr' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', dir: 'ltr' },
];

export const defaultLang = 'en';

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}

