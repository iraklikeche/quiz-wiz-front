<template>
  <SessionLayout
    :image="loginImage"
    :heading="'Hi, Welcome!'"
    :customClass="'flex justify-center'"
    :imageClass="'max-w-[29rem]'"
  >
    <form class="flex flex-col gap-5 max-w-[26rem]">
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

      <div class="flex items-center gap-4 mt-2 pl-1">
        <input type="checkbox" class="accent-black scale-125" />
        <label class="text-[#344054] text-sm">I accept the terms and privacy policy</label>
      </div>
      <button class="bg-black text-white py-4 rounded-xl mt-6 font-semibold">Log in</button>
    </form>

    <AccountLinks :question="'Don’t have an account?'" :buttonName="'Sign up'" />
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import loginImage from '@/assets/imgs/sessions/login.png'
import AccountLinks from '@/components/AccountLinks.vue'
import ShowPassword from '@/components/icons/ShowPassword.vue'
export default {
  components: {
    SessionLayout,
    AccountLinks,
    ShowPassword
  },
  data() {
    return {
      loginImage,
      isPasswordVisible: false
    }
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      console.log(this.isPasswordVisible)
    }
  }
}
</script>
