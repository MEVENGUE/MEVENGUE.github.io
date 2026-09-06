import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mevengue.github.io',
  base: '/mevenguefranck.github.io',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
  vite: {
    build: { target: 'es2022' },
  },
});
