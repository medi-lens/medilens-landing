<template>
  <transition name="vp-fade">
    <div
      v-if="show"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="onClose"
    >
      <div class="modal" role="document" tabindex="-1">
        <header>
          <h3>{{ title }}</h3>
        </header>
        <div class="modal-body">
          <p v-html="message"></p>
        </div>
        <footer>
          <button class="custom-button" @click="onClose">Cerrar</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: "" },
  message: { type: String, default: "" },
});

const emit = defineEmits(["update:show", "close"]);

function onClose() {
  emit("update:show", false);
  emit("close");
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
}
.modal {
  background: var(--vp-c-background, #fff);
  padding: 20px;
  border-radius: 12px;
  width: clamp(300px, 90%, 540px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  outline: none;
}
.modal header h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}
.modal-body p {
  margin: 0 0 12px;
  color: var(--vp-c-text-2, #4b5563);
}
.modal footer {
  text-align: right;
}
.vp-fade-enter-active,
.vp-fade-leave-active {
  transition: opacity 0.18s ease;
}
.vp-fade-enter-from,
.vp-fade-leave-to {
  opacity: 0;
}
</style>
