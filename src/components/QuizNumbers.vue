<template>
  <div :class="['flex flex-col gap-4 font-raleway px-10 sm:pl-20', customClass]">
    <p class="text-white text-7xl font-black">{{ numberOfGames }}</p>
    <div class="group text-white text-5xl font-black flex items-center gap-4">
      <span
        class="border-b-2 border-transparent group-hover:border-white transition-border duration-700"
      >
        {{ gameType }}
      </span>
      <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <ArrowTilted class="w-7 stroke-white" />
      </span>
    </div>
  </div>
</template>
<script>
import ArrowTilted from '@/components/icons/ArrowTilted.vue'

export default {
  components: {
    ArrowTilted
  },
  props: {
    numberOfGames: String,
    gameType: String,
    customClass: String,
    heightForMobile: String
  }
}
</script>
