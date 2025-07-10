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
        <!--<a href="#">-->
        <div>
          <img src="/assets/images/medilens-google-play.png" alt="Google Play" />
        </div>
        <!--</a>-->
        <!--<a href="#">-->
        <div>
          <img
            src="/assets/images/medilens-apple-store-blk.svg"
            alt="Apple Store"
          />
        </div>
        <!--</a>-->
        <!--<a class="app-web" href="https://app.medilens.es">
          <img src="/assets/icons/ml-icon-bxd.svg" alt="Medilens Logo" />
          <div>
            <small>Accede a la</small>
            <span>Versión Web</span>
          </div>
        </a>-->
      </div>
    </template>
    <template #home-features-after>
      <section class="mailjet-form">
        <iframe
          class="mailjet-embedded-form"
          data-w-type="embedded"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://s8h2u.mjt.lu/wgt/s8h2u/0s49/form?c=13b8b50e"
          width="100%"
        ></iframe>
      </section>
    </template>
  </Layout>
</template>
