<template>
  <div class="flex flex-col relative">
    <label class="text-custom-gray text-sm mb-1">{{ label }}</label>
    <Field
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      class="border border-border-gray py-4 px-4 rounded-xl focus:ring-2 outline-none focus:border-border-gray focus:border-transparent"
      :class="{ 'border-red-500': serverError }"
      :validateOnInput="true"
      :validateOnBlur="false"
      :rules="rules"
    />
    <div v-if="serverError" class="absolute right-2 top-[38%] translate-y-1/2 -translate-x-1/2">
      <ErrorIcon />
    </div>

    <div class="h-4">
      <ErrorMessage :name="name" class="text-[#F04438] text-sm mt-1 mb-2 leading-3" />

      <ShowPassword
        v-if="isPasswordField && !serverError"
        :customClass="'absolute top-[45%] right-[4%] cursor-pointer cursor-pointer'"
        @toggle="togglePasswordVisibility"
      />
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'
import ShowPassword from '@/components/icons/ShowPassword.vue'
import ErrorIcon from '../icons/ErrorIcon.vue'
export default {
  components: {
    Field,
    ErrorMessage,
    ShowPassword,
    ErrorIcon
  },
  props: {
    label: String,
    type: String,
    name: String,
    placeholder: String,
    rules: String,
    isPasswordField: Boolean,
    serverError: String,
    error: String
  },
  data() {
    return {
      isPasswordVisible: false
    }
  },
  computed: {
    inputType() {
      if (this.isPasswordField) {
        return this.isPasswordVisible ? 'text' : 'password'
      }
      return this.type
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>
