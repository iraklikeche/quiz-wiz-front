<template>
  <div class="flex items-center justify-center mt-12 mb-24">
    <button
      v-if="pagination.currentPage < pagination.lastPage"
      @click="loadMore"
      class="bg-[#4B69FD] bg-opacity-10 py-3 px-5 rounded-lg text-custom-blue font-semibold flex gap-2 items-center"
    >
      <ArrowDown />
      <span>Load more</span>
    </button>
  </div>
</template>

<script>
import ArrowDown from '@/components/icons/ArrowDown.vue'

export default {
  components: {
    ArrowDown
  },
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  methods: {
    loadMore() {
      this.$emit('load-more')
    }
  }
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>
