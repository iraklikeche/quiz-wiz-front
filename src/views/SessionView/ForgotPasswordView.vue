<template>
  <TheToast
    :showToast="showToast"
    type="success"
    header="Link send Successfully."
    toastMsg="Please check your email to reset password"
  />
  <SessionLayout
    :image="resetImage"
    :heading="'Forgot Password?'"
    :customClass="'flex justify-center bg-[#FCE7F1]'"
    :imageClass="'max-w-[29rem] max-h-[27rem]'"
    :headingClass="'mb-2'"
  >
    <p
      class="text-custom-gray text-sm sm:mb-12 max-w-[26rem] leading-6 text-center sm:text-left mb-8 mt-4 sm:mt-0"
    >
      Don’t worry! It happens. Please enter the email associated with your account.
    </p>
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]" v-slot="{ errors }">
      <CustomInput
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        type="email"
        rules="required|email"
        :serverError="errors.email"
      />
      <button
        class="bg-black text-white py-4 rounded-xl mt-4 font-semibold hover:shadow-lg transition-all"
      >
        Send
      </button>
    </Form>
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import TheToast from '@/components/TheToast.vue'
import { Form, Field } from 'vee-validate'
import CustomInput from '@/components/form/CustomInput.vue'
import { getCsrfCookie, forgotPassword } from '@/services/authService.js'

export default {
  components: {
    SessionLayout,
    TheToast,
    Form,
    Field,
    CustomInput
  },
  data() {
    return {
      resetImage,
      showToast: false
    }
  },
  methods: {
    async onSubmit(values, { setFieldError, resetForm }) {
      await getCsrfCookie()
      try {
        await forgotPassword(values.email)
        resetForm()
        this.showToast = true

        setTimeout(() => {
          this.showToast = false
        }, 4000)
      } catch (error) {
        if (error.response.data.errors) {
          for (const fieldName in error.response.data.errors) {
            setFieldError(fieldName, error.response.data.errors[fieldName])
          }
        } else {
          setFieldError('email', error.response.data.email)
        }
      }
    }
  }
}
</script>
