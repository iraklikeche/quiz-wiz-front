<template>
  <div @click.stop class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
    <div class="flex items-center justify-between border-b pb-4 border-border-gray mb-4">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
      <CloseModalBtn @click="$emit('close')" />
    </div>

    <div class="border-b pb-4 border-border-gray mb-4">
      <RouterLink class="text-lg font-semibold mb-4" :to="{ name: 'quizzes' }">
        Quizzes
      </RouterLink>
    </div>

    <div class="flex flex-col">
      <button
        @click="showRegistrationModal = true"
        class="bg-black text-white w-full py-2 rounded-md mb-2 flex justify-center font-semibold"
      >
        Sign Up
      </button>

      <RegisterModal :show="showRegistrationModal" @update:show="showRegistrationModal = $event" />

      <button
        @click="showLoginModal = true"
        class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
      >
        Log in
      </button>

      <LoginModal :show="showLoginModal" @update:show="showLoginModal = $event" />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'
import RegisterModal from '@/components/modal/RegisterModal.vue'
import LoginModal from '@/components/modal/LoginModal.vue'

export default {
  components: {
    Logo,
    CloseModalBtn,
    RegisterModal,
    LoginModal
  },
  methods: {},

  emits: ['close'],
  data() {
    return {
      showRegistrationModal: false,
      showLoginModal: false
    }
  }
}
</script>
