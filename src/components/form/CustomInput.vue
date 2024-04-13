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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_8198_160)">
          <path
            d="M8.00016 5.33337V8.00004M8.00016 10.6667H8.00683M14.6668 8.00004C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8.00004C1.3335 4.31814 4.31826 1.33337 8.00016 1.33337C11.6821 1.33337 14.6668 4.31814 14.6668 8.00004Z"
            stroke="#F04438"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_8198_160">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
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
export default {
  components: {
    Field,
    ErrorMessage,
    ShowPassword
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
