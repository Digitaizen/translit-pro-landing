/**
 * i18n utility functions for loading and using translations.
 */

import { defaultLang } from './languages';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import ukTranslations from './locales/uk.json';
import beTranslations from './locales/be.json';
import bgTranslations from './locales/bg.json';
import heTranslations from './locales/he.json';
import hyTranslations from './locales/hy.json';
import kaTranslations from './locales/ka.json';
import elTranslations from './locales/el.json';
import ltTranslations from './locales/lt.json';
import tgTranslations from './locales/tg.json';
import rueTranslations from './locales/rue.json';
import kkTranslations from './locales/kk.json';

export type TranslationKey = string;

const translations: Record<string, any> = {
  en: enTranslations,
  ru: ruTranslations,
  uk: ukTranslations,
  be: beTranslations,
  bg: bgTranslations,
  he: heTranslations,
  hy: hyTranslations,
  ka: kaTranslations,
  el: elTranslations,
  lt: ltTranslations,
  tg: tgTranslations,
  rue: rueTranslations,
  kk: kkTranslations,
};

export function getTranslations(lang: string = defaultLang) {
  const translation = translations[lang] || translations[defaultLang];
  if (!translation) {
    console.error(`No translations found for ${lang}, using default`);
    return translations[defaultLang];
  }
  return translation;
}

export function useTranslations(lang: string = defaultLang) {
  return async () => {
    return await getTranslations(lang);
  };
}

