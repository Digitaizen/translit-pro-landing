/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Theme colors are managed in src/theme.config.ts
      // This config is kept minimal to allow easy theme switching
    },
  },
  plugins: [],
}

