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
        <div class="flex gap-4 items-center mb-2">
          <label
            class="relative flex items-center rounded-full cursor-pointer text-[#344054] text-sm gap-4"
            htmlFor="customStyle"
          >
            <Field
              name="agreed_to_terms"
              type="checkbox"
              value="true"
              id="customStyle"
              class="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
            />
            <span
              class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-[4%] -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
            >
              <Checkbox /> </span
            >I accept the terms and privacy policy
          </label>
        </div>
        <span v-if="errors.agreed_to_terms" class="text-red-500">
          {{ errors.agreed_to_terms }}
        </span>
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
import Checkbox from '@/components/icons/Checkbox.vue'

export default {
  components: {
    SessionLayout,
    AccountLinks,
    Form,
    Field,
    ErrorMessage,
    CustomInput,
    TheToast,
    Checkbox
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
