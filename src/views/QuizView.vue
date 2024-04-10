<template>
  <div class="p-6 px-4 sm:px-20" v-if="quiz">
    <header class="px-16 mb-24">
      <h1 class="text-4xl font-bold text-center">{{ quiz.title }}</h1>
      <div class="text-sm text-gray-600 text-center mt-2">
        <ul class="flex sm:justify-center flex-wrap gap-4 mt-8">
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
        <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-4">
          <div class="flex justify-between items-center mb-8">
            <div class="text-sm font-bold">
              <span class="text-custom-blue">Question - {{ index + 1 }}</span> |
              <span class="text-[#E72A8B]"
                >Points -
                {{ question.answers.filter((answer) => answer.isCorrect === 1).length }}</span
              >
            </div>
          </div>
          <div class="text-lg font-medium mb-2">
            {{ question.text }}
          </div>
          <form ref="quizForm" class="flex flex-col">
            <div
              v-if="questionHasTwoCorrectAnswers(question)"
              class="flex items-center gap-2 border rounded-lg border-[#027A48] py-3 px-4 my-6 bg-blue-100"
            >
              <Info />
              <span class="text-[#027A48] font-medium"
                >You can select 2 options from questions.</span
              >
            </div>
            <label
              v-for="answer in question.answers"
              :key="answer.id"
              class="relative flex justify-between items-center mb-2 px-4 py-4 rounded-xl border border-custom-gray border-opacity-20 cursor-pointer"
              :class="{
                'border-custom-blue bg-blue-100 border-opacity-50 text-custom-blue text-opacity-80':
                  question.selectedAnswerId === answer.id
              }"
              :for="'customStyle-' + answer.id"
            >
              <span>
                {{ answer.text }}
              </span>
              <input
                type="checkbox"
                :value="answer.id"
                :checked="question.selectedAnswerIds.includes(answer.id)"
                @change="() => updateSelection(question, answer.id)"
                class="peer relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all checked:border-custom-blue checked:bg-custom-blue checked:before:bg-custom-blue hover:scale-105"
                :id="'customStyle-' + answer.id"
              />

              <span
                v-if="question.selectedAnswerIds.includes(answer.id)"
                class="absolute text-white transition-opacity pointer-events-none top-1/2 left-[93%] sm:left-[97%] -translate-y-2/4 -translate-x-[20%] sm:-translate-x-[35%] opacity-100"
              >
                <Checkbox />
              </span>
            </label>
          </form>
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
import Checkbox from '@/components/icons/Checkbox.vue'
import Info from '@/components/icons/Info.vue'

export default {
  components: {
    ThePin,
    Question,
    Points,
    Plays,
    Time,
    Checkbox,
    Info
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
    },
    hasTwoCorrectAnswers() {
      return this.quiz.question.answers.filter((answer) => answer.isCorrect === 1).length === 2
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
    questionHasTwoCorrectAnswers(question) {
      return question.answers.filter((answer) => answer.isCorrect === 1).length === 2
    },
    getMaxSelections(question) {
      return question.answers.filter((answer) => answer.isCorrect === 1).length
    },
    updateSelection(question, answerId) {
      const index = question.selectedAnswerIds.indexOf(answerId)
      const maxSelections = this.getMaxSelections(question)

      if (index === -1) {
        // If attempting to select a new answer and selections are at the max, remove the last selection
        if (question.selectedAnswerIds.length >= maxSelections) {
          question.selectedAnswerIds.pop() // Adjust based on your requirements: pop() for last, shift() for first
        }
        // Add the new selection
        question.selectedAnswerIds.push(answerId)
      } else {
        // If the answer is already selected, remove it
        question.selectedAnswerIds.splice(index, 1)
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

      const userResponses = this.quiz.questions.map((question) => ({
        questionId: question.id,
        selectedAnswers: question.selectedAnswerIds.map((answerId) => {
          const answer = question.answers.find((a) => a.id === answerId)
          return {
            answerId: answer.id,
            isCorrect: answer.isCorrect === 1
          }
        })
      }))

      console.log(userResponses)
    },
    async getQuizData() {
      try {
        const res = await getSingleQuiz(this.$route.params.id)
        this.quiz = res.data.data
        const quizData = res.data.data
        quizData.questions.forEach((question) => {
          question.selectedAnswerIds = []
        })
        this.quiz = quizData
        console.log(this.quiz)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
