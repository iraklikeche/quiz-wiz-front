<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    @update:show="showModal = $event"
    :modalContentClasses="'bg-white p-6 rounded-lg shadow-lg w-full max-w-xs'"
    class="backdrop-blur-sm'"
  >
    <HeaderModal @close="showModal = false" />
  </TheModal>

  <nav
    class="flex justify-between items-center border-b-2 border-[#666666] border-opacity-25 px-4 sm:px-20 py-4 w-full"
  >
    <div class="flex gap-20 items-center">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
      <RouterLink
        class="text-sm font-semibold text-custom-gray hidden sm:block"
        :to="{ name: 'quizzes' }"
        >Quizzes</RouterLink
      >
    </div>
    <div class="flex gap-4 sm:gap-6 items-center">
      <slot />
      <div class="sm:flex gap-6 hidden">
        <RouterLink
          :to="{ name: 'register' }"
          class="bg-black px-6 py-2 hover:shadow-[6px_5px_2px_0_rgba(0,0,0)] hover:text-black text-white font-bold text-sm rounded hover:bg-white hover:scale-105 duration-300 transition-all"
        >
          Sign up
        </RouterLink>
        <RouterLink
          :to="{ name: 'login' }"
          class="group text-[#4b69fd] font-bold text-sm tracking-wider transition-all flex gap-2 items-center"
        >
          Log in
          <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <LoginArrow />
          </span>
        </RouterLink>
      </div>
      <div class="sm:hidden">
        <MobileMenu @click="showModal = true" />
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'
import LoginArrow from '@/components/icons/LoginArrow.vue'
import MobileMenu from '@/components/icons/MobileMenu.vue'
import Logo from '@/components/icons/Logo.vue'
import HeaderModal from '@/components/modal/HeaderModal.vue'
import TheModal from '@/components/modal/TheModal.vue'

export default {
  components: {
    HeaderModal,
    RouterLink,
    Logo,
    LoginArrow,
    MobileMenu,
    TheModal
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>
