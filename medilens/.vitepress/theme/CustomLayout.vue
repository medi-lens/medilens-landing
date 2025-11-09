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
    <template #not-found>
      <div class="NotFound">
        <p class="code">404</p>
        <h1 class="title">PÁGINA NO ENCONTRADA</h1>
        <div class="divider"></div>
        <blockquote class="quote">
          No llegaste donde querías, pero llegaste a algún lugar.
        </blockquote>
        <div class="action">
          <a class="link" href="/" aria-label="go to home">Volver al inicio</a>
        </div>
      </div>
    </template>
    <template #home-features-after>
      <section class="custom-home-content">
        <section class="faq-wrapper">
          <h2>Preguntas frecuentes</h2>
          <section class="faq">
            <details>
              <summary>¿MEDI lens necesita conexión a Internet?</summary>
              <p>
                Sí. Para recuperar datos oficiales y prospectos la app consulta
                fuentes externas; algunas funciones (búsquedas recientes,
                historial, favoritos, botiquín) pueden funcionar sin conexión.
              </p>
            </details>

            <details>
              <summary>¿Es gratuita? ¿Hay compras dentro de la app?</summary>
              <p>
                La app es totalmente gratuita. No incluye compras
                dentro de la aplicación.
              </p>
            </details>

            <details>
              <summary>¿Qué permisos solicita la app y por qué?</summary>
              <p>
                Solicita principalmente acceso a la cámara para escanear códigos
                y permiso de notificaciones para alertas de caducidad. Solo se
                piden permisos necesarios para la funcionalidad.
              </p>
            </details>

            <details>
              <summary>¿Qué hace la app con mis datos personales?</summary>
              <p>
                No se recoge ningún dato pernonal. Consulta nuestra
                <a href="/politica-privacidad">Política de privacidad</a> para
                detalles sobre almacenamiento, sincronización y eliminación.
              </p>
            </details>

            <details>
              <summary>
                ¿Funciona en iOS y Android y qué versiones son compatibles?
              </summary>
              <p>
                MEDI lens está disponible en Google Play y App Store.
                Recomendamos usar versiones recientes de iOS y Android; La app
                es compatible con <strong>Android 7+</strong> y <strong>iOS 15.1+</strong>.
              </p>
            </details>

            <details>
              <summary>¿La app es accesible para lectores de pantalla?</summary>
              <p>
                Sí. Está diseñada para ser compatible con TalkBack (Android) y
                VoiceOver (iOS) y seguir buenas prácticas de accesibilidad.
              </p>
            </details>

            <details>
              <summary>¿Puedo usar la app sin conexión (modo offline)?</summary>
              <p>
                Algunas consultas quedan en caché para uso offline, pero la
                búsqueda completa y prospectos suelen requerir conexión.
              </p>
            </details>

            <details>
              <summary>¿Cómo funcionan las alertas de caducidad?</summary>
              <p>
                Puedes guardar la fecha de caducidad en tu botiquín; la app
                envía notificaciones locales según los permisos y las
                preferencias de aviso.
              </p>
            </details>

            <details>
              <summary>
                ¿Puedo sincronizar mis datos entre dispositivos?
              </summary>
              <p>
                La sincronización en la nube está planificada. Actualmente la
                función no está disponible; habrá opción de cuenta y backup en
                futuras versiones.
              </p>
            </details>

            <details>
              <summary>¿Cómo reporto errores o doy feedback?</summary>
              <p>
                Usa la sección de soporte en la web o escribe a
                <a href="mailto:soporte@medilens.es"
                  ><strong>soporte@medilens.es</strong></a
                >. Incluye versión de la app y pasos para reproducir el
                problema.
              </p>
            </details>
          </section>
        </section>
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
              Nuestra historia aún no ha sido contada. ¿Serás el primero en
              compartirla?
            </p>

            <p>
              Contáctanos a:
              <a href="mailto:prensa@medilens.es"
                ><strong>prensa@medilens.es</strong></a
              >
            </p>
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
