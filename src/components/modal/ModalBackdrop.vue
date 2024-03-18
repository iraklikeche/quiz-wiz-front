<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
    @click="close"
  >
    <slot></slot>
  </div>
</template>


<script>
export default {
  props: {
    show: Boolean
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>