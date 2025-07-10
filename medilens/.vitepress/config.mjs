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

    if (pageData.frontmatter?.title) {
      head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }]);
    }
    if (pageData.frontmatter?.description) {
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }]);
    }

    head.push(['meta', { property: 'og:type', content: 'website' }]);
    // head.push(['meta', { property: 'og:url', content: pageData.relativePath ? `https://medilens.es/${pageData.relativePath}` : 'https://medilens.es/' }]);
    head.push(['meta', { property: 'og:image', content: 'https://medilens.es/assets/images/medilens-og-image.png' }]);

    return head
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      { src: 'https://app.mailjet.com/pas-nc-embedded-v1.js' }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-HG4RJR1M0Z' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q5L6NM10BG');`
    ]
  ],
  lang: 'es',
  title: "MEDI lens",
  titleTemplate: 'MEDI lens',
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
        text: '🙋‍♂️ Quienes Somos',
        link: '/quienes-somos',
        activeMatch: '/quienes-somos'
      },
      {
        text: '🗃️ Dossier Medios',
        link: '/dossier-medios',
        activeMatch: '/dossier-medios'
      },
      {
        text: '📣 Presentación',
        link: '/presentamos-medilens',
        activeMatch: '/presentamos-medilens'
      },
      {
        text: '1.0.0',
        items: [
          { text: '📝 Changelog', link: 'CHANGELOG' },
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
        icon: {
          svg: '<svg viewBox="0 0 28.99 31.99" xmlns="http://www.w3.org/2000/svg"><g data-name="Capa 2"><g data-name="Capa 1"><path d="M13.54 15.28.12 29.34a3.66 3.66 0 0 0 5.33 2.16l15.1-8.6Z" style="fill:#ea4335"/><path d="m27.11 12.89-6.53-3.74-7.35 6.45 7.38 7.28 6.48-3.7a3.54 3.54 0 0 0 1.5-4.79 3.62 3.62 0 0 0-1.5-1.5z" style="fill:#fbbc04"/><path d="M.12 2.66a3.57 3.57 0 0 0-.12.92v24.84a3.57 3.57 0 0 0 .12.92L14 15.64Z" style="fill:#4285f4"/><path d="m13.64 16 6.94-6.85L5.5.51A3.73 3.73 0 0 0 3.63 0 3.64 3.64 0 0 0 .12 2.65Z" style="fill:#34a853"/></g></g></svg>'
        },
        link: 'https://play.google.com/store/apps/details?id=es.medilens.app&utm_source=medilens_website&utm_medium=referral&utm_campaign=socialLinks_cta',
        ariaLabel: 'Google Play'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 800 800" enable-background="new 0 0 800 800" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="400.05" y1="798.7717" x2="400.05" y2="-1.2283" gradientTransform="matrix(1 0 0 -1 0 798.7717)"><stop offset="0" style="stop-color:#18BFFB"/><stop offset="1" style="stop-color:#2072F3"/></linearGradient><path fill="url(#SVGID_1_)" d="M638.4,0H161.6C72.3,0,0,72.3,0,161.6v476.9C0,727.7,72.3,800,161.6,800h476.9  c89.2,0,161.6-72.3,161.6-161.6V161.6C800,72.3,727.7,0,638.4,0z"/><path fill="#FFFFFF" d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9  c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4  c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7  c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7  c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4  c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z"/><script xmlns=""/></svg>'
        },
        link: 'https://www.apple.com/es/app-store/',
        ariaLabel: 'Apple Store'
      }
      ,
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f25939" viewBox="0 0 256 256"><path d="M216.43,39.6a53.27,53.27,0,0,0-75.33,0L39.6,141.09a53.26,53.26,0,0,0,75.32,75.31L216.43,114.91A53.32,53.32,0,0,0,216.43,39.6Zm-11.32,64-50.75,50.74-52.69-52.68,50.75-50.75a37.26,37.26,0,0,1,52.69,52.69ZM189.68,82.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,1,1-11.31-11.32l24-24A8,8,0,0,1,189.68,82.34Z"></path></svg>'
        },
        link: 'https://app.medilens.es',
        ariaLabel: 'MEDI lens APP'
      }
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
    returnToTopLabel: "Volver arriba ↑",

    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    footer: {
      message: 'MEDI lens - Escanea y conoce tus medicamentos',
      copyright: 'Hecho con ❤️ en Almería 🍅 · Copyright © 2025'
    }
  }
})
