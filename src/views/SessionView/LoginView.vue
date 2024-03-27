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
  resendVerificationLink
} from '@/services/authService.js'

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
    if (this.verified) {
      if (this.verified === 'true') {
        // If the email was successfully verified
        this.showToast('Email verified successfully. Please login to continue.')
      } else if (this.verified === 'already') {
        // If the email was already verified
        this.showToast('Your email has already been verified. Please login to continue.')
      } else {
        // For any other values, or if something went wrong
        this.showToast('Could not verify email. Please try again or contact support.')
      }
    }
    if (this.verified === 'expired') {
      this.showToast('The verification link has expired.', {
        label: 'Resend Email',
        onClick: () => {
          this.resendVerificationEmail(this.email)
        }
      })
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
        console.log('logged in')
      } catch (error) {
        //
      }
    },

    async onLogout() {
      try {
        await logoutUser()
        console.log('logged out')
      } catch (error) {
        //
      }
    },
    // async resendVerificationEmail(email) {
    //   try {
    //     // Call an API method to resend the verification email
    //     await resendVerificationLink(email)
    //     this.showToast('A new verification link has been sent to your email.')
    //   } catch (error) {
    //     this.showToast('There was an error resending the verification link.')
    //   }
    // },
    async resendVerificationEmail(email) {
      try {
        await resendVerificationLink(email)
        this.showToast('A new verification link has been sent to your email.')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Specific handling for expired links
          this.showToast('The verification link has expired. Please request a new link.')
        } else {
          // General error handling
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
