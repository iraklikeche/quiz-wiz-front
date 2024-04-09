<!--********************** It is just blueprint ************************** -->
<template>
  <div class="p-6 px-4" v-if="quiz">
    <header class="px-16 mb-24">
      <h1 class="text-4xl font-bold text-center">{{ quiz.title }}</h1>
      <div class="text-sm text-gray-600 text-center mt-2">
        <ul class="flex flex-wrap gap-4 mt-8">
          <li class="flex items-center gap-2">
            <ThePin />
            <span v-for="category in quiz.categories" :key="category.id" class="flex"
              >{{ category.name }} </span
            >•
          </li>
          <li class="flex items-center gap-2">
            <Question /> {{ quiz.numberOfQuestions }} Questions
          </li>

          <li class="flex items-center gap-2"><Points /> {{ quiz.totalPoints }} Points</li>
          <li class="flex items-center gap-2"><Time /> {{ quiz.totalTime }}m</li>
          <li class="flex items-center gap-2"><Plays /> 169 plays</li>
        </ul>
      </div>
    </header>
    <div class="sm:grid grid-cols-[70fr_30fr] gap-8">
      <div class="mt-6" v-if="quiz.questions">
        <div class="flex justify-between items-center mb-8">
          <div class="text-sm font-bold">
            <span class="text-custom-blue">Question - 1</span> |
            <span class="text-[#E72A8B]">Points - 2</span>
          </div>
        </div>
        <div v-for="question in quiz.questions" :key="question.id" class="mb-4">
          <div class="text-lg font-medium mb-2">
            {{ question.text }}
          </div>
          <div class="flex flex-col">
            <div
              v-for="answer in question.answers"
              :key="answer.id"
              class="block mb-2 px-4 py-4 rounded-xl border border-custom-gray border-opacity-20"
              :class="{
                'border-custom-blue bg-blue-100 border-opacity-50 text-custom-blue text-opacity-80':
                  question.selectedAnswerId === answer.id
              }"
            >
              <label class="flex justify-between">
                <span>
                  {{ answer.text }}
                </span>
                <input
                  type="checkbox"
                  :value="answer.id"
                  :checked="question.selectedAnswerId === answer.id"
                  @change="updateSelection(question, answer.id)"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <div class="flex flex-col items-center">
          <div class="bg-white px-8 py-4 rounded-lg shadow flex items-center flex-col">
            <span class="text-sm font-semibold text-gray-500 mb-1">Timer</span>
            <span class="text-5xl font-semibold text-gray-800">{{ formattedTime }}</span>
          </div>

          <div class="border-t my-4 w-full border-gray-200"></div>

          <button
            @click="submitAnswers"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { getSingleQuiz } from '@/services/quizService.js'
import ThePin from '@/components/icons/quiz/ThePin.vue'
import Question from '@/components/icons/quiz/Question.vue'
import Points from '@/components/icons/quiz/Points.vue'
import Plays from '@/components/icons/quiz/Plays.vue'
import Time from '@/components/icons/quiz/Time.vue'

export default {
  components: {
    ThePin,
    Question,
    Points,
    Plays,
    Time
  },
  data() {
    return {
      totalTime: 300,
      timer: null,
      startTime: 300,
      quiz: null
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.totalTime / 60)
      const seconds = this.totalTime % 60
      return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    }
  },
  mounted() {
    this.startTimer()
    this.getQuizData()
  },
  beforeUnmount() {
    this.clearTimer()
  },
  methods: {
    updateSelection(question, selectedId) {
      if (question.selectedAnswerId === selectedId) {
        question.selectedAnswerId = null
      } else {
        question.selectedAnswerId = selectedId
      }
    },

    startTimer() {
      this.timer = setInterval(() => {
        if (this.totalTime > 0) {
          this.totalTime -= 1
        } else {
          this.clearTimer()
          console.log('finish')
        }
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    submitAnswers() {
      this.clearTimer()

      const timePassed = this.startTime - this.totalTime

      console.log(`Time passed: ${timePassed} seconds`)

      console.log(this.questions)
    },
    async getQuizData() {
      try {
        const res = await getSingleQuiz(this.$route.params.id)
        this.quiz = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
