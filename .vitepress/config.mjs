import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Medi Lens",
  description: "Escanea y conoce tus medicamentos",
  cleanUrls: true,
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/assets/img/favicon-32x32.png',
    
    /*head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],*/
    /*nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],*/

    /*sidebar: [
      /* {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      } */
    /*],*/

    /*socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]*/
  }
})
