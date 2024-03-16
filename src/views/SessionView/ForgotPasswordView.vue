<template>
  <SessionLayout
    :image="resetImage"
    :heading="'Forgot Password?'"
    :customClass="'flex justify-center bg-[#FCE7F1]'"
    :imageClass="'max-w-[29rem] max-h-[27rem]'"
    :headingClass="'mb-2'"
  >
    <p class="text-custom-gray text-sm mb-12 max-w-[26rem] leading-6">
      Don’t worry! It happens. Please enter the email associated with your account.
    </p>
    <form class="flex flex-col gap-5 max-w-[26rem]">
      <div class="flex flex-col">
        <label class="text-custom-gray text-sm mb-1">Email Adress</label>
        <input
          type="email"
          placeholder="Enter your email address"
          class="border border-border-gray py-4 px-4 rounded-xl focus:border-4 outline-none"
        />
      </div>
      <button class="bg-black text-white py-4 rounded-xl mt-4 font-semibold">Send</button>
    </form>
  </SessionLayout>
</template>

<script>
import SessionLayout from '@/components/SessionLayout.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'

export default {
  components: {
    SessionLayout
  },
  data() {
    return {
      resetImage
    }
  }
}
</script>
