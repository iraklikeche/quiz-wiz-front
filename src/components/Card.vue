<template>
  <RouterLink
    :to="{ name: 'quiz', params: { id: quiz.id } }"
    class="group flex flex-col shadow-lg p-6 pb-8 border-2 border-black rounded-2xl border-transparent hover:border-black"
  >
    <div class="w-full flex items-center justify-center">
      <img :src="quiz.image" class="max-w-60 max-h-60" />
    </div>
    <div class="flex flex-col gap-4 mt-12">
      <div class="flex gap-2">
        <p
          class="text-custom-blue text-sm font-semibold"
          v-for="category in quiz.categories"
          :key="category.id"
        >
          {{ category.name }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="text-[#101828] font-semibold text-2xl">{{ quiz.title }}</h2>
        <span class="opacity-0 group-hover:opacity-100">
          <ArrowTilted class="w-4 stroke-black" />
        </span>
      </div>

      <div class="flex gap-4">
        <InfoDisplay label="Completed" value="DATE">
          <Complete />
        </InfoDisplay>
        <InfoDisplay label="Total Minutes" :value="`${quiz.totalTime}Minutes`" />
        <InfoDisplay label="Total Users" value="8" />
      </div>
      <div class="flex gap-4">
        <InfoDisplay label="Difficulty Level" :value="quiz.difficultyLevel.name">
          <Complete />
        </InfoDisplay>
        <InfoDisplay label="Points" value="10/10">
          <Complete />
        </InfoDisplay>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import InfoDisplay from '@/components/icons/InfoDisplay.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import Complete from '@/components/icons/Complete.vue'
import ArrowTilted from '@/components/icons/ArrowTilted.vue'

export default {
  components: {
    InfoDisplay,
    Complete,
    ArrowTilted
  },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resetImage
    }
  }
}
</script>
