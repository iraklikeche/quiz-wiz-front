<template>
  <ul>
    <li
      v-for="sortOption in sortOptions"
      :key="sortOption.key"
      class="flex gap-2 items-center cursor-pointer"
      :class="{
        'border-transparent': !isSelectedSort(sortOption.key),
        'px-4 py-2 bg-black text-white rounded-full': isSelectedSort(sortOption.key)
      }"
      @click="toggleSort(sortOption.key)"
    >
      <component :is="sortOption.icon" :class="sortOption.rotationClass" />
      <span class="text-custom-gray text-sm font-semibold">
        {{ sortOption.label }}
      </span>
    </li>
  </ul>
</template>

<script>
import SortArrowUp from '../icons/SortArrowUp.vue'
import MostPopular from '../icons/MostPopular.vue'
import Newest from '../icons/Newest.vue'
import Oldest from '../icons/Oldest.vue'
import { markRaw } from 'vue'

export default {
  components: {
    SortArrowUp,
    Oldest,
    Newest,
    MostPopular
  },
  data() {
    return {
      sort: '',
      sortOptions: [
        { key: 'A-Z', label: 'A-Z', icon: markRaw(SortArrowUp) },
        { key: 'Z-A', label: 'Z-A', icon: markRaw(SortArrowUp), rotationClass: 'rotate-180' },
        { key: 'Most popular', label: 'Most popular', icon: markRaw(MostPopular) },
        { key: 'Newest', label: 'Newest', icon: markRaw(Newest) },
        { key: 'Oldest', label: 'Oldest', icon: markRaw(Oldest) }
      ]
    }
  },
  methods: {
    toggleSort(sort) {
      this.sort = this.sort === sort ? '' : sort
      this.$emit('update:sort', this.sort)
    },
    resetSort() {
      this.sort = ''
    },

    isSelectedSort(sort) {
      return this.sort === sort
    }
  }
}
</script>
