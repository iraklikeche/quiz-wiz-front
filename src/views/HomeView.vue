<script setup>
import quizImage from '@/assets/imgs/quiz-wiz.png'
import hero from '@/assets/imgs/hero-bg.png'
import QuizNumbers from '@/components/QuizNumbers.vue'
</script>

<template>
  <section class="pt-6 overflow-hidden">
    <main>
      <div class="relative pl-20">
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
          :customClass="'bg-[#4b69fd] pb-20 pt-10'"
        />
      </div>
    </main>
  </section>
</template>
