<script setup>
import DefaultTheme from "vitepress/theme";
// import { onMounted } from 'vue'
// onMounted(() => {
//   const script = document.createElement('script')
//   script.src = 'https://app.mailjet.com/pas-nc-embedded-v1.js'
//   script.type = 'text/javascript'
//   document.body.appendChild(script)
// })

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-actions-after>
      <div class="custom-hero-actions">
        <a
          class="google-play"
          href="https://play.google.com/store/apps/details?id=es.medilens.app&utm_source=medilens_website&utm_medium=referral&utm_campaign=heroActions_cta"
        >
          <img
            src="/assets/images/medilens-google-play.png"
            alt="Google Play"
          />
        </a>
        <a
          class="app-store"
          href="https://apps.apple.com/es/app/medi-lens/id6749312020?utm_source=medilens_website&utm_medium=referral&utm_campaign=heroActions_cta"
        >
          <img
            src="/assets/images/medilens-apple-store-blk.svg"
            alt="Apple Store"
          />
        </a>
        <!-- <a
          class="app-web"
          href="https://app.medilens.es?utm_source=medilens_website&utm_medium=referral&utm_campaign=heroActions_cta"
        >
          <img src="/assets/icons/ml-icon-bxd.svg" alt="Medilens Logo" />
          <div>
            <small>Accede a la</small>
            <span>Versión Web</span>
          </div>
        </a> -->
      </div>
    </template>
    <template #home-features-after>
      <section class="custom-home-content">
        <section class="sponsorship-wrapper">
          <h2>Patrocinadores</h2>
          <section class="sponsorship">
            <p>
              Todavía no tenemos patrocinadores. Esta es tu oportunidad de
              marcar la diferencia desde el inicio.
            </p>
            <a class="custom-button" href="/patrocina-medilens">
              Patrocina <span>MEDI lens</span>
            </a>
          </section>
        </section>
        <section class="news-wrapper">
          <h2>Prensa y Noticias</h2>
          <section class="news">
            <p>
              Nuestra historia aún no ha sido contada. ¿Serás el primero en compartirla?
            </p>
            
            <p>Contáctanos a: <a href="mailto:prensa@medilens.es"><strong>prensa@medilens.es</strong></a></p>

          </section>
        </section>
        <section class="mailjet-form">
          <h2>Newsletter</h2>
          <iframe
            data-w-type="embedded"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://s8h2u.mjt.lu/wgt/s8h2u/0s49/form?c=13b8b50e"
            width="100%"
            style="height: 0"
          ></iframe>
        </section>
      </section>
    </template>
  </Layout>
</template>
