// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'
import CustomLayout from './CustomLayout.vue'
import './style.css'
import { initWebVitals } from './webVitals.js'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') initWebVitals()
  }
}
