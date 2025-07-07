<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-actions-after>
      <div class="custom-hero-actions">
        <a href="#">
          <img src="/assets/img/medilens-google-play.png" alt="Google Play" />
        </a>
        <a href="#">
          <img src="/assets/img/medilens-apple-store-blk.svg" alt="Apple Store" />
        </a>
        <a class="app-web" href="https://app.medilens.es">
          <img src="/assets/icons/ml-icon-bxd.svg" alt="Medilens Logo" />
          <div>
            <small>Accede a la</small>
            <span>Versión Web</span>
          </div>
        </a>
      </div>
    </template>
  </Layout>
</template>
