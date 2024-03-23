<template>
  <div class="flex flex-col relative">
    <label class="text-custom-gray text-sm mb-1">{{ name }}</label>
    <Field
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      class="border border-border-gray py-4 px-4 rounded-xl focus:ring-2 outline-none focus:border-border-gray focus:border-transparent"
      :rules="rules"
      :validateOnInput="true"
    />

    <ErrorMessage
      :name="name"
      class="text-[#F04438] text-sm h-4 mt-1 mb-2"
      v-slot="{ message }"
      :serverErrors="serverErrors"
    >
      <p v-if="message" class="text-[#F04438] text-sm">{{ message }}</p>
      <p v-else-if="serverErrors">serverErrors</p>
    </ErrorMessage>

    <ShowPassword
      v-if="isPasswordField"
      :customClass="'absolute top-[43%] right-[4%] cursor-pointer cursor-pointer'"
      @toggle="togglePasswordVisibility"
    />
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
    type: String,
    name: String,
    placeholder: String,
    rules: String,
    isPasswordField: Boolean,
    serverErrors: Object
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
