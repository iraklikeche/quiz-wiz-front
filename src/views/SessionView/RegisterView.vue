<template>
  <TheToast
    :showToast="showToast"
    type="success"
    header="Registered Successfully."
    toastMsg="Please check your e-mail to verify your account."
  />

  <SessionLayout :image="registerImage" :heading="'Create account'" :customClass="'bg-[#EAFAFE]'">
    <AccountLinks
      :question="'Already have account? '"
      :buttonName="'Log in'"
      class="block sm:hidden text-center sm:text-left mb-12 sm:mb-0"
    />
    <Form @submit="onSubmit" class="flex flex-col gap-5 max-w-[26rem]" v-slot="{ errors }">
      <CustomInput
        label="Username"
        name="username"
        placeholder="Your username"
        rules="required|min:3"
        type="text"
        :serverError="errors.username"
      />

      <CustomInput
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        type="email"
        rules="required|email"
        :serverError="errors.email"
      />

      <CustomInput
        type="password"
        label="Password"
        name="password"
        rules="required|min:3"
        placeholder="Must be 3 characters"
        isPasswordField
        :serverError="errors.password"
      />

      <CustomInput
        type="password"
        label="Confirm Password"
        name="password_confirmation"
        placeholder="Must be 3 characters"
        isPasswordField
        rules="confirmed:@password_confirmation"
        :serverError="errors.password_confirmation"
      />

      <div>
        <div class="flex gap-4 items-center pl-1 mb-2">
          <Field
            name="agreed_to_terms"
            type="radio"
            value="true"
            class="scale-150"
            :serverError="errors.agreed_to_terms"
          />
          <label class="text-[#344054] text-sm">I accept the terms and privacy policy</label>
        </div>
        <ErrorMessage name="agreed_to_terms" class="text-red-500 text-sm" />
      </div>

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
import CustomInput from '@/components/form/CustomInput.vue'
import { registerUser, getCsrfCookie } from '@/services/authService.js'
import TheToast from '@/components/TheToast.vue'

export default {
  components: {
    SessionLayout,
    AccountLinks,
    Form,
    Field,
    ErrorMessage,
    CustomInput,
    TheToast
  },

  data() {
    return {
      registerImage,
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      showToast: false,
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
    async onSubmit(values, { resetForm, setFieldError }) {
      try {
        await getCsrfCookie()
        await registerUser(values)
        resetForm()
        this.showToast = true

        setTimeout(() => {
          this.showToast = false
        }, 4000)
      } catch (error) {
        console.log(error)

        for (const fieldName in error.response.data.errors) {
          setFieldError(fieldName, error.response.data.errors[fieldName])
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
