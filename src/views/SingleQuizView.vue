<template>
  <Header />
  <div
    v-if="quiz"
    class="flex flex-col sm:grid grid-cols-[65fr_35fr] gap-10 sm:gap-2 justify-between sm:px-20"
  >
    <div>
      <div class="flex gap-10 sm:gap-4 sm:mt-10 justify-between">
        <div class="mt-4 sm:mt-0 px-4 sm:px-0 flex flex-col gap-4 sm:gap-8">
          <div class="flex flex-col gap-4">
            <p class="text-custom-blue text-sm font-semibold sm:hidden">category</p>
            <h1 class="text-4xl font-bold font-raleway">{{ quiz.title }}</h1>
            <div class="flex gap-2">
              <p
                class="text-custom-blue text-sm font-semibold"
                v-for="category in quiz.categories"
                :key="category.id"
              >
                {{ category.name }}
              </p>
            </div>
            <p class="text-[#667085] text-sm font-semibold leading-8">
              Can you put the discoveries in order, from the oldest to <br />
              the newest one? 🧠
            </p>
          </div>
          <div class="sm:hidden">
            <img :src="quiz.image" class="rounded-xl" />
          </div>
          <ul class="flex flex-col sm:flex-row gap-4">
            <QuizInfoList :text="`${quiz.numberOfQuestions} Questions`">
              <Question />
            </QuizInfoList>

            <QuizInfoList :text="`${quiz.totalPoints} Points`">
              <Points />
            </QuizInfoList>

            <QuizInfoList text="169 plays">
              <Plays />
            </QuizInfoList>

            <QuizInfoList :text="`${quiz.totalTime}m`">
              <Time />
            </QuizInfoList>
          </ul>
          <button
            class="bg-[#4B69FD] py-4 rounded-xl text-white font-semibold w-full sm:w-4/5 mt-auto"
          >
            Start quizz
          </button>
        </div>
        <div class="hidden sm:block">
          <img :src="quiz.image" class="rounded-xl" />
        </div>
      </div>
      <div class="border-t mt-10 hidden sm:block">
        <p class="font-bold text-lg my-4">Instruction</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate tempore ab!
          Blanditiis error ipsum ratione, vitae repellendus reiciendis, dolore maxime libero in,
          quibusdam voluptate commodi. Natus nam beatae deserunt ea.
        </p>
      </div>
    </div>

    <div class="px-4 mt-16 sm:mt-10">
      <p class="text-custom-light-gray font-semibold mb-4 sm:hidden">Similar quizzes</p>
      <div class="grid grid-cols-1 gap-8">
        <Card class="bg-[#D0D5DD] bg-opacity-20" />
        <Card class="bg-[#D0D5DD] bg-opacity-20" />
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
import { getSingleQuiz } from '@/services/quizService.js'

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
      quiz: null
    }
  },
  mounted() {
    this.getQuizData()
  },
  methods: {
    async getQuizData() {
      try {
        const res = await getSingleQuiz(this.$route.params.id)
        this.quiz = res.data
        console.log(this.quiz)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
