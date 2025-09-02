---
lastUpdated: false
---

# Contacto
¿Quieres ponerte en contacto con el equipo de <span class="logo-colored">MEDI lens</span>?  
Estamos aquí para atender tus dudas, sugerencias, propuestas de colaboración o cualquier consulta relacionada con la app.

Completa el siguiente formulario y te responderemos lo antes posible.  
Tu mensaje será gestionado de forma confidencial y personalizada.

> ℹ️ **¿Tienes una duda técnica o problema con la app?**  
> Para consultas técnicas o soporte, por favor utiliza la página de [Soporte](/soporte). 


### Formulario de contacto
<br />
<form
  name="contact"
  method="POST"
  action="/envio"
  netlify-honeypot="bot-field"
  data-netlify="true"
>
  <div>
    <label for="nombre">Nombre</label>
    <input type="text" name="nombre" required>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" name="email" required>
  </div>
  <div>
    <label for="message">Mensaje</label>
    <textarea name="message" rows="4" required></textarea>
  </div>
  <p class="hidden">
    <label>
      Don’t fill this out if you’re human: <input name="bot-field" type="text" />
    </label>
  </p>
  <button class="custom-button" type="submit">Enviar</button>
</form>

---

Si tienes problemas con el formulario, también puedes escribirnos a [contacto@medilens.es](mailto:contacto@medilens.es).
