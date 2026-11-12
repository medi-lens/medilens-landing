const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');

function applyTheme(theme, savePreference = false) {
  root.dataset.theme = theme;
  if (themeButton) {
    const isDark = theme === 'dark';
    const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    themeButton.setAttribute('aria-pressed', String(isDark));
    const icon = themeButton.querySelector('[data-theme-icon]');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  }
  if (savePreference) {
    try {
      localStorage.setItem('medilens-theme', theme);
    } catch {
      // El tema sigue funcionando aunque el almacenamiento esté bloqueado.
    }
  }
}

applyTheme(root.dataset.theme || 'light');
themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.matchMedia('(max-width: 959px)').matches) {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('is-open');
  }
});

document.querySelectorAll('[data-async-netlify-form]').forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  const dialog = form.nextElementSibling?.matches('[data-feedback-dialog]')
    ? form.nextElementSibling
    : document.querySelector('[data-feedback-dialog]');
  if (!submitButton || !dialog) return;

  const title = dialog.querySelector('[data-dialog-title]');
  const message = dialog.querySelector('[data-dialog-message]');
  const closeButton = dialog.querySelector('[data-dialog-close]');
  const submitLabel = submitButton.textContent;
  closeButton?.addEventListener('click', () => dialog.close());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    try {
      const body = new URLSearchParams(new FormData(form));
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('No se pudo completar el envío. Inténtalo de nuevo.');
      title.textContent = form.dataset.successTitle;
      message.textContent = form.dataset.successMessage;
      form.reset();
    } catch (error) {
      title.textContent = 'Error al enviar';
      message.textContent = error instanceof Error ? error.message : 'No se pudo enviar el mensaje.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = submitLabel;
      dialog.showModal();
    }
  });
});
