<template>
  <TheModal
    :show="showModal"
    @update:show="showModal = $event"
    :customClasses="'backdrop-blur-sm'"
    :modalContentClasses="'bg-white p-6 rounded-lg shadow-lg w-full max-w-xs'"
  >
    <HeaderModal @update:show="showModal = false" />
  </TheModal>

  <nav
    class="flex justify-between items-center border-b-2 border-[#666666] border-opacity-25 px-4 sm:px-12 py-4 w-full"
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
      <!-- <div class="sm:flex gap-6 items-center hidden"> -->
      <div class="sm:flex gap-6 hidden">
        <RouterLink
          :to="{ name: 'register' }"
          class="bg-black px-6 py-2 shadow-br hover:text-black text-white font-bold text-sm rounded hover:bg-white hover:shadow-lg hover:scale-105 duration-300 transition-all"
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
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'
import Logo from '@/components/icons/Logo.vue'
import HeaderModal from '@/components/modal/HeaderModal.vue'
import TheModal from '@/components/modal/TheModal.vue'

export default {
  components: {
    HeaderModal,
    CloseModalBtn,
    RouterLink,
    Logo,
    LoginArrow,
    MobileMenu,
    TheModal
  },
  data() {
    return {
      showModal: false,
      showRegistrationModal: false
    }
  }
}
</script>

<style scoped>
.shadow-br:hover {
  box-shadow: 6px 5px 2px 0 rgb(0, 0, 0);
}
</style>
