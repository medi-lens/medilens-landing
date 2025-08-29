import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformHead({ assets, pageData }) {
    const head = [];
    const myFontFile = assets.find(file => /Akshar\.[\w-]+\.ttf/.test(file))
    
    if (myFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: 'font/ttf',
            crossorigin: ''
          }
        ]
      ]
    }

    // Add Open Graph metadata
    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title ? pageData.frontmatter.title : 'MEDI lens - Escanea y conoce tus medicamentos' }]);
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description ? pageData.frontmatter.description : 'La app de MEDI lens permite escanear y buscar medicamentos, acceder a su prospecto y ficha técnica, ver composiciones, necesidad de receta, así como guardar en un botiquín digital tus medicamentos y recibir notificaciones sobre su fecha próxima de caducidad.' }]);
    head.push(['meta', { property: 'og:type', content:  pageData.frontmatter.metaType ? pageData.frontmatter.metaType : 'website' }]);
    head.push(['meta', { property: 'og:url', content: pageData.relativePath ? `https://medilens.es/${pageData.relativePath}` : 'https://medilens.es/' }]);

    // Add Twitter Card metadata
    head.push(['meta', { name: 'twitter:title', content: pageData.frontmatter.title ? pageData.frontmatter.title : 'MEDI lens - Escanea y conoce tus medicamentos' }]);
    head.push(['meta', { name: 'twitter:description', content: pageData.frontmatter.description ? pageData.frontmatter.description : 'La app de MEDI lens permite escanear y buscar medicamentos, acceder a su prospecto y ficha técnica, ver composiciones, necesidad de receta, así como guardar en un botiquín digital tus medicamentos y recibir notificaciones sobre su fecha próxima de caducidad.' }]);
    head.push(['meta', { property: 'twitter:url', content: pageData.relativePath ? `https://medilens.es/${pageData.relativePath}` : 'https://medilens.es/' }]);

    return head
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:image', content: 'https://medilens.es/assets/images/medilens-og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://medilens.es/assets/images/medilens-og-image.png' }],
    ['meta', { property: 'twitter:domain', content: 'medilens.es' }],
    [
      'script',
      { src: 'https://app.mailjet.com/pas-nc-embedded-v1.js' }
    ],
    [
      'script',
      {
        defer: true,
        src: 'https://cloud.umami.is/script.js',
        'data-website-id': '103590ae-2977-4f10-8fc7-52d70ad16a5f',
      }
    ]
  ],
  lang: 'es',
  title: "MEDI lens",
  titleTemplate: ' MEDI lens',
  description: "Escanea y conoce tus medicamentos",
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'MEDI lens',
    logo: '/assets/icons/ml-icon-bxd.svg',
    nav: [
      {
        text: '🙋‍♂️ Equipo',
        link: '/equipo',
        activeMatch: '/equipo'
      },
      // {
      //   text: '🗃️ Dossier Medios',
      //   link: '/dossier-medios',
      //   activeMatch: '/dossier-medios'
      // },
      {
        text: '📣 Presentación',
        link: '/presentamos-medilens',
        activeMatch: '/presentamos-medilens'
      },
      {
        text: '✉️ Contacto',
        link: '/contacto',
        activeMatch: '/contacto'
      },
      {
        text: 'v1.0.1',
        items: [
          { text: '🚀 Changelog', link: 'changelog' },
          { text: '🗺️ Roadmap', link: 'roadmap' },
        ]
      }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      {
        icon: 'facebook',
        link: 'https://www.facebook.com/medilens.es/',
        ariaLabel: 'Facebook'
      },
      {
        icon: 'instagram',
        link: 'https://www.instagram.com/medilens.es/',
        ariaLabel: 'Instagram'
      },
      {
        icon: 'threads',
        link: 'https://www.threads.com/@medilens.es',
        ariaLabel: 'Threads'
      },
      {
        icon: 'x',
        link: 'https://x.com/medilens_es',
        ariaLabel: 'X (Twitter)'
      },
      {
        icon: 'bluesky',
        link: 'https://bsky.app/profile/medilens.es',
        ariaLabel: 'Bluesky'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path></svg>'
        },
        link: 'https://www.linkedin.com/showcase/medi-lens',
        ariaLabel: 'LindkedIn'
      }
      // {
      //   icon: {
      //     svg: '<svg viewBox="0 0 28.99 31.99" xmlns="http://www.w3.org/2000/svg"><g data-name="Capa 2"><g data-name="Capa 1"><path d="M13.54 15.28.12 29.34a3.66 3.66 0 0 0 5.33 2.16l15.1-8.6Z" style="fill:#ea4335"/><path d="m27.11 12.89-6.53-3.74-7.35 6.45 7.38 7.28 6.48-3.7a3.54 3.54 0 0 0 1.5-4.79 3.62 3.62 0 0 0-1.5-1.5z" style="fill:#fbbc04"/><path d="M.12 2.66a3.57 3.57 0 0 0-.12.92v24.84a3.57 3.57 0 0 0 .12.92L14 15.64Z" style="fill:#4285f4"/><path d="m13.64 16 6.94-6.85L5.5.51A3.73 3.73 0 0 0 3.63 0 3.64 3.64 0 0 0 .12 2.65Z" style="fill:#34a853"/></g></g></svg>'
      //   },
      //   link: 'https://play.google.com/store/apps/details?id=es.medilens.app&utm_source=medilens_website&utm_medium=referral&utm_campaign=socialLinks_cta',
      //   ariaLabel: 'Google Play'
      // },
      // {
      //   icon: {
      //     svg: '<?xml version="1.0" encoding="UTF-8"?><svg enable-background="new 0 0 800 800" version="1.1" viewBox="0 0 800 800" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><linearGradient id="a" x1="400.05" x2="400.05" y1="798.77" y2="-1.2283" gradientTransform="matrix(1 0 0 -1 0 798.77)" gradientUnits="userSpaceOnUse"><stop stop-color="#18BFFB" offset="0"/><stop stop-color="#2072F3" offset="1"/></linearGradient><path d="M638.4,0H161.6C72.3,0,0,72.3,0,161.6v476.9C0,727.7,72.3,800,161.6,800h476.9  c89.2,0,161.6-72.3,161.6-161.6V161.6C800,72.3,727.7,0,638.4,0z" fill="url(#a)"/><path d="m396.6 183.8 16.2-28c10-17.5 32.3-23.4 49.8-13.4s23.4 32.3 13.4 49.8l-156.1 270.2h112.9c36.6 0 57.1 43 41.2 72.8h-331c-20.2 0-36.4-16.2-36.4-36.4s16.2-36.4 36.4-36.4h92.8l118.8-205.9-37.1-64.4c-10-17.5-4.1-39.6 13.4-49.8 17.5-10 39.6-4.1 49.8 13.4l15.9 28.1zm-140.4 388.9-35 60.7c-10 17.5-32.3 23.4-49.8 13.4s-23.4-32.3-13.4-49.8l26-45c29.4-9.1 53.3-2.1 72.2 20.7zm301.4-110.1h94.7c20.2 0 36.4 16.2 36.4 36.4s-16.2 36.4-36.4 36.4h-52.6l35.5 61.6c10 17.5 4.1 39.6-13.4 49.8-17.5 10-39.6 4.1-49.8-13.4-59.8-103.7-104.7-181.3-134.5-233-30.5-52.6-8.7-105.4 12.8-123.3 23.9 41 59.6 102.9 107.3 185.5z" fill="#fff"/></svg>'
      //   },
      //   link: 'https://www.apple.com/es/app-store/?utm_source=medilens_website&utm_medium=referral&utm_campaign=heroActions_cta',
      //   ariaLabel: 'Apple Store'
      // },
      // {
      //   icon: {
      //     svg: '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="100" fill="#F25939"/><path d="M387.263 124.781C372.435 109.955 352.324 101.625 331.354 101.625C310.385 101.625 290.274 109.955 275.445 124.781L124.781 275.43C110.265 290.32 102.2 310.329 102.333 331.123C102.466 351.917 110.786 371.821 125.491 386.524C140.195 401.227 160.101 409.544 180.895 409.674C201.689 409.804 221.697 401.737 236.584 387.219L387.263 236.57C402.063 221.732 410.374 201.632 410.374 180.675C410.374 159.719 402.063 139.618 387.263 124.781ZM370.46 219.781L295.128 295.098L216.916 216.902L292.248 141.57C302.661 131.397 316.664 125.74 331.22 125.826C345.777 125.911 359.713 131.731 370.006 142.024C380.299 152.317 386.119 166.253 386.204 180.809C386.289 195.366 380.632 209.369 370.46 219.781ZM347.556 188.223C348.66 189.326 349.536 190.636 350.134 192.078C350.731 193.519 351.039 195.064 351.039 196.625C351.039 198.186 350.731 199.731 350.134 201.172C349.536 202.614 348.66 203.924 347.556 205.027L311.931 240.652C310.828 241.754 309.518 242.628 308.077 243.224C306.636 243.821 305.091 244.127 303.532 244.126C301.972 244.126 300.428 243.818 298.987 243.22C297.547 242.623 296.238 241.747 295.136 240.644C294.033 239.541 293.159 238.231 292.563 236.79C291.967 235.349 291.66 233.804 291.661 232.245C291.661 230.685 291.969 229.141 292.567 227.7C293.164 226.26 294.04 224.951 295.143 223.848L330.768 188.223C332.995 185.998 336.014 184.748 339.162 184.748C342.31 184.748 345.329 185.998 347.556 188.223Z" fill="white"/></svg>'
      //   },
      //   link: 'https://app.medilens.es?utm_source=medilens_website&utm_medium=referral&utm_campaign=heroActions_cta',
      //   ariaLabel: 'MEDI lens APP'
      // }
    ],

    outline: {
      "label": "Contenido de la página"
    },
    docFooter: {
      "prev": "Anterior",
      "next": "Siguiente"
    },
    // sidebarMenuLabel: "Menú de navegación",
    darkModeSwitchLabel: "Apariencia",
    lightModeSwitchTitle: "Cambiar a modo claro",
    darkModeSwitchTitle: "Cambiar a modo oscuro",
    returnToTopLabel: "Volver arriba ↑",

    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    footer: {
      message: '<span class="logo-colored">MEDI lens</span> — Escanea y conoce tus medicamentos · <a href="/politica-privacidad">Política de privacidad</a> · <a href="/aviso-legal">Aviso Legal</a> · <a href="/soporte">Soporte</a>',
      copyright: 'Hecho con ❤️ en Almería 🍅 · © 2025 MEDI lens® · Todos los derechos reservados.'
    }
  }
})
