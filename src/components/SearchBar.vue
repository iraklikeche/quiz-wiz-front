<template>
  <div class="relative bg-[#f9fafb] rounded-xl">
    <div class="absolute left-2 top-1/2 transform -translate-y-1/2">
      <Search />
    </div>
    <div class="flex items-center border rounded-xl">
      <input
        v-model="localSearchQuery"
        type="text"
        placeholder="Search"
        @focus="handleFocus"
        @blur="handleBlur"
        class="outline-none pl-8 py-2 rounded-xl bg-transparent w-32 transition-all duration-300 focus:w-[21rem] sm:focus:w-[21.5rem]"
      />
      <button
        class="bg-white py-[0.9rem] px-4 rounded-r-xl border-l"
        @mousedown="clearSearch"
        v-show="isFocused"
      >
        <Close />
      </button>
    </div>
  </div>
</template>

<script>
import Search from '@/components/icons/Search.vue'
import Close from '@/components/icons/Close.vue'

export default {
  components: {
    Search,
    Close
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localSearchQuery: this.searchQuery,
      isFocused: false
    }
  },
  methods: {
    handleFocus() {
      this.isFocused = true
      this.$emit('focus')
    },
    handleBlur() {
      this.isFocused = false
      this.$emit('blur')
    },
    clearSearch() {
      this.localSearchQuery = ''
      this.$emit('update:searchQuery', this.localSearchQuery)
    }
  },
  watch: {
    searchQuery(newValue) {
      this.localSearchQuery = newValue
    },
    localSearchQuery(newValue) {
      this.$emit('update:searchQuery', newValue)
    }
  }
}
</script>
