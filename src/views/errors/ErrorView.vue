<template>
  <Header />
  <div class="flex flex-col gap-8 items-center justify-center pt-12">
    <div class="flex flex-col items-center">
      <h1 class="font-black text-6xl mb-4">Oops!</h1>
      <p class="text-lg font-bold">Error {{ errorType }}</p>
    </div>
    <img :src="errorImage" class="w-3/4 sm:w-auto" />
    <RouterLink :to="{ name: 'home' }" class="flex gap-4 items-center mt-4">
      <span>
        <GoBackHome />
      </span>
      <span class="text-lg text-[#4B69FD]">Go Home</span>
    </RouterLink>
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GoBackHome from '@/components/icons/GoBackHome.vue'

export default {
  components: {
    Header,
    Footer,
    GoBackHome
  },
  props: {
    errorType: String,
    errorImage: String
  }
}
</script>
