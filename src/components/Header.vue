<template>
  <nav
    class="flex justify-between items-center border-b-2 border-[#666666] border-opacity-25 px-24 py-4"
  >
    <div class="flex gap-20">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
      <button class="text-sm font-semibold text-[#475467]">Quizzes</button>
    </div>
    <div class="flex gap-6">
      <button
        class="bg-black px-6 py-2 text-white font-bold text-sm rounded hover:bg-white hover:text-black hover:shadow-black hover:shadow-lg hover:scale-105 duration-300 transition-all"
      >
        Sign up
      </button>
      <button
        @mouseover="hover = true"
        @mouseleave="hover = false"
        class="text-[#4b69fd] font-bold text-sm tracking-wider hover:opacity-70 transition-all flex gap-2 items-center"
      >
        Log in
        <span :style="{ opacity: hover ? '100' : '0' }" class="transition-all duration-700">
          <LoginArrow />
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Logo from '@/components/icons/Logo.vue'
import LoginArrow from '@/components/icons/LoginArrow.vue'

const hover = ref(false)
</script>
