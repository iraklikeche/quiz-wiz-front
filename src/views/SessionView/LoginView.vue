<template>
  <SessionLayout
    :image="loginImage"
    :heading="'Hi, Welcome!'"
    :customClass="'flex justify-center bg-[#FEF6E7]'"
    :imageClass="'max-w-[29rem]'"
  >
    <AccountLinks
      :question="'Don’t have an account?'"
      :buttonName="'Sign up'"
      :linkTo="'register'"
      class="block sm:hidden text-center sm:text-left text-lg mb-6 mt-2"
    />
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]" v-slot="{ values }">
      <CustomInput
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        rules="required|email"
        type="email"
      />

      <CustomInput
        type="password"
        label="Password"
        name="password"
        placeholder="Must be 3 characters"
        rules="required|min:3"
        isPasswordField
      />

      <div class="flex items-center justify-between gap-4 mt-2 pl-1">
        <div class="flex gap-2">
          <input type="checkbox" class="accent-black scale-125" />
          <label class="text-custom-gray text-sm">Remember for 30 days</label>
        </div>
        <div>
          <RouterLink :to="{ name: 'forgot' }" class="text-custom-gray text-sm"
            >Forgot Password?</RouterLink
          >
        </div>
      </div>
      <button class="bg-black text-white py-4 rounded-xl mt-6 font-semibold">Log in</button>
    </Form>
    <button @click="onLogout">LOG OUT</button>

    <AccountLinks
      :question="'Don’t have an account?'"
      :buttonName="'Sign up'"
      :linkTo="'register'"
      class="hidden sm:block"
    />
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import loginImage from '@/assets/imgs/sessions/login.png'
import AccountLinks from '@/components/AccountLinks.vue'
import CustomInput from '@/components/form/CustomInput.vue'
import { Form } from 'vee-validate'
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { getCsrfCookie, loginUser, logoutUser } from '@/services/authService.js'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

export default {
  components: {
    SessionLayout,
    AccountLinks,
    CustomInput,
    Form
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
    },
    async onSubmit(values) {
      getCsrfCookie()
      await getCsrfCookie()
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password
        })
        console.log('Login Success:', response)
      } catch (error) {
        console.error('Login Error:', error.response.data)
      }
    },

    async onLogout() {
      try {
        await logoutUser()
        console.log('logged out')
      } catch (error) {
        console.error('Logout Error:', error.response.data)
      }
    }
  }
}
</script>
