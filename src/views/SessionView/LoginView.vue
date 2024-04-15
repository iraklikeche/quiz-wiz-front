<template>
  <TheToast
    :showToast="errorConfig.showToast"
    :type="errorConfig.type"
    :header="errorConfig.header"
    :toastMsg="errorConfig.msg"
  >
    <div v-if="errorConfig.showResendBtn" class="mt-2">
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
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]" v-slot="{ errors }">
      <CustomInput
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        type="email"
        :serverError="errors.email"
        rules="required|email"
      />

      <CustomInput
        type="password"
        label="Password"
        name="password"
        rules="required"
        placeholder="Must be 3 characters"
        isPasswordField
        :serverError="errors.password"
      />

      <div class="flex items-center justify-between gap-4 mt-2 pl-1">
        <div class="flex gap-2">
          <div class="flex gap-4 items-center">
            <label
              class="relative flex items-center rounded-full cursor-pointer text-[#344054] text-sm gap-2"
              htmlFor="customStyle"
            >
              <Field
                name="remember"
                type="checkbox"
                value="true"
                class="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                :serverError="errors.agreed_to_terms"
              />
              <span
                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-[6%] -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
              >
                <Checkbox /> </span
              >Remember for 30 days
            </label>
          </div>
        </div>
        <div>
          <RouterLink :to="{ name: 'forgot' }" class="text-custom-gray text-sm"
            >Forgot Password?</RouterLink
          >
        </div>
      </div>
      <button class="bg-black text-white py-4 rounded-xl mt-6 font-semibold">Log in</button>
    </Form>

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
import Checkbox from '@/components/icons/Checkbox.vue'

import { Form, Field } from 'vee-validate'
import {
  getCsrfCookie,
  loginUser,
  resendVerificationLink,
  verifyEmail
} from '@/services/authService.js'

export default {
  components: {
    SessionLayout,
    AccountLinks,
    CustomInput,
    Form,
    Field,
    TheToast,
    Checkbox
  },
  props: {
    verified: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loginImage,
      isPasswordVisible: false,
      errorConfig: {
        header: '',
        msg: '',
        showToast: false,
        showResendBtn: false,
        type: ''
      }
    }
  },
  mounted() {
    this.verifyEmail()
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

    getErrorConfig(status) {
      const errorConfigMap = {
        200: {
          header: 'Success!',
          msg: 'Email has been successfully verified.',
          type: 'success'
        },
        403: {
          header: 'Token is expired',
          msg: 'Please click button to re-send token',
          showResendBtn: true,
          type: 'warning'
        },
        422: {
          header: 'Verified',
          msg: 'You have already verified your account.',
          type: 'warning'
        },
        default: {
          header: 'Error',
          msg: 'Oops, something went wrong.'
        }
      }

      return errorConfigMap[status] || errorConfigMap.default
    },
    updateStateFromError(errorConfig) {
      this.errorConfig = {
        ...this.errorConfig,
        header: errorConfig.header,
        msg: errorConfig.msg,
        showToast: true,
        showResendBtn: errorConfig.showResendBtn || false,
        type: errorConfig.type
      }
      this.timeout()
    },

    async verifyEmail() {
      const verifyUrl = this.$route.query.verify_url
      const url = new URL(decodeURIComponent(verifyUrl))

      try {
        await getCsrfCookie()
        const data = await verifyEmail(`${url.pathname}?${url.searchParams.toString()}`)
        if (data.status === 200) {
          const status = data.status
          const errorConfig = this.getErrorConfig(status)
          this.updateStateFromError(errorConfig)
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
    async onSubmit(values, { setFieldError }) {
      await getCsrfCookie()
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
          remember: values.remember
        })
        localStorage.setItem('isLoggedIn', true)
        this.$router.push('/quizzes')
      } catch (error) {
        if (error.response.data.errors) {
          for (const fieldName in error.response.data.errors) {
            setFieldError(fieldName, error.response.data.errors[fieldName])
          }
        } else {
          setFieldError('email', error.response.data.message)
        }
      }
    },

    async resend() {
      await getCsrfCookie()
      const id = this.extractIDFromURL(this.$route.query.verify_url)
      try {
        const data = await resendVerificationLink(id)
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
