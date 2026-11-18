const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const versionMenu = document.querySelector('.version-menu');

function positionIconTooltip(wrapper) {
  const trigger = wrapper.querySelector('a, button');
  const label = wrapper.querySelector('.icon-tooltip-label');
  if (!trigger || !label) return;

  wrapper.removeAttribute('data-tooltip-align');
  wrapper.removeAttribute('data-tooltip-placement');

  const triggerRect = trigger.getBoundingClientRect();
  const labelRect = label.getBoundingClientRect();
  const viewportMargin = 8;
  const viewportWidth = root.clientWidth;
  const centeredLeft = triggerRect.left + (triggerRect.width - labelRect.width) / 2;

  if (centeredLeft < viewportMargin) {
    wrapper.dataset.tooltipAlign = 'start';
  } else if (centeredLeft + labelRect.width > viewportWidth - viewportMargin) {
    wrapper.dataset.tooltipAlign = 'end';
  }

  const spaceAbove = triggerRect.top;
  const spaceBelow = window.innerHeight - triggerRect.bottom;
  if (spaceAbove < labelRect.height + viewportMargin && spaceBelow > spaceAbove) {
    wrapper.dataset.tooltipPlacement = 'bottom';
  }
}

document.querySelectorAll('[data-icon-tooltip]').forEach(positionIconTooltip);

document.addEventListener('pointerover', (event) => {
  if (!(event.target instanceof Element)) return;
  const wrapper = event.target.closest('[data-icon-tooltip]');
  const previousTarget = event.relatedTarget;
  if (wrapper && !(previousTarget instanceof Node && wrapper.contains(previousTarget))) {
    positionIconTooltip(wrapper);
  }
});

document.addEventListener('focusin', (event) => {
  if (!(event.target instanceof Element)) return;
  const wrapper = event.target.closest('[data-icon-tooltip]');
  if (wrapper) positionIconTooltip(wrapper);
});

window.addEventListener('resize', () => {
  document.querySelectorAll('[data-icon-tooltip]').forEach(positionIconTooltip);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('[data-icon-tooltip]:is(:hover, :has(:focus-visible))').forEach((tooltip) => {
    tooltip.setAttribute('data-tooltip-dismissed', '');
  });
});

document.addEventListener('pointerout', (event) => {
  if (!(event.target instanceof Element)) return;
  const tooltip = event.target.closest('[data-icon-tooltip]');
  const nextTarget = event.relatedTarget;
  if (!tooltip || (nextTarget instanceof Node && tooltip.contains(nextTarget)) || tooltip.matches(':has(:focus-visible)')) return;
  tooltip.removeAttribute('data-tooltip-dismissed');
});

document.addEventListener('focusout', (event) => {
  if (!(event.target instanceof Element)) return;
  const tooltip = event.target.closest('[data-icon-tooltip]');
  const nextTarget = event.relatedTarget;
  if (tooltip && !tooltip.matches(':hover') && !(nextTarget instanceof Node && tooltip.contains(nextTarget))) {
    tooltip.removeAttribute('data-tooltip-dismissed');
  }
});

document.addEventListener('pointerdown', (event) => {
  if (versionMenu?.open && !versionMenu.contains(event.target)) {
    versionMenu.open = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && versionMenu?.open) {
    versionMenu.open = false;
    versionMenu.querySelector('summary')?.focus();
  }
});

function applyTheme(theme, savePreference = false) {
  root.dataset.theme = theme;
  if (themeButton) {
    const isDark = theme === 'dark';
    const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('aria-pressed', String(isDark));
    const icon = themeButton.querySelector('[data-theme-icon]');
    if (icon) icon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';
    const tooltip = themeButton.closest('[data-icon-tooltip]');
    const tooltipLabel = tooltip?.querySelector('[data-icon-tooltip-label]');
    if (tooltipLabel) tooltipLabel.textContent = label;
    if (tooltip?.matches(':hover, :has(:focus-visible)')) positionIconTooltip(tooltip);
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
  if (!isOpen) {
    navigation?.querySelectorAll('[data-icon-tooltip]').forEach(positionIconTooltip);
  }
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
