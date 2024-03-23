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


    <button
      @click="toggleModal('login', true)"
      class="bg-[#4B69FD] bg-opacity-10 w-full py-2 rounded-md text-custom-blue flex justify-center font-semibold"
    >
      Log in
    </button>

</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import CloseModalBtn from '@/components/icons/CloseModalBtn.vue'

export default {
  components: {
    Logo,
    CloseModalBtn
  },
  methods: {
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
