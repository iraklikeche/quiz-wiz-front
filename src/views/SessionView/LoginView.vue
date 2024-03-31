<template>
  <TheToast :showToast="showToast" type="warning" :header="header" :toastMsg="msg">
    <div v-if="showResendBtn" class="mt-2">
      <button
        @click="resend"
        class="ml-4mt-4 text-white font-semibold text-sm bg-black py-2 px-4 rounded-xl"
      >
        Re-send
      </button>
    </div>
  </TheToast>
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
      v-slot="{ errors }"
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
import TheToast from '@/components/TheToast.vue'
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

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

export default {
  components: {
    SessionLayout,
    AccountLinks,
    CustomInput,
    Form,
    TheToast
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
      isPasswordVisible: false,
      header: '',
      msg: '',
      showToast: false,
      showResendBtn: false
    }
  },
  mounted() {
    this.verifyEmail()
    console.log(this.$route)
    console.log(this.$route.query.verify_url)
  },
  methods: {
    timeout() {
      setTimeout(() => {
        this.showToast = false
      }, 4000)
    },

    extractIDFromURL(url) {
      const regex = /\/verify\/(\d+)/
      const match = url.match(regex)
      if (match && match[1]) {
        return match[1]
      }

      return null
    },
    updateStateFromError(errorConfig) {
      this.header = errorConfig.header
      this.msg = errorConfig.msg
      this.showToast = true
      this.showResendBtn = errorConfig.showResendBtn || false

      this.timeout()
    },

    getErrorConfig(status) {
      const errorConfigMap = {
        403: {
          header: 'Token is expired',
          msg: 'Please click button to re-send token',
          showResendBtn: true
        },
        422: {
          header: 'Verified',
          msg: 'You have already verified your account.'
        },
        default: {
          header: 'Error',
          msg: 'Oops, something went wrong.'
        }
      }

      return errorConfigMap[status] || errorConfigMap.default
    },
    async verifyEmail() {
      const verifyUrl = this.$route.query.verify_url
      const url = new URL(decodeURIComponent(verifyUrl))

      try {
        await getCsrfCookie()
        const data = await verifyEmail(`${url.pathname}?${url.searchParams.toString()}`)
        if (data.status === 200) {
          console.log('User is verified')
        }
      } catch (error) {
        const status = error.response && error.response.status
        const errorConfig = this.getErrorConfig(status)

        this.updateStateFromError(errorConfig)
      }
    },

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
        localStorage.setItem('isLoggedIn', true)
        this.$router.push('/quizzes')
      } catch (error) {
        //
      }
    },

    async onLogout() {
      try {
        await logoutUser()
        localStorage.removeItem('isLoggedIn')
      } catch (error) {
        //
      }
    },
    async resend() {
      await getCsrfCookie()
      console.log(this.$route.query.verify_url)
      const id = this.extractIDFromURL(this.$route.query.verify_url)
      console.log(id)
      try {
        const data = await resendVerificationLink(id)
        console.log('resend', data)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          //
        } else {
          console.log(error)
        }
      }
    }
  }
}
</script>
