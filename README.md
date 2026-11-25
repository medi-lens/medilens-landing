<div align="center">

  # MEDI lens

  **Escanea y conoce tus medicamentos al instante**

  <p>
    <a href="https://medilens.es/">Web oficial</a> ·
    <a href="https://medilens.es/descarga">Descargar la app</a> ·
    <a href="https://medilens.es/soporte">Soporte</a>
  </p>

  [![Netlify Status](https://api.netlify.com/api/v1/badges/2d6ac58f-f8a7-4637-8912-384c684cd946/deploy-status)](https://app.netlify.com/sites/medilens/deploys)
</div>

---

## Acerca del proyecto

Este repositorio contiene la landing page oficial de **MEDI lens**, una aplicación gratuita para Android e iOS que facilita el acceso a información fiable sobre medicamentos.

MEDI lens permite escanear códigos de barra, consultar prospectos y fichas técnicas, organizar un botiquín digital y recibir avisos de caducidad desde el móvil.

<div align="center">
  <img src="public/medilens-og.png" alt="MEDI lens" width="720">
</div>

## Qué ofrece MEDI lens

- **Escaneo y búsqueda** de medicamentos mediante código de barras o nombre.
- **Información oficial** de la AEMPS, siempre accesible desde el dispositivo.
- **Prospecto y ficha técnica** reunidos en una consulta rápida.
- **Botiquín digital** para guardar medicamentos y controlar fechas de caducidad.
- **Alertas de caducidad** antes de que los productos pierdan su vigencia.
- **Accesibilidad** compatible con TalkBack y VoiceOver.
- **Diseño multiplataforma**, disponible para Android e iPhone.
- **Versiones mínimas compatibles:** Android 7+ e iOS 16.4+.

## Sobre este sitio

La web está creada con **Astro 7** y JavaScript vanilla. Se despliega en **Netlify** con el adaptador de Astro, una Netlify Function para el alta del boletín y una Edge Function para otros flujos del sitio.

```text
src/
├── assets/       # Imágenes e iconos procesados por Astro
├── components/   # Componentes reutilizables, incluida la home
├── layouts/      # Plantillas generales y estructura de página
├── pages/        # Rutas y páginas de la web
├── scripts/      # JavaScript del sitio
└── styles/       # Estilos globales

functions/        # Netlify Functions (alta de newsletter en Mailjet)
netlify/          # Edge Functions
public/           # Recursos estáticos copiados directamente
netlify.toml      # Configuración de Astro, Netlify Functions y Edge Functions
```

La home compone las secciones de prensa y newsletter mediante `PressNews.astro` y `NewsletterSignup.astro`. Los botones de las tiendas muestran los requisitos mínimos de Android e iOS en la home.

## Requisitos

- Node.js **24.22.3** o superior
- npm **11.3.0** o superior

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar el entorno de desarrollo
npm run dev

# Crear la versión de producción en dist/
npm run build

# Previsualizar la compilación
npm run preview
```

Para probar localmente el endpoint de newsletter, utiliza `netlify dev` con el [CLI de Netlify](https://docs.netlify.com/cli/get-started/). `npm run dev` inicia Astro directamente y no ejecuta las Netlify Functions.

## Newsletter y Mailjet

El formulario de `NewsletterSignup.astro` se sirve desde la propia web y envía la dirección a `POST /api/newsletter`. La Netlify Function `functions/newsletter.mjs` llama a Mailjet desde el servidor; el navegador no carga el script ni el formulario incrustado de Mailjet.

La suscripción se activa directamente al enviar el formulario, sin doble opt-in. La función usa la acción `addnoforce`: añade contactos nuevos y respeta las bajas existentes. También limita solicitudes por IP y descarta envíos que rellenan el campo honeypot.

Configura estas variables en el entorno del sitio Netlify con alcance **Functions**. No las guardes en `netlify.toml` ni en el repositorio:

- `MAILJET_API_KEY_PUBLIC`: clave pública de la API de Mailjet.
- `MAILJET_API_KEY_SECRET`: clave secreta de la API; márcala como secreta.
- `MAILJET_NEWSLETTER_LIST_ID`: ID numérico de la lista de contactos de Mailjet.

Después de modificar variables de entorno, vuelve a desplegar el sitio para que la función reciba los nuevos valores.

## Enlaces

- **Web:** [medilens.es](https://medilens.es/)
- **Contacto:** [medilens.es/contacto](https://medilens.es/contacto)
- **Patrocina MEDI lens:** [medilens.es/patrocina-medilens](https://medilens.es/patrocina-medilens)
- **Prensa:** [prensa@medilens.es](mailto:prensa@medilens.es)

---

<div align="center">
  <sub>MEDI lens — Escanea y conoce tus medicamentos</sub>
</div>
