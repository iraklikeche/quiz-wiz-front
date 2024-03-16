<template>
  <SessionLayout :image="registerImage" :heading="'Create account'">
    <form class="flex flex-col gap-5 max-w-[26rem]">
      <!-- If it's okay I will leave it so, till I get familiar with vee-validate and later I will extract input and label into separate components to make it more clean and DRY.  -->
      <div class="flex flex-col">
        <label class="text-[#344054] text-sm mb-1">Username</label>
        <input
          type="text"
          placeholder="Your username"
          class="border border-[#D0D5DD] py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
      </div>
      <div class="flex flex-col">
        <label class="text-[#344054] text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          class="border border-[#D0D5DD] py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
      </div>
      <div class="flex flex-col relative">
        <label class="text-[#344054] text-sm mb-1">Password</label>
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Must be 3 characters"
          class="border border-[#D0D5DD] py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
        <ShowPassword
          :customClass="'absolute top-[55%] right-[4%] cursor-pointer'"
          @toggle="togglePassword"
        />
      </div>
      <div class="flex flex-col relative">
        <label class="text-[#344054] text-sm mb-1">Confirm Password</label>
        <input
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          placeholder="Must be 3 characters"
          class="border border-[#D0D5DD] py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
        <ShowPassword
          :customClass="'absolute top-[55%] right-[4%] cursor-pointer'"
          @toggle="toggleConfirmPassword"
        />
      </div>

      <div class="flex items-center gap-4 mt-2 pl-1">
        <input type="radio" class="scale-150" />
        <label class="text-[#344054] text-sm">I accept the terms and privacy policy</label>
      </div>
      <button class="bg-black text-white py-4 rounded-xl mt-6 font-semibold">Sign Up</button>
    </form>

    <AccountLinks :question="'Already have account? '" :buttonName="'Log in'" />
  </SessionLayout>
</template>

<script>
import ShowPassword from '@/components/icons/ShowPassword.vue'
import registerImage from '@/assets/imgs/sessions/register.png'
import Logo from '@/components/icons/Logo.vue'
import GoBack from '@/components/icons/GoBack.vue'
import SessionLayout from '@/components/SessionLayout.vue'
import AccountLinks from '@/components/AccountLinks.vue'

export default {
  components: {
    ShowPassword,
    Logo,
    GoBack,
    SessionLayout,
    AccountLinks
  },

  data() {
    return {
      registerImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false
    }
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2))
    },
    validateEmail(value) {
      if (!value) {
        return 'This field is required'
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!regex.test(value)) {
        return 'This field must be a valid email'
      }
      return true
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      console.log(this.isPasswordVisible)
    },
    toggleConfirmPassword() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
      console.log(this.isConfirmPasswordVisible)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
import { RouterLink } from 'vue-router'
