<template>
  <div :class="['flex flex-col gap-8 font-raleway ', customClass]">
    <p class="text-white text-7xl font-black pl-20">{{ numberOfGames }}</p>
    <div
      class="text-white text-5xl font-black pl-20 flex items-center gap-4 h-4"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <span
        class="transition-border"
        :style="{ borderBottom: hover ? '2px solid white' : '2px solid transparent' }"
      >
        {{ gameType }}
      </span>
      <span :style="{ opacity: hover ? '100' : '0' }" class="duration-700">
        <ArrowTilted />
      </span>
    </div>
  </div>
</template>

<script setup>
import ArrowTilted from '@/components/icons/ArrowTilted.vue'
import { ref } from 'vue'
const props = defineProps({
  numberOfGames: String,
  gameType: String,
  customClass: String
})

const hover = ref(false)
</script>

<style scoped>
.transition-border {
  transition:
    border-bottom-color 700ms,
    border-bottom-width 700ms;
}
</style>
