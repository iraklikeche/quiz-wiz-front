<template>
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
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]">
      <CustomInput
        type="password"
        label="Password"
        name="password"
        placeholder="Must be 3 characters"
        rules="required|min:3"
        isPasswordField
      />

      <CustomInput
        type="password"
        label="Confirm Password"
        name="confirmation"
        placeholder="Must be 3 characters"
        rules="confirmed:@password"
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
import { Form, Field } from 'vee-validate'
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { getCsrfCookie, resetPassword } from '@/services/authService.js'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

export default {
  components: {
    AccountLinks,
    SessionLayout,
    CustomInput,
    Form,
    Field
  },
  data() {
    return {
      resetImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      token: '',
      email: ''
    }
  },
  created() {
    this.token = this.$route.query.token
    this.email = this.$route.query.email || ''
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    toggleConfirmPassword() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    },
    async onSubmit(values, { resetForm }) {
      try {
        console.log(values, this.token, this.email)
        await getCsrfCookie()
        await resetPassword({
          token: this.token,
          email: this.email,
          password: values.password,
          password_confirmation: values.confirmation
        })
        resetForm()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
