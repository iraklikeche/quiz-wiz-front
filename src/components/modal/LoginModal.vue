<template>
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      @click.self="close"
    >
      <div @click.stop class="bg-white w-full rounded-t-lg p-4 transition-transform">
        <LoginView />
      </div>
    </div>
  </transition>
</template>

<script>
import LoginView from '@/views/SessionView/LoginView.vue'
import ModalBackdrop from '@/components/modal/ModalBackdrop.vue'
export default {
  components: {
    ModalBackdrop,
    LoginView
  },
  props: {
    show: Boolean
  },
  emits: ['update:show'],
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
import ModalBackdropVue from './ModalBackdrop.vue';
