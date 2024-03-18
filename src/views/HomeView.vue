<script>
import QuizNumbers from '@/components/QuizNumbers.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import quizImage from '@/assets/imgs/quiz-wiz.png'
import hero from '@/assets/imgs/hero-bg.png'

export default {
  components: {
    QuizNumbers,
    Header,
    Footer
  },
  data() {
    return {
      quizImage,
      hero
    }
  }
}
</script>

<template>
  <Header />
  <section class="pt-6 overflow-hidden">
    <main>
      <div class="relative pl-24">
        <img :src="quizImage" class="max-w-2xl 2xl:w-1/2" />
        <img :src="hero" class="absolute top-0 right-0 translate-y-20" />
      </div>
      <div>
        <QuizNumbers
          numberOfGames="200+"
          gameType="Quiz games"
          :customClass="'mt-32 bg-[#ff5613] py-20 '"
        />
        <QuizNumbers
          numberOfGames="25+"
          gameType="different genre"
          :customClass="'bg-custom-blue pb-20 pt-10'"
        />
      </div>
    </main>
  </section>
  <Footer />
</template>
