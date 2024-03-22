<template>
  <div class="flex items-center justify-between border-b pb-4 border-border-gray mb-4">
    <RouterLink :to="{ name: 'home' }">
      <Logo />
    </RouterLink>
    <CloseModalBtn @click="$emit('close')" />
  </div>

  <div class="border-b pb-4 border-border-gray mb-4">
    <RouterLink class="text-lg font-semibold mb-4" :to="{ name: 'quizzes' }"> Quizzes </RouterLink>
  </div>

  <div class="flex flex-col">
    <button
      @click="toggleModal('registration', true)"
      class="bg-black text-white w-full py-2 rounded-md mb-2 flex justify-center font-semibold"
    >
      Sign Up
    </button>

    <!-- <TheModal
      :name="'slide-up'"
      :show="modals.registration"
      @update:show="toggleModal('registration', $event)"
      :modalContentClasses="'bg-white w-full rounded-t-lg p-4 transition-transform'"
      class="mt-20"
    >
      <RegisterView />
    </TheModal> -->

    <button
      @click="toggleModal('login', true)"
      class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
    >
      Log in
    </button>

    <!-- <TheModal
      :name="'slide-up'"
      :show="modals.login"
      @update:show="toggleModal('login', $event)"
      :modalContentClasses="'bg-white w-full rounded-t-lg p-4 transition-transform'"
      class="mt-20"
    >
      <LoginView />
    </TheModal> -->
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'
import RegisterView from '@/views/SessionView/RegisterView.vue'
import LoginView from '@/views/SessionView/LoginView.vue'
import TheModal from '@/components/modal/TheModal.vue'

export default {
  components: {
    TheModal,
    RegisterView,
    LoginView,
    Logo,
    CloseModalBtn
  },
  methods: {
    toggleModal(modalName, isVisible) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = isVisible
      }
    }
  },
  emits: ['close'],

  data() {
    return {
      modals: {
        registration: false,
        login: false
      }
    }
  }
}
</script>
