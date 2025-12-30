// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.translitpro.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2020'
    }
  },
  adapter: cloudflare(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'uk', 'be', 'bg', 'he', 'hy', 'ka', 'el', 'lt', 'tg', 'rue', 'kk'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});