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
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import CustomInput from '@/components/form/CustomInput.vue'
import { getCsrfCookie, forgotPassword } from '@/services/authService.js'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

export default {
  components: {
    SessionLayout,
    TheToast,
    Form,
    Field,
    CustomInput
  },
  data() {
    const schema = {
      email(value) {
        if (!value) return 'This field is required'
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(value.trim())) return 'This field must be a valid email'
        return true
      }
    }
    return {
      resetImage,
      schema,
      showToast: false
    }
  },
  methods: {
    test() {
      console.log(1)
    },
    async onSubmit(values) {
      await getCsrfCookie()
      try {
        await forgotPassword(values.email)
        this.showToast = true

        setTimeout(() => {
          this.showToast = false
        }, 4000)
      } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
      }
    }
  }
}
</script>
