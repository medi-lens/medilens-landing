import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

const excludedSitemapPaths = new Set([
  '/android',
  '/descarga',
  '/dossier-medios',
  '/ios',
]);

export default defineConfig({
  site: 'https://medilens.es',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  adapter: netlify({
    devFeatures: {
      edgeFunctions: false,
    },
  }),
  session: false,
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  redirects: {
    '/android': {
      destination: 'https://play.google.com/store/apps/details?id=es.medilens.app',
      status: 302,
    },
    '/ios': {
      destination: 'https://apps.apple.com/es/app/medi-lens/id6749312020',
      status: 302,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
        return !excludedSitemapPaths.has(pathname);
      },
    }),
  ],
});
