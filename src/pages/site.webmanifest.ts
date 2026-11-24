import medilensIcon from '@/assets/icons/medilens-icon.svg?no-inline';

const manifest = {
  name: 'MEDI lens',
  short_name: 'MEDI lens',
  description: 'Escanea y conoce tus medicamentos',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#F25939',
  icons: [
    { src: medilensIcon, sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: medilensIcon, sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
  ],
};

export const GET = () => new Response(JSON.stringify(manifest), {
  headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
});
