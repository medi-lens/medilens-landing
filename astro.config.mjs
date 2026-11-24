import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { appStoreUrls } from './src/constants/appStores.mjs';

const excludedSitemapPaths = new Set([
  '/android',
  '/descarga',
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
      destination: appStoreUrls.googlePlay,
      status: 302,
    },
    '/docs/NOTA_PRENSA_MEDILENS_L.pdf': {
      destination: '/docs/NOTA_PRENSA_MEDILENS.pdf',
      status: 301,
    },
    '/docs/NOTA_PRENSA_MEDILENS_N.pdf': {
      destination: '/docs/NOTA_PRENSA_MEDILENS.pdf',
      status: 301,
    },
    '/dossier-medios': {
      destination: '/kit-de-prensa',
      status: 301,
    },
    '/ios': {
      destination: appStoreUrls.appleAppStore,
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
