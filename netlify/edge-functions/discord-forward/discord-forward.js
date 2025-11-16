export default async (request, context) => {
  // leer env (intenta process.env o Deno.env según el runtime)
  const DISCORD_WEBHOOK_URL = process.env?.DISCORD_WEBHOOK_URL || (typeof Deno !== 'undefined' && Deno.env.get('DISCORD_WEBHOOK_URL'));
  const NETLIFY_SECRET = process.env?.NETLIFY_WEBHOOK_SECRET || (typeof Deno !== 'undefined' && Deno.env.get('NETLIFY_WEBHOOK_SECRET'));

  if (!DISCORD_WEBHOOK_URL) return new Response('Missing DISCORD_WEBHOOK_URL', { status: 500 });

  let body
  try { body = await request.json() } catch (e) { return new Response('Invalid JSON', { status: 400 }) }

  // Si Netlify firma con JWS, verificar HS256
  if (body?.jws) {
    if (!NETLIFY_SECRET) return new Response('Missing NETLIFY_WEBHOOK_SECRET', { status: 401 })
    const ok = await verifyJwsHs256(body.jws, NETLIFY_SECRET)
    if (!ok) return new Response('Invalid JWS', { status: 401 })
    // payload firmado suele estar en la segunda parte (payload) en base64url
    const payloadJson = JSON.parse(base64urlDecode(body.jws.split('.')[1]))
    body = payloadJson
  }

  const data = (body && body.data && typeof body.data === 'object') ? body.data : {}

  // construir campos en el orden deseado
  const preferred = ['nombre', 'email', 'message', 'ip', 'user_agent', 'referrer']
  const fields = []
  for (const k of preferred) if (data[k]) fields.push({ name: k, value: String(data[k]) })

  const embed = {
    title: `[WEB FORM] - ${body.form_name || 'contact'}`,
    color: 15882553,
    fields,
    timestamp: body.created_at || new Date().toISOString(),
    footer: { text: 'Enviado', icon_url: `https://www.google.com/s2/favicons?domain=${(new URL(body.site_url || 'https://medilens.es')).hostname}&sz=16` }
  }

  try {
    const r = await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [embed] }) })
    if (!r.ok) {
      const t = await r.text()
      return new Response('Discord error: ' + t, { status: 502 })
    }
    return new Response('OK', { status: 200 })
  } catch (err) {
    return new Response(String(err), { status: 500 })
  }
}

// helpers
async function verifyJwsHs256(token, secret) {
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const signingInput = new TextEncoder().encode(parts[0] + '.' + parts[1])
  const sig = base64urlToUint8Array(parts[2])
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  return await crypto.subtle.verify('HMAC', key, sig, signingInput)
}
function base64urlToUint8Array(input) {
  const pad = input.length % 4 ? '='.repeat(4 - (input.length % 4)) : ''
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad
  const binary = atob(base64)
  const arr = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i)
  return arr.buffer
}
function base64urlDecode(input) {
  const pad = input.length % 4 ? '='.repeat(4 - (input.length % 4)) : ''
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad
  return decodeURIComponent(escape(atob(base64)))
}