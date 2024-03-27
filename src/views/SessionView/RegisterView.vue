<template>
  <SessionLayout :image="registerImage" :heading="'Create account'" :customClass="'bg-[#EAFAFE]'">
    <AccountLinks
      :question="'Already have account? '"
      :buttonName="'Log in'"
      class="block sm:hidden text-center sm:text-left mb-12 sm:mb-0"
    />
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]" v-slot="{ values, meta }">
      <CustomInput
        label="Username"
        name="username"
        placeholder="Your username"
        rules="required|min:3"
        type="text"
        :serverErrors="formErrors"
      />

      <div v-if="formErrors.email" class="text-red-500">
        <p v-for="(error, index) in formErrors.email" :key="index">{{ error }}</p>
      </div>
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

      <CustomInput
        type="password"
        label="Confirm Password"
        name="confirmation"
        placeholder="Must be 3 characters"
        rules="confirmed:@password"
        isPasswordField
      />

      <div class="flex items-center gap-4 pl-1">
        <Field name="terms" type="radio" value="true" class="scale-150" rules="required" />
        <label class="text-[#344054] text-sm">I accept the terms and privacy policy</label>
      </div>
      <ErrorMessage name="terms" />

      <button class="bg-black text-white py-4 rounded-xl mt-6 font-semibold">Sign Up</button>
    </Form>

    <AccountLinks
      :question="'Already have account? '"
      :buttonName="'Log in'"
      class="hidden sm:block"
    />
  </SessionLayout>
</template>

<script>
import registerImage from '@/assets/imgs/sessions/register.png'
import SessionLayout from '@/components/SessionLayout.vue'
import AccountLinks from '@/components/AccountLinks.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import CustomInput from '@/components/form/CustomInput.vue'
import { registerUser } from '@/services/authService.js'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

export default {
  components: {
    SessionLayout,
    AccountLinks,
    Form,
    Field,
    ErrorMessage,
    CustomInput
  },

  data() {
    return {
      registerImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      formErrors: {},
      formValues: {
        username: '',
        email: '',
        password: '',
        confirmation: '',
        terms: false
      }
    }
  },
  methods: {
    async onSubmit(values, { resetForm }) {
      try {
        await registerUser(values)
        resetForm()
        console.log('created')
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.formErrors = error.response.data.errors
          console.log(error)
        }
      }
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    toggleConfirmPassword() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    },
    goBack() {
      this.$router.go(-1)
    },
    emitToggle() {
      this.$emit('toggle')
    }
  }
}
</script>
