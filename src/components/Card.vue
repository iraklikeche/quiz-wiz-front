<template>
  <div
    class="group flex flex-col shadow-lg p-6 pb-8 border-2 border-black rounded-2xl border-transparent hover:border-black"
  >
    <div class="w-full flex items-center justify-center">
      <img :src="resetImage" class="max-w-60 max-h-60" />
    </div>
    <div class="flex flex-col gap-4 mt-12">
      <p class="text-custom-blue text-sm font-semibold">Genres</p>
      <div class="flex justify-between items-center">
        <h2 class="text-[#101828] font-semibold text-2xl">Heading</h2>
        <span class="opacity-0 group-hover:opacity-100">
          <ArrowTiltedBlack />
        </span>
      </div>

      <div class="flex gap-4">
        <InfoDisplay label="Completed" value="DATE">
          <Complete />
        </InfoDisplay>
        <InfoDisplay label="Total Time" value="10Minute" />
        <InfoDisplay label="Total users" value="10" />
      </div>
      <div class="flex gap-4">
        <InfoDisplay label="Difficulty Level" value="Hard">
          <Complete />
        </InfoDisplay>
        <InfoDisplay label="Points" value="10/10">
          <Complete />
        </InfoDisplay>
      </div>
    </div>
  </div>
</template>

<script>
import InfoDisplay from '@/components/icons/InfoDisplay.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import Complete from '@/components/icons/Complete.vue'
import ArrowTiltedBlack from '@/components/icons/ArrowTiltedBlack.vue'

export default {
  components: {
    InfoDisplay,
    Complete,
    ArrowTiltedBlack
  },
  data() {
    return {
      resetImage
    }
  }
}
</script>
import ArrowTiltedVue from '@/components/icons/ArrowTilted.vue'
