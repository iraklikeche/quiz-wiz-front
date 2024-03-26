<template>
  <ul>
    <li class="flex gap-2 items-center">
      <SortArrowUp />
      <span class="text-custom-gray text-sm font-semibold">A-Z</span>
    </li>
    <li class="flex gap-2 items-center">
      <SortArrowUp class="rotate-180" />
      <span class="text-custom-gray text-sm font-semibold">Z-A</span>
    </li>
    <li class="flex gap-2 items-center">
      <MostPopular />
      <span class="text-custom-gray text-sm font-semibold">Most popular</span>
    </li>
    <li class="flex gap-2 items-center">
      <Newest />
      <span class="text-custom-gray text-sm font-semibold">Newest</span>
    </li>
    <li class="flex gap-2 items-center">
      <Oldest />
      <span class="text-custom-gray text-sm font-semibold">Oldest</span>
    </li>
  </ul>
</template>

<script>
import SortArrowUp from '../icons/SortArrowUp.vue'
import MostPopular from '../icons/MostPopular.vue'
import Newest from '../icons/Newest.vue'
import Oldest from '../icons/Oldest.vue'

export default {
  components: {
    SortArrowUp,
    Oldest,
    Newest,
    MostPopular
  }
}
</script>
