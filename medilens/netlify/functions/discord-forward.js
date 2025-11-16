import { jwtVerify } from 'jose'

export async function handler(event, context) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
  const NETLIFY_SECRET = process.env.NETLIFY_WEBHOOK_SECRET

  if (!DISCORD_WEBHOOK_URL) {
    return { statusCode: 500, body: 'Missing DISCORD_WEBHOOK_URL env var' }
  }

  let parsed
  try {
    parsed = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  // If Netlify signed the payload, verify JWS (if provided)
  let payload = parsed
  if (parsed?.jws) {
    if (!NETLIFY_SECRET) {
      return { statusCode: 401, body: 'JWS present but no NETLIFY_WEBHOOK_SECRET configured' }
    }
    try {
      const secretKey = new TextEncoder().encode(NETLIFY_SECRET)
      const { payload: verified } = await jwtVerify(parsed.jws, secretKey)
      payload = verified
    } catch (err) {
      return { statusCode: 401, body: 'Invalid JWS: ' + String(err) }
    }
  }

  // Normalizar campos a enviar a Discord
  // Preferimos ordered_human_fields -> data -> human_fields
  let fields = []

  if (Array.isArray(payload?.ordered_human_fields) && payload.ordered_human_fields.length) {
    fields = payload.ordered_human_fields.map(f => ({
      name: f.name ?? (typeof f.title === 'string' ? f.title.toLowerCase() : f.title),
      value: String(f.value ?? '')
    }))
  } else if (payload?.data && typeof payload.data === 'object') {
    // Mantener orden preferente: nombre, email, message
    const preferred = ['nombre', 'email', 'message']
    for (const k of preferred) {
      if (Object.prototype.hasOwnProperty.call(payload.data, k)) {
        fields.push({ name: k, value: String(payload.data[k] ?? '') })
      }
    }
    // Añadir el resto de keys del objeto data
    for (const [k, v] of Object.entries(payload.data)) {
      if (!preferred.includes(k)) fields.push({ name: k, value: String(v ?? '') })
    }
  } else if (payload?.human_fields && typeof payload.human_fields === 'object') {
    // human_fields normalmente es un map de "Nombre": "Valor"
    for (const [title, value] of Object.entries(payload.human_fields)) {
      // intentar obtener un key simple en minúsculas si procede
      const key = title.toLowerCase()
      fields.push({ name: key, value: String(value ?? '') })
    }
  } else {
    // Fallback: mapear atributos top-level conocidos
    const pick = ['title', 'email', 'name', 'first_name', 'last_name', 'company', 'summary', 'body']
    for (const k of pick) {
      if (Object.prototype.hasOwnProperty.call(payload, k) && payload[k] != null) {
        fields.push({ name: k, value: String(payload[k]) })
      }
    }
  }

  // Construir embed según formato requerido
  const formName = payload.form_name || ''
  const createdAt = payload.created_at || new Date().toISOString()
  let siteUrl = payload.site_url || 'https://medilens.es'
  try {
    // normalizar a host
    siteUrl = new URL(siteUrl).hostname
  } catch (e) {
    siteUrl = 'medilens.es'
  }

  const embed = {
    title: `[WEB FORM] - ${formName}`,
    color: 15882553,
    fields: fields,
    timestamp: createdAt,
    footer: {
      text: 'Enviado',
      icon_url: `https://www.google.com/s2/favicons?domain=${siteUrl}&sz=16`
    }
  }

  const discordBody = { embeds: [embed] }

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordBody)
    })
    if (!res.ok) {
      const text = await res.text()
      return { statusCode: 502, body: `Discord webhook error: ${res.status} ${text}` }
    }
    return { statusCode: 200, body: 'Forwarded to Discord' }
  } catch (err) {
    return { statusCode: 500, body: String(err) }
  }
}