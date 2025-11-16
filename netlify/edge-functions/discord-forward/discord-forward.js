export default async (request, context) => {
  try {
    // read env from Edge context
    const env = (context && context.env) || {}
    console.log('Environment:', Object.keys(env))
    const DISCORD_WEBHOOK_URL = env.DISCORD_WEBHOOK_URL

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