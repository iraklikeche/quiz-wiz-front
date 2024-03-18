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
      @click="showRegistrationModal = true"
      class="bg-black text-white w-full py-2 rounded-md mb-2 flex justify-center font-semibold"
    >
      Sign Up
    </button>

    <TheModal
      :show="showRegistrationModal"
      :modalContentClasses="'bg-white w-full rounded-t-lg p-4 h-[90vh]  transition-transform'"
      :customClasses="'flex justify-center items-end '"
      @update:show="showRegistrationModal = $event"
    >
      <RegisterView />
    </TheModal>

    <button
      @click="showLoginModal = true"
      class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
    >
      Log in
    </button>

    <TheModal
      :show="showLoginModal"
      :modalContentClasses="'bg-white w-full rounded-t-lg p-4 h-[90vh]  transition-transform'"
      :customClasses="'flex justify-center items-end '"
      @update:show="showLoginModal = $event"
    >
      <LoginView />
    </TheModal>
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
    updateShowModal(value) {
      this.$emit('update:show', value)
    }
  },
  emits: ['update:show'],

  data() {
    return {
      showRegistrationModal: false,
      showLoginModal: false
    }
  }
}
</script>
