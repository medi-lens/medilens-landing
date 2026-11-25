const jsonResponse = (message, status = 200) => Response.json(
  { message },
  {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  },
);

const isValidEmail = (email) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse('Método no permitido.', 405);
  }

  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse('Solicitud no válida.', 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 8192) {
    return jsonResponse('Solicitud demasiado grande.', 413);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse('Formulario no válido.', 400);
  }

  // Silently accept honeypot submissions without contacting Mailjet.
  if (String(form.get('company') || '').trim()) {
    return jsonResponse('Hemos recibido tu solicitud.');
  }

  const email = String(form.get('email') || '').trim().toLowerCase();
  if (!isValidEmail(email)) {
    return jsonResponse('Introduce un correo electrónico válido.', 400);
  }

  const apiKey = process.env.MAILJET_API_KEY_PUBLIC;
  const apiSecret = process.env.MAILJET_API_KEY_SECRET;
  const listId = process.env.MAILJET_NEWSLETTER_LIST_ID;
  if (!apiKey || !apiSecret || !listId || !/^\d+$/.test(listId)) {
    console.error('Newsletter endpoint is missing Mailjet configuration.');
    return jsonResponse('El formulario no está disponible en este momento.', 503);
  }

  try {
    const mailjetResponse = await fetch(
      `https://api.mailjet.com/v3/REST/contactslist/${listId}/managecontact`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Action: 'addnoforce', Email: email }),
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!mailjetResponse.ok) {
      console.error(`Mailjet newsletter request failed with status ${mailjetResponse.status}.`);
      return jsonResponse('No se pudo completar la suscripción. Inténtalo de nuevo más tarde.', 502);
    }

    return jsonResponse('Hemos recibido tu solicitud de suscripción.');
  } catch (error) {
    console.error('Mailjet newsletter request failed.', error instanceof Error ? error.name : 'unknown error');
    return jsonResponse('No se pudo completar la suscripción. Inténtalo de nuevo más tarde.', 502);
  }
};

export const config = {
  path: '/api/newsletter',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: 'ip',
    windowSize: 60,
    windowLimit: 5,
  },
};
