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
    :image="resetImage"
    :heading="'Reset Password'"
    :customClass="'flex justify-center bg-[#FCE7F1]'"
    :imageClass="'max-w-[29rem] max-h-[27rem]'"
    :headingClass="'mb-2'"
  >
    <p class="text-custom-gray text-sm mb-12 sm:text-left text-center sm:mb-6 mt-6">
      Please type something you’ll remember
    </p>
    <Form @submit="onSubmit" v-slot="{ errors }" class="flex flex-col gap-5 max-w-[26rem]">
      <CustomInput
        type="password"
        label="Password"
        name="password"
        placeholder="Must be 3 characters"
        isPasswordField
        rules="required|min:3"
        :serverError="errors.password"
      />

      <CustomInput
        type="password"
        label="Confirm Password"
        name="password_confirmation"
        placeholder="Must be 3 characters"
        rules="confirmed:@password"
        :serverError="errors.password_confirmation"
        isPasswordField
      />

      <button class="bg-black text-white py-4 rounded-xl mt-4 font-semibold">Reset Password</button>
    </Form>
    <AccountLinks
      :question="'Already have account? '"
      :buttonName="'Log in'"
      class="hidden sm:block"
    />
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import AccountLinks from '@/components/AccountLinks.vue'
import CustomInput from '@/components/form/CustomInput.vue'
import TheToast from '@/components/TheToast.vue'
import { Form, Field } from 'vee-validate'

import { getCsrfCookie, resetPassword, resendPasswordResetLink } from '@/services/authService.js'

export default {
  components: {
    AccountLinks,
    SessionLayout,
    CustomInput,
    Form,
    Field,
    TheToast
  },
  data() {
    return {
      resetImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      token: '',
      email: '',
      showToast: false,
      errorConfig: {
        header: '',
        msg: '',
        showToast: false,
        showResendBtn: false,
        type: ''
      }
    }
  },
  created() {
    this.token = this.$route.query.token
    this.email = this.$route.query.email || ''
  },
  methods: {
    timeout() {
      setTimeout(() => {
        this.errorConfig.showToast = false
      }, 4000)
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    toggleConfirmPassword() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    },

    getErrorConfig(status) {
      const errorConfigMap = {
        200: {
          header: 'Success!',
          msg: 'Password has been reset.',
          type: 'success'
        },
        422: {
          header: 'Token is expired',
          msg: 'The password reset link is expired or invalid.',
          type: 'warning',
          showResendBtn: true
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
        type: errorConfig.type,
        showToast: true,
        showResendBtn: errorConfig.showResendBtn || false
      }
      this.timeout()
    },
    async resend() {
      await getCsrfCookie()

      try {
        const data = await resendPasswordResetLink(this.$route.query.email)
        console.log('resend', data)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          //
        } else {
          console.log(error)
        }
      }
    },
    async onSubmit(values, { resetForm, setFieldError }) {
      try {
        console.log(values, this.token, this.email)
        await getCsrfCookie()
        const data = await resetPassword({
          token: this.token,
          email: this.email,
          password: values.password,
          password_confirmation: values.password_confirmation
        })
        resetForm()
        if (data.status === 200) {
          const status = data.status
          const errorConfig = this.getErrorConfig(status)
          this.updateStateFromError(errorConfig)
        }
      } catch (error) {
        if (error.response.status === 422) {
          const status = error.response && error.response.status
          const errorConfig = this.getErrorConfig(status)
          this.updateStateFromError(errorConfig)
        }
        for (const fieldName in error.response.data.errors) {
          setFieldError(fieldName, error.response.data.errors[fieldName])
        }
      }
    }
  }
}
</script>
