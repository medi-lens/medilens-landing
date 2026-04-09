<script>
  // Detectar el dispositivo y redirigir
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // URLs de las tiendas
  const iosUrl = 'https://apps.apple.com/es/app/medi-lens/id6749312020';
  const androidUrl = 'https://play.google.com/store/apps/details?id=es.medilens.app';

  // Detectar iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.replace(iosUrl);
  }
  // Detectar Android
  else if (/Android/.test(userAgent)) {
    window.location.replace(androidUrl);
  }
</script>

# Descargar MEDI Lens

<em>Detectando tu dispositivo...</em>

Si no eres redirigido automáticamente, haz clic en el botón correspondiente:

<div class="custom-hero-actions">
    <a href="https://play.google.com/store/apps/details?id=es.medilens.app&utm_source=medilens_website&utm_medium=referral&utm_campaign=descarga_cta">
        <img src="/assets/images/medilens-google-play.png" alt="Google Play" />
    </a>
    <a href="https://apps.apple.com/es/app/medi-lens/id6749312020?utm_source=medilens_website&utm_medium=referral&utm_campaign=descarga_cta">
        <img src="/assets/images/medilens-apple-store-blk.svg" alt="Apple Store" />
    </a>
</div>
