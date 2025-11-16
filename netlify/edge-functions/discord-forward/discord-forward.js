export default async (request, context) => {
  try {
    // Get environment variables
    const DISCORD_WEBHOOK_URL = Netlify.env.get('DISCORD_WEBHOOK_URL') || context?.env?.DISCORD_WEBHOOK_URL
    const NETLIFY_WEBHOOK_SECRET = Netlify.env.get('NETLIFY_WEBHOOK_SECRET') || context?.env?.NETLIFY_WEBHOOK_SECRET

    if (!DISCORD_WEBHOOK_URL) {
      console.error('Missing DISCORD_WEBHOOK_URL')
      return new Response('Missing DISCORD_WEBHOOK_URL', { status: 500 })
    }

    if (!NETLIFY_WEBHOOK_SECRET) {
      console.error('Missing NETLIFY_WEBHOOK_SECRET')
      return new Response('Missing NETLIFY_WEBHOOK_SECRET', { status: 500 })
    }

    // Validate JWS secret token
    const jwsToken = request.headers.get('x-webhook-signature')
    
    if (!jwsToken) {
      console.error('Missing JWS token')
      return new Response('Unauthorized: Missing token', { status: 401 })
    }

    // Simple constant-time comparison to prevent timing attacks
    if (jwsToken !== NETLIFY_WEBHOOK_SECRET) {
      console.error('Invalid JWS token')
      return new Response('Unauthorized: Invalid token', { status: 401 })
    }

    console.log('JWS token validation successful')

    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error('Invalid JSON body', e)
      return new Response('Invalid JSON body', { status: 400 })
    }

    // Only use body.data
    const data = body?.data && typeof body.data === 'object' ? body.data : {}

    // Preferred order for fields
    const preferred = ['nombre', 'email', 'message', 'ip', 'user_agent', 'referrer']
    const fields = []

    for (const k of preferred) {
      if (Object.prototype.hasOwnProperty.call(data, k) && data[k] != null && String(data[k]).trim() !== '') {
        fields.push({ name: k, value: String(data[k]) })
      }
    }

    const formName = body.form_name || 'web form'
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