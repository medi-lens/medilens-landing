[![Netlify Status](https://api.netlify.com/api/v1/badges/2d6ac58f-f8a7-4637-8912-384c684cd946/deploy-status)](https://app.netlify.com/sites/medilens/deploys)

# MEDI lens

Sitio estático de MEDI lens construido con Astro 7.4 y JavaScript vanilla.

## Desarrollo

- `npm install`: instalar dependencias.
- `npm run dev`: iniciar el servidor local.
- `npm run build`: generar el sitio estático en `dist/`.
- `npm run preview`: previsualizar la compilación.

Las páginas y rutas Astro están en `src/pages/`; `changelog.md` se conserva como la única página Markdown. Los layouts y componentes Astro están en `src/`, al igual que los estilos, scripts y las imágenes que Astro procesa. `public/` conserva los recursos que deben copiarse sin transformar. El adaptador de Netlify emite los redirects HTTP y Netlify publica `dist/`, manteniendo la Edge Function configurada en `netlify.toml`.
