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

<script setup>
import { ref } from 'vue'
import ContactModal from '/.vitepress/components/ContactModal.vue' // <-- añadir

const sending = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const handleSubmit = async (event) => {
  event.preventDefault()
  sending.value = true
  const form = event.target
  const formData = new FormData(form)
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    modalTitle.value = '¡Gracias por tu mensaje!'
    modalMessage.value = 'Tu consulta ha sido enviada correctamente. Revisaremos y responderemos a tu mensaje lo antes posible.'
    showModal.value = true
    form.reset()
  } catch (error) {
    modalTitle.value = 'Error al enviar'
    modalMessage.value = 'No se pudo enviar el mensaje: ' + (error?.message || error)
    showModal.value = true
  } finally {
    sending.value = false
  }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<form
  name="contact"
  method="POST"
  netlify-honeypot="bot-field"
  data-netlify="true"
  @submit.prevent="handleSubmit"
>
  <input type="hidden" name="form-name" value="contact" />
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
  <button class="custom-button" type="submit" :disabled="sending">{{ sending ? 'Enviando...' : 'Enviar' }}</button>
</form>

<!-- Modal -->
<ContactModal
  v-model:show="showModal"
  :title="modalTitle"
  :message="modalMessage"
  @close="closeModal"
/>

<br />

---

Si tienes problemas con el formulario, también puedes escribirnos a [contacto@medilens.es](mailto:contacto@medilens.es).
