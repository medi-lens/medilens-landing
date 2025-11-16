---
lastUpdated: false
---

# Soporte

¿Tienes dudas, sugerencias o necesitas ayuda con la app?  
→ Estamos aquí para ayudarte.

Completa el siguiente formulario y te responderemos lo antes posible.  
Tu consulta será gestionada de forma confidencial y personalizada.

### Formulario de soporte

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
    modalMessage.value = 'Tu incidencia ha sido enviada correctamente. Revisaremos y responderemos a tu mensaje lo antes posible.'
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
  name="support"
  method="POST"
  netlify-honeypot="bot-field"
  data-netlify="true"
  @submit.prevent="handleSubmit"
>
  <input type="hidden" name="form-name" value="support" />
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

<!-- Modal -->
<ContactModal
  v-model:show="showModal"
  :title="modalTitle"
  :message="modalMessage"
  @close="closeModal"
/>

<br />

---

Si tienes problemas con el formulario, también puedes escribirnos a [soporte@medilens.es](mailto:soporte@medilens.es).
