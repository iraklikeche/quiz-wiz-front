<template>
  <Header />
  <div
    v-if="quiz"
    class="flex flex-col sm:grid grid-cols-[65fr_35fr] gap-10 sm:gap-4 justify-between sm:px-20"
  >
    <div>
      <div class="flex gap-10 sm:gap-4 sm:mt-10 justify-between">
        <div class="mt-4 sm:mt-0 px-4 sm:px-0 flex flex-col gap-4 sm:gap-8 max-w-[28rem]">
          <div class="flex flex-col gap-4">
            <div class="flex gap-6 sm:hidden flex-wrap">
              <p
                class="text-custom-blue text-sm font-semibold relative"
                v-for="(category, index) in quiz.categories"
                :key="category.id"
                :class="{
                  'before:absolute before:w-1 before:h-1 before:rounded-full  before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-2.5 before:bg-[#d0d5dd]':
                    index !== quiz.categories.length - 1
                }"
              >
                {{ category.name }}
              </p>
            </div>
            <h1 class="text-4xl font-bold font-raleway">{{ quiz.title }}</h1>
            <div class="sm:flex gap-6 hidden flex-wrap">
              <p
                class="text-custom-blue text-sm font-semibold relative"
                v-for="(category, index) in quiz.categories"
                :key="category.id"
                :class="{
                  'before:absolute before:w-1 before:h-1 before:rounded-full  before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-2.5 before:bg-[#d0d5dd]':
                    index !== quiz.categories.length - 1
                }"
              >
                {{ category.name }}
              </p>
            </div>
            <p class="text-[#667085] text-sm font-semibold leading-6 sm:w-4/5">
              {{ quiz.entryQuestion }}
            </p>
          </div>
          <div class="sm:hidden">
            <img :src="quiz.image" class="rounded-xl" />
          </div>
          <ul class="flex flex-col sm:flex-row gap-4">
            <QuizInfoList
              :text="`${quiz.numberOfQuestions} Questions`"
              class="border-r border-gray-400 pr-2"
            >
              <Question />
            </QuizInfoList>

            <QuizInfoList
              :text="`${quiz.totalPoints} Points`"
              class="border-r border-gray-400 pr-2"
            >
              <Points />
            </QuizInfoList>

            <QuizInfoList
              :text="`${quiz.totalAttempts} plays`"
              class="border-r border-gray-400 pr-2"
            >
              <Plays />
            </QuizInfoList>

            <QuizInfoList :text="`${quiz.totalTime}m`">
              <Time />
            </QuizInfoList>
          </ul>
          <RouterLink
            v-if="!quiz.hasUserCompletedQuiz"
            :to="{ name: 'test', params: { id: quiz.id } }"
            class="bg-[#4B69FD] py-4 rounded-xl text-white font-semibold w-full sm:w-4/5 mt-auto flex justify-center"
          >
            Start quizz
          </RouterLink>
          <p class="text-red-500 font-semibold" v-else>You have already done this quiz.</p>
        </div>
        <div class="hidden sm:block max-w-80 min-w-80">
          <img :src="quiz.image" class="rounded-xl" />
        </div>
      </div>
      <div class="border-t mt-10 hidden sm:block">
        <p class="font-bold text-lg my-4">Instruction</p>
        <p>
          {{ quiz.instruction }}
        </p>
      </div>
    </div>

    <div class="px-4 mt-16 sm:mt-10">
      <p class="text-custom-light-gray font-semibold mb-4 sm:hidden">Similar quizzes</p>
      <div class="grid grid-cols-1 gap-8">
        <RouterLink
          :to="{ name: 'quiz', params: { id: similar.id } }"
          v-for="similar in similarQuiz"
          :key="similar.id"
        >
          <Card class="bg-[#D0D5DD] bg-opacity-20" :quiz="similar" />
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Question from '@/components/icons/quiz/Question.vue'
import Points from '@/components/icons/quiz/Points.vue'
import Plays from '@/components/icons/quiz/Plays.vue'
import Time from '@/components/icons/quiz/Time.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'
import QuizInfoList from '@/components/QuizInfoList.vue'
import { getSingleQuiz, getSimilarQuizzes } from '@/services/quizService.js'

export default {
  components: {
    Header,
    Question,
    Points,
    Plays,
    Time,
    Card,
    Footer,
    QuizInfoList
  },
  data() {
    return {
      quiz: null,
      similarQuiz: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async getQuizData() {
      try {
        const res = await getSingleQuiz(this.$route.params.id)
        this.quiz = res.data.data
        if (this.quiz && this.quiz.categories) {
          const categoryIds = this.quiz.categories.map((category) => category.id)
          await this.getSimilarQuiz(categoryIds, this.quiz.id)
        }
      } catch (err) {
        console.log(err)
      }
    },

    async getSimilarQuiz(categoryIds, excludeQuizId) {
      try {
        const res = await getSimilarQuizzes(categoryIds, excludeQuizId)
        this.similarQuiz = res.data.data
      } catch (err) {
        console.log(err)
      }
    },

    async fetchData() {
      await this.getQuizData()
    }
  },
  watch: {
    '$route.params.id'() {
      this.fetchData()
    }
  }
}
</script>
