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

  // ONLY use payload.data (ignore ordered_human_fields)
  const data = payload?.data && typeof payload.data === 'object' ? payload.data : {}

  // Preferred order for Discord fields
  const preferred = ['nombre', 'email', 'message', 'ip', 'user_agent', 'referrer']
  const fields = []

  for (const key of preferred) {
    if (Object.prototype.hasOwnProperty.call(data, key) && data[key] != null && String(data[key]).trim() !== '') {
      fields.push({ name: key, value: String(data[key]) })
    }
  }

  // Construir embed según formato requerido
  const formName = payload.form_name || ''
  const createdAt = payload.created_at || new Date().toISOString()
  let siteUrl = payload.site_url || 'https://medilens.es'
  try {
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