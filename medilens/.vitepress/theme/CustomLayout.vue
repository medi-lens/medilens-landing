<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-actions-after>
      <div class="custom-hero-actions">
        <img
          src="/assets/img/medilens-google-play.png"
          alt="Medilens Logo"
          class="home-hero-logo"
        />
        <img
          src="/assets/img/medilens-apple-store-wht.svg"
          alt="Medilens Logo"
          class="home-hero-logo"
        />
        <a href="#">APP Web</a>
      </div>
    </template>
  </Layout>
</template>
