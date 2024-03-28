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
    <Form
      @submit="onSubmit"
      class="flex flex-col gap-5 max-w-[26rem]"
      :validation-schema="schema"
      v-slot="{ values, errors }"
    >
      <CustomInput
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        rules="required|email"
        type="email"
        :error="errors.email"
      />

      <CustomInput
        type="password"
        label="Password"
        name="password"
        placeholder="Must be 3 characters"
        rules="required|min:3"
        isPasswordField
        :error="errors.password"
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
import {
  getCsrfCookie,
  loginUser,
  logoutUser,
  resendVerificationLink,
  verifyEmail
} from '@/services/authService.js'
import axios from 'axios'

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
  props: {
    verified: {
      type: String,
      default: null
    }
  },
  data() {
    const schema = {
      email(value) {
        if (!value) return 'This field is required'
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(value.trim())) return 'This field must be a valid email'
        return true
      },
      password(value) {
        if (!value) return 'This field is required'
        return true
      }
    }
    return {
      schema,
      loginImage,
      isPasswordVisible: false
    }
  },
  mounted() {
    // const { id, hash } = this.$route.query
    // if (id && hash) {
    //   this.verifyEmail(id, hash)
    // }
    // console.log(id, hash)

    this.verifyEmail()
  },
  methods: {
    async verifyEmail() {
      const { id, hash, expires, signature } = this.$route.query
      console.log(id, hash, expires, signature)
      if (!id || !hash || expires || signature) {
        console.log('Verification parameters are missing.')
        return
      }

      try {
        await getCsrfCookie()
        await verifyEmail(id, hash)
        this.showToast('Your email has been successfully verified.', 'success')
      } catch (error) {
        console.error('Failed to verify email:', error)
        this.showToast('Failed to verify email. Please try again.', 'error')
      }
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    async onSubmit(values) {
      getCsrfCookie()
      await getCsrfCookie()
      try {
        const response = loginUser({
          email: values.email,
          password: values.password
        })
        console.log('logged in')
      } catch (error) {
        //
      }
    },

    async onLogout() {
      try {
        logoutUser()
        console.log('logged out')
      } catch (error) {
        //
      }
    },
    async resendVerificationEmail(email) {
      try {
        await resendVerificationLink(email)
        this.showToast('A new verification link has been sent to your email.')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.showToast('The verification link has expired. Please request a new link.')
        } else {
          this.showToast('There was an error resending the verification link.')
        }
      }
    },

    showToast(message, action) {
      console.log(message, action)
    }
  }
}
</script>
