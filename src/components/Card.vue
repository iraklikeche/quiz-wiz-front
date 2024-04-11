<template>
  <div
    class="group flex flex-col shadow-lg p-6 pb-8 border-2 border-black rounded-2xl border-transparent hover:border-black h-full"
  >
    <div class="w-full flex items-center justify-center">
      <img :src="quiz.image" class="max-w-60 max-h-60 min-h-60" />
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
        <h2 class="text-[#101828] font-bold text-2xl">
          {{ quiz.title }}
        </h2>
        <span class="opacity-0 group-hover:opacity-100">
          <ArrowTilted class="w-4 stroke-black" />
        </span>
      </div>

      <div class="flex gap-4">
        <InfoDisplay
          label="Completed"
          :value="quiz.hasUserCompletedQuiz ? `${formattedCompletionDate}` : 'Date,Time'"
        >
          <Completed v-if="quiz.hasUserCompletedQuiz" />
          <NotCompleted v-else />
        </InfoDisplay>
        <InfoDisplay label="Total Minutes" :value="`${quiz.totalTime}Minutes`" />
        <InfoDisplay label="Total Users" :value="`${quiz.totalAttempts}`" />
      </div>
      <div class="flex gap-4">
        <InfoDisplay label="Difficulty Level" :value="quiz.difficultyLevel.name">
          <DifficultyLevel />
        </InfoDisplay>
        <InfoDisplay
          label="Points"
          :value="quiz.hasUserCompletedQuiz ? `${quiz.userScore}/${quiz.totalPoints}` : 'N/A'"
        >
          <PointsMainCard />
        </InfoDisplay>
      </div>
    </div>
  </div>
</template>

<script>
import InfoDisplay from '@/components/icons/InfoDisplay.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import Completed from '@/components/icons/quiz/Completed.vue'
import ArrowTilted from '@/components/icons/ArrowTilted.vue'
import DifficultyLevel from '@/components/icons/quiz/DifficultyLevel.vue'
import Points from './icons/quiz/Points.vue'
import PointsMainCard from '@/components/icons/quiz/PointsMainCard.vue'
import NotCompleted from './icons/quiz/NotCompleted.vue'

export default {
  components: {
    InfoDisplay,
    Completed,
    ArrowTilted,
    DifficultyLevel,
    Points,
    PointsMainCard,
    NotCompleted
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
  },
  computed: {
    formattedCompletionDate() {
      if (!this.quiz.hasUserCompletedQuiz) return 'Date, Time'

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      const date = new Date(this.quiz.completedAt)
      const day = date.getDate()
      const monthIndex = date.getMonth()
      const year = date.getFullYear()

      return `${day} ${months[monthIndex]}, ${year}`
    }
  }
}
</script>
