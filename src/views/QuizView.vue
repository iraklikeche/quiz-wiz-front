<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    @update:show="showModal = $event"
    :modalContentClasses="'bg-white p-4 rounded-lg shadow-lg w-full max-w-xs min-w-96'"
    class="backdrop-blur bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center max-w"
  >
    <div v-if="quiz" class="">
      <div class="flex flex-col items-center">
        <RouterLink :to="{ name: 'home' }" class="px-2 self-end">
          <CloseModalBtn @click="showModal = false" class="cursor-pointer w-3" />
        </RouterLink>
        <div class="flex flex-col items-center gap-2">
          <CompleteModal />
          <h4>Quiz finished</h4>
          <p>Your result</p>
        </div>
      </div>
      <div class="mt-4">
        <div class="border-b mb-2 pb-2">
          <p class="text-modal-gray font-medium text-sm mb-1">Quiz Name</p>
          <p class="font-medium text-sm">{{ quiz.title }}</p>
        </div>
        <div class="border-b mb-2 pb-2">
          <p class="text-modal-gray font-medium text-sm mb-1">Quiz Level</p>
          <p
            class="text-sm font-medium"
            :style="{
              color: quiz.difficultyLevel.textColor
            }"
          >
            {{ quiz.difficultyLevel.name }}
          </p>
        </div>
        <div class="border-b mb-2 pb-2">
          <p class="text-modal-gray font-medium text-sm mb-1">Time</p>
          <p class="font-medium text-sm">{{ formattedTime }}</p>
        </div>
        <div class="border-b mb-2 pb-2">
          <p class="text-modal-gray font-medium text-sm mb-1">Mistakes</p>
          <p class="text-[#E64646] font-medium text-sm">{{ wrong }}</p>
        </div>
        <div class="mb-4 pb-2">
          <p class="text-modal-gray font-medium text-sm mb-1">Right answers</p>
          <p class="font-medium text-sm text-[#12B76A]">{{ right }}</p>
        </div>
      </div>
      <RouterLink
        :to="{ name: 'home' }"
        class="bg-custom-blue w-full py-2 rounded-lg text-white font-semibold flex items-center justify-center"
      >
        Back to home
      </RouterLink>
    </div>
  </TheModal>

  <div class="p-6 px-4 sm:px-20" v-if="quiz">
    <div class="border-b pb-4 sm:hidden">
      <div class="flex gap-4">
        <button
          @click="submitAnswers"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-12 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 w-full"
        >
          Submit
        </button>

        <div class="px-2 pr-12 rounded-lg border py-2 border-border-gray flex flex-col">
          <span class="text-sm font-bold font-raleway">Timer</span>
          <span class="font-semibold text-gray-800 text-sm min-w-[3.2rem]">{{
            formattedTime
          }}</span>
        </div>
        <button class="ml-auto" @click="goBack">
          <CloseModalBtn />
        </button>
      </div>
    </div>
    <header class="px-16 mb-24 mt-8 sm:mt-0">
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
          <li class="flex items-center gap-2"><Plays /> {{ quiz.totalAttempts }} plays</li>
        </ul>
      </div>
    </header>
    <div class="sm:grid grid-cols-[70fr_30fr] gap-8">
      <div class="mt-6" v-if="quiz.questions">
        <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-4">
          <div class="flex justify-between items-center mb-8">
            <div class="text-sm font-bold">
              <span class="text-custom-blue">Question - {{ index + 1 }}</span> |
              <span class="text-[#E72A8B]">Points - {{ question.points }}</span>
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

      <div
        class="bg-white relative p-8 rounded-lg shadow-md w-96 max-h-64 border border-border-gray border-opacity-50 hidden sm:block"
      >
        <div class="absolute -top-3 left-1/2 bg-white -translate-x-1/2 z-20">
          <span
            class="text-sm font-bold text-custom-gray border border-border-gray px-8 py-3 rounded-lg"
            >Timer</span
          >
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-white px-8 py-4 rounded-lg flex items-center flex-col">
            <span class="text-5xl font-semibold text-gray-800">{{ formattedTime }}</span>
          </div>

          <div class="border-t my-4 w-full border-gray-200"></div>

          <button
            @click="submitAnswers"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
          >
            Submit
          </button>
          <RouterLink
            :to="{ name: 'home' }"
            class="bg-white hover:bg-[#181818] hover:text-white text-black font-bold py-3 px-12 rounded flex justify-center focus:outline-none focus:shadow-outline w-full transition duration-300 my-2"
          >
            Back to home
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { getSingleQuiz, submitQuizAnswers } from '@/services/quizService.js'
import ThePin from '@/components/icons/quiz/ThePin.vue'
import Question from '@/components/icons/quiz/Question.vue'
import Points from '@/components/icons/quiz/Points.vue'
import Plays from '@/components/icons/quiz/Plays.vue'
import Time from '@/components/icons/quiz/Time.vue'
import Checkbox from '@/components/icons/Checkbox.vue'
import Info from '@/components/icons/Info.vue'
import TheModal from '@/components/modal/TheModal.vue'
import CompleteModal from '@/components/icons/quiz/CompleteModal.vue'
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'

export default {
  components: {
    ThePin,
    Question,
    Points,
    Plays,
    Time,
    Checkbox,
    Info,
    TheModal,
    CompleteModal,
    CloseModalBtn
  },
  data() {
    return {
      totalTime: null,
      timer: null,
      startTime: null,
      quiz: null,
      showModal: false,
      right: null,
      wrong: null
    }
  },
  computed: {
    formattedTime() {
      if (this.totalTime !== null) {
        const minutes = Math.floor(this.totalTime / 60)
        const seconds = this.totalTime % 60
        return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
      } else {
        return '00:00'
      }
    },

    hasTwoCorrectAnswers() {
      return this.quiz.question.answers.filter((answer) => answer.isCorrect === 1).length === 2
    }
  },
  mounted() {
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
        if (question.selectedAnswerIds.length >= maxSelections) {
          question.selectedAnswerIds.pop()
        }
        question.selectedAnswerIds.push(answerId)
      } else {
        question.selectedAnswerIds.splice(index, 1)
      }
    },

    startTimer() {
      this.timer = setInterval(() => {
        if (this.totalTime > 0) {
          this.totalTime -= 1
        } else {
          this.clearTimer()
          this.submitAnswers()
        }
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },

    async submitAnswers() {
      this.clearTimer()

      const timePassed = this.startTime - this.totalTime
      console.log(`Time passed: ${timePassed} seconds`)
      const payload = {
        timeSpent: timePassed,
        answers: this.quiz.questions.map((question) => ({
          questionId: question.id,
          selectedAnswerIds: question.selectedAnswerIds
        }))
      }

      try {
        console.log(payload)

        const response = await submitQuizAnswers(this.quiz.id, payload)
        console.log('Submission successful:', response.data)
        this.showModal = true
        this.right = response.data.correctQuestionsCount
        this.wrong = this.quiz.numberOfQuestions - this.right
      } catch (error) {
        console.error('Failed to submit quiz answers:', error)
      }
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
        this.totalTime = quizData.totalTime * 60
        this.startTime = quizData.totalTime * 60
        this.startTimer()
        console.log(this.quiz)
      } catch (err) {
        console.log(err)
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
