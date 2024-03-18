<template>
  <transition :name="name">
    <div
      v-if="show"
      :class="['fixed inset-0 bg-black bg-opacity-50 z-50', customClasses]"
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
    transitionName: {
      type: String,
      default: ''
    },
    backdropBlur: {
      type: Boolean,
      default: false
    },
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
    }
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter, .slide-up-leave-to /* or .fade-enter, .fade-leave-to */ {
  transform: translateY(100%);
}
</style>
