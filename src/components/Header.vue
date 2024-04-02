<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    @update:show="showModal = $event"
    :modalContentClasses="'bg-white p-6 rounded-lg shadow-lg w-full max-w-xs'"
    class="backdrop-blur bg-black bg-opacity-50"
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

    <div v-if="isLogged">
      <div class="flex gap-2 items-center">
        <TheAvatar />
        <div>
          <h4 class="text-sm font-bold">{{ username }}</h4>
          <p class="text-sm text-custom-light-gray">{{ email }}</p>
        </div>
      </div>
      <div class="border-t pt-2 mt-4">
        <button
          @click="onLogout"
          class="bg-[#4B69FD] bg-opacity-10 w-full py-2 mt-2 rounded-md text-custom-blue flex justify-center font-semibold"
        >
          Log out
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col">
      <RouterLink
        :to="{ name: 'register' }"
        class="bg-black text-white w-full py-2 rounded-md mb-2 flex justify-center font-semibold"
      >
        Sign up
      </RouterLink>
      <RouterLink
        :to="{ name: 'login' }"
        class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
      >
        Log in
      </RouterLink>
    </div>
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
      <div
        v-if="isLogged"
        @click="showProfileModal"
        class="hidden sm:flex items-center justify-center relative"
      >
        <TheAvatar class="cursor-pointer" />

        <div
          v-if="showProfile"
          class="absolute right-0 -top-2 border border-border-gray rounded-lg z-10"
          @click.self="closeProfile"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg min-w-[19rem] flex flex-col pt-10">
            <TheAvatar />
            <h4 class="text-sm font-bold mt-4">{{ username }}</h4>
            <div class="flex justify-between items-center">
              <p class="text-sm text-custom-light-gray">{{ email }}</p>
              <button @click="onLogout">
                <Logout class="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
import CloseModalBtn from './icons/CloseModalBtn.vue'
import TheAvatar from './icons/TheAvatar.vue'
import Logout from '@/components/icons/Logout.vue'
import { getCsrfCookie, logoutUser, getUser } from '@/services/authService.js'

export default {
  components: {
    RouterLink,
    Logo,
    LoginArrow,
    MobileMenu,
    TheModal,
    CloseModalBtn,
    TheAvatar,
    Logout
  },

  data() {
    return {
      showModal: false,
      registrationModal: false,
      loginModal: false,
      isLogged: false,
      showProfile: false,
      email: '',
      username: ''
    }
  },
  mounted() {
    this.initialLoginCheck()
    if (this.isLogged) {
      this.getUserData()
    }
  },
  methods: {
    async getUserData() {
      try {
        const data = await getUser()
        this.email = data.data.email
        this.username = data.data.username
      } catch (err) {
        //
      }
    },
    initialLoginCheck() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        this.isLogged = true
      }
    },
    showProfileModal() {
      this.showProfile = true
    },
    closeProfile() {
      this.showProfile = false
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
    },
    async onLogout() {
      await getCsrfCookie()
      try {
        await logoutUser()
        localStorage.removeItem('isLoggedIn')
        this.$router.push('/login')
      } catch (error) {
        //
      }
    }
  }
}
</script>
