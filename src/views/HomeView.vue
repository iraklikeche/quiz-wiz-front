<script>
import QuizNumbers from '@/components/QuizNumbers.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import quizImage from '@/assets/imgs/quiz-wiz.png'
import hero from '@/assets/imgs/hero-bg.png'
import MobileMenu from '@/components/icons/MobileMenu.vue'
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'
import Logo from '@/components/icons/Logo.vue'
import ModalBackdrop from '@/components/modal/ModalBackdrop.vue'
import HeaderModal from '@/components/modal/HeaderModal.vue'

export default {
  components: {
    ModalBackdrop,
    HeaderModal,
    QuizNumbers,
    Header,
    Footer,
    MobileMenu,
    CloseModalBtn,
    Logo
  },
  data() {
    return {
      quizImage,
      hero,
      showModal: false
    }
  }
}
</script>

<template>
  <ModalBackdrop :show="showModal" @close="showModal = false">
    <HeaderModal @close="showModal = false" />
  </ModalBackdrop>
  <Header>
    <div class="sm:hidden">
      <MobileMenu @click="showModal = true" /></div
  ></Header>
  <section class="pt-6 overflow-hidden">
    <main class="flex flex-col">
      <div class="relative px-10 pr-16 sm:pl-24">
        <img :src="quizImage" class="sm:max-w-2xl" />
        <img
          :src="hero"
          class="absolute top-1/2 translate-y-[15%] sm:top-0 right-0 sm:translate-y-20 min-w-[30rem] -z-10 sm:z-0"
        />
      </div>
      <div>
        <QuizNumbers
          numberOfGames="200+"
          gameType="Quiz games"
          :customClass="'mt-[28rem] sm:mt-32 bg-[#ff5613] py-20 '"
        />
        <QuizNumbers
          numberOfGames="25+"
          gameType="different genre"
          :customClass="'bg-custom-blue py-20 sm:pb-20 sm:pt-10'"
        />
      </div>
    </main>
  </section>
  <Footer :logoBorderMobile="'border-b border-border-gray pb-6 sm:border-none sm:pb-0'" />
</template>
