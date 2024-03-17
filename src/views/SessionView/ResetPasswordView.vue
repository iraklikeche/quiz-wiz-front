<template>
  <SessionLayout
    :image="resetImage"
    :heading="'Reset Password'"
    :customClass="'flex justify-center bg-[#FCE7F1]'"
    :imageClass="'max-w-[29rem] max-h-[27rem]'"
    :headingClass="'mb-2'"
  >
    <p class="text-custom-gray text-sm mb-12">Please type something you’ll remember</p>
    <form class="flex flex-col gap-5 max-w-[26rem]">
      <div class="flex flex-col relative">
        <label class="text-custom-gray text-sm mb-1">Password</label>
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Must be 3 characters"
          class="border border-border-gray py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
        <ShowPassword
          :customClass="'absolute top-[55%] right-[4%] cursor-pointer'"
          @toggle="togglePassword"
        />
      </div>
      <div class="flex flex-col relative">
        <label class="text-custom-gray text-sm mb-1">Confirm Password</label>
        <input
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          placeholder="Must be 3 characters"
          class="border border-border-gray py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
        <ShowPassword
          :customClass="'absolute top-[55%] right-[4%] cursor-pointer'"
          @toggle="toggleConfirmPassword"
        />
      </div>

      <button class="bg-black text-white py-4 rounded-xl mt-4 font-semibold">Reset Password</button>
    </form>
    <AccountLinks :question="'Already have account? '" :buttonName="'Log in'" />
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import AccountLinks from '@/components/AccountLinks.vue'
import ShowPassword from '@/components/icons/ShowPassword.vue'

export default {
  components: {
    AccountLinks,
    SessionLayout,
    ShowPassword
  },
  data() {
    return {
      resetImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false
    }
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    toggleConfirmPassword() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    }
  }
}
</script>
