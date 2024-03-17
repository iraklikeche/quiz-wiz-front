<template>
  <Header />
  <div class="flex flex-col gap-8 items-center justify-center pt-12">
    <div class="flex flex-col items-center">
      <h1 class="font-black text-6xl mb-4">Internal server error!</h1>
      <p class="text-lg font-bold">Error 500</p>
    </div>
    <img :src="serverError" />
    <RouterLink :to="{ name: 'home' }" class="flex gap-4 items-center mt-4">
      <span>
        <GoHome />
      </span>
      <span class="text-lg text-[#4B69FD]">Go Home</span>
    </RouterLink>
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import serverError from '@/assets/imgs/errors/serverError.png'
import GoHome from '@/components/icons/GoHome.vue'
export default {
  components: {
    Header,
    Footer,
    GoHome
  },
  data() {
    return {
      serverError
    }
  }
}
</script>
