import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals'

function sendToUmami(metric) {
  if (typeof window === 'undefined' || !window.umami) return

  window.umami.track('core_web_vitals', {
    metric: metric.name,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    rating: metric.rating,
    id: metric.id
  })
}

export function initWebVitals() {
  onLCP(sendToUmami)
  onCLS(sendToUmami)
  onINP(sendToUmami)
  onTTFB(sendToUmami)
}