<template>
  <ul>
    <li
      v-for="sortOption in sortOptions"
      :key="sortOption.key"
      class="flex gap-2 py-2 px-2 items-center cursor-pointer"
      :class="{
        'bg-transparent': !isSelectedSort(sortOption.key),
        ' bg-[#D9D9D9]  text-white rounded-md bg-opacity-20': isSelectedSort(sortOption.key)
      }"
      @click="toggleSort(sortOption.key)"
    >
      <component :is="sortOption.icon" :class="sortOption.rotationClass" />
      <span class="text-custom-gray text-sm font-semibold">
        {{ sortOption.label }}
      </span>
      <div class="text-[#12B76A]">
        <SortSelected v-if="isSelectedSort(sortOption.key)" class="ml-auto" />
      </div>
    </li>
  </ul>
</template>

<script>
import SortArrowUp from '../icons/SortArrowUp.vue'
import MostPopular from '../icons/MostPopular.vue'
import Newest from '../icons/Newest.vue'
import Oldest from '../icons/Oldest.vue'
import { markRaw } from 'vue'
import SortSelected from '../icons/quiz/SortSelected.vue'

export default {
  components: {
    SortArrowUp,
    Oldest,
    Newest,
    MostPopular,
    SortSelected
  },
  props: {
    currentSort: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sort: '',
      sortOptions: [
        { key: 'alphabet', label: 'A-Z', icon: markRaw(SortArrowUp) },
        {
          key: 'reverse-alphabet',
          label: 'Z-A',
          icon: markRaw(SortArrowUp),
          rotationClass: 'rotate-180'
        },
        { key: 'popular', label: 'Most popular', icon: markRaw(MostPopular) },
        { key: 'Newest', label: 'Newest', icon: markRaw(Newest) },
        { key: 'Oldest', label: 'Oldest', icon: markRaw(Oldest) }
      ]
    }
  },
  watch: {
    currentSort(newValue) {
      this.sort = newValue
    }
  },
  mounted() {
    this.sort = this.currentSort
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
