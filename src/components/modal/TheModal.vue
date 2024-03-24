<template>
  <transition :name="name">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-scroll"
      @click.self="close"
    >
      <div :class="modalContentClasses" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    customClasses: {
      type: String
    },
    modalContentClasses: String,
    name: String
  },
  emits: ['update:show'],

  methods: {
    close() {
      this.$emit('update:show', false)
    },
    handleClose() {
      this.showModal = false
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
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-enter-to {
  transform: translateY(0);
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: transform 0.3s ease;
}

.fade-in-enter,
.fade-in-leave-to {
  transform: translateX(-100%);
}

.fade-in-enter-from {
  transform: translateX(-100%);
}

.fade-in-enter-to {
  transform: translateX(0);
}
</style>
