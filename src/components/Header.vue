<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    @update:show="showModal = $event"
    :modalContentClasses="'bg-white p-6 rounded-lg shadow-lg w-full max-w-xs'"
    class="backdrop-blur'"
  >
    <div class="flex items-center justify-between border-b pb-4 border-border-gray mb-4">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
      <CloseModalBtn @click="showModal = false" />
    </div>

    <div class="border-b pb-4 border-border-gray mb-4">
      <RouterLink class="text-lg font-semibold mb-4" :to="{ name: 'quizzes' }">
        Quizzes
      </RouterLink>
    </div>

    <div class="flex flex-col">
      <button
        @click="showRegisterModal"
        class="bg-black text-white w-full py-2 rounded-md mb-2 flex justify-center font-semibold"
      >
        Sign Up
      </button>

      <button
        @click="showLoginModal"
        class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
      >
        Log in
      </button>
    </div>
  </TheModal>

  <TheModal
    :name="'slide-up'"
    :show="registrationModal"
    @update:show="registrationModal = false"
    :modalContentClasses="'bg-white w-full rounded-t-lg p-4 transition-transform backdrop-blur'"
    class="pt-32 backdrop-blur"
  >
    <RegisterView />
  </TheModal>

  <TheModal
    :name="'slide-up'"
    :show="loginModal"
    @update:show="loginModal = false"
    :modalContentClasses="'bg-white w-full rounded-t-lg p-4 h-full transition-transform backdrop-blur'"
    class="pt-32 backdrop-blur"
  >
    <LoginView />
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
      <div v-if="isLogged">AVATAR</div>

      <div v-else class="sm:flex gap-6 hidden">
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
import TheModal from '@/components/modal/TheModal.vue'
import RegisterView from '@/views/SessionView/RegisterView.vue'
import LoginView from '@/views/SessionView/LoginView.vue'
import CloseModalBtn from './icons/CloseModalBtn.vue'

export default {
  components: {
    RegisterView,
    LoginView,
    RouterLink,
    Logo,
    LoginArrow,
    MobileMenu,
    TheModal,
    CloseModalBtn
  },

  data() {
    return {
      showModal: false,
      registrationModal: false,
      loginModal: false,
      isLogged: false
    }
  },
  mounted() {
    this.initialLoginCheck()
  },
  methods: {
    initialLoginCheck() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        this.isLogged = true
      }
    },
    showRegisterModal() {
      this.showModal = false
      this.loginModal = false
      this.registrationModal = true
    },
    showLoginModal() {
      this.showModal = false
      this.registrationModal = false
      this.loginModal = true
    }
  }
}
</script>
