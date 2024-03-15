<template>
  <nav
    class="flex justify-between items-center border-b-2 border-[#666666] border-opacity-25 px-24 py-4"
  >
    <div class="flex gap-20">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
      <button class="text-sm font-semibold text-custom-gray">Quizzes</button>
    </div>
    <div class="flex gap-6">
      <button
        class="bg-black px-6 py-2 text-white font-bold text-sm rounded hover:bg-white hover:text-black hover:shadow-black hover:shadow-lg hover:scale-105 duration-300 transition-all"
      >
        Sign up
      </button>
      <button
        class="group text-[#4b69fd] font-bold text-sm tracking-wider transition-all flex gap-2 items-center"
      >
        Log in
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <LoginArrow />
        </span>
      </button>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'
import Logo from '@/components/icons/Logo.vue'
import LoginArrow from '@/components/icons/LoginArrow.vue'

export default {
  components: {
    RouterLink,
    Logo,
    LoginArrow
  }
}
</script>
