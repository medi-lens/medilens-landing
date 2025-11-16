export default async (request, context) => {
  try {
    // Read env safely from Edge context
    const env = (context && context.env) || {}
    const DISCORD_WEBHOOK_URL = env.DISCORD_WEBHOOK_URL
    const NETLIFY_SECRET = env.NETLIFY_WEBHOOK_SECRET

    if (!DISCORD_WEBHOOK_URL) {
      console.error('Missing DISCORD_WEBHOOK_URL')
      return new Response('Missing DISCORD_WEBHOOK_URL', { status: 500 })
    }

    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error('Invalid JSON body', e)
      return new Response('Invalid JSON body', { status: 400 })
    }

    // If Netlify signed the payload, verify JWS (HS256)
    if (body?.jws) {
      if (!NETLIFY_SECRET) {
        console.error('JWS present but NETLIFY_WEBHOOK_SECRET missing')
        return new Response('NETLIFY_WEBHOOK_SECRET missing', { status: 401 })
      }
      const verification = await verifyJwsHs256(body.jws, NETLIFY_SECRET)
      if (!verification.valid) {
        console.error('Invalid JWS', verification.error)
        return new Response('Invalid JWS', { status: 401 })
      }
      try {
        body = JSON.parse(verification.payloadJson)
      } catch (e) {
        console.error('Failed to parse JWS payload', e)
        return new Response('Invalid JWS payload', { status: 400 })
      }
    }

    const data = (body && body.data && typeof body.data === 'object') ? body.data : {}

    // preferred order for fields
    const preferred = ['nombre', 'email', 'message', 'ip', 'user_agent', 'referrer']
    const fields = []
    for (const k of preferred) {
      if (Object.prototype.hasOwnProperty.call(data, k) && data[k] != null && String(data[k]).trim() !== '') {
        fields.push({ name: k, value: String(data[k]) })
      }
    }
    for (const [k, v] of Object.entries(data)) {
      if (!preferred.includes(k) && v != null && String(v).trim() !== '') {
        fields.push({ name: k, value: String(v) })
      }
    }

    const formName = body.form_name || body.formName || body.form || 'contact'
    const createdAt = body.created_at || new Date().toISOString()
    let siteHost = 'medilens.es'
    try { siteHost = new URL(body.site_url || 'https://medilens.es').hostname } catch (e) {}

    const embed = {
      title: `[WEB FORM] - ${formName}`,
      color: 15882553,
      fields,
      timestamp: createdAt,
      footer: {
        text: 'Enviado',
        icon_url: `https://www.google.com/s2/favicons?domain=${siteHost}&sz=16`
      }
    }

    const discordBody = { embeds: [embed] }

    const r = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordBody)
    })
    if (!r.ok) {
      const t = await r.text().catch(() => '')
      console.error('Discord returned error', r.status, t)
      return new Response('Discord error', { status: 502 })
    }

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('Unhandled error in edge function', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}

/* helpers: verify JWS HS256 and return payload JSON string (no external deps) */
async function verifyJwsHs256(token, secret) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return { valid: false, error: 'Bad JWS format' }

    const signingInput = new TextEncoder().encode(parts[0] + '.' + parts[1])
    const sig = base64UrlToUint8Array(parts[2])

    // import key and verify with Web Crypto
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const valid = await crypto.subtle.verify('HMAC', key, sig, signingInput)

    // decode payload part to string
    const payloadJson = base64UrlToString(parts[1])

    return { valid, payloadJson }
  } catch (error) {
    return { valid: false, error: String(error) }
  }
}

function base64UrlToUint8Array(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = input.length % 4
  if (pad) input += '='.repeat(4 - pad)
  // try atob, otherwise use Buffer
  let binary = ''
  if (typeof atob === 'function') {
    binary = atob(input)
  } else if (typeof Buffer !== 'undefined') {
    binary = Buffer.from(input, 'base64').toString('binary')
  } else {
    throw new Error('No base64 decoder available')
  }
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function base64UrlToString(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = input.length % 4
  if (pad) input += '='.repeat(4 - pad)
  if (typeof atob === 'function') {
    return decodeURIComponent(escape(atob(input)))
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'base64').toString('utf8')
  } else {
    throw new Error('No base64 decoder available')
  }
}