<template>
  <div class="grid grid-cols-[45fr_55fr] h-screen">
    <div class="bg-[#EAFAFE]">
      <!-- Till you submit previous branch, cos I don't have img folder here. -->
      <img src="https://picsum.photos/550" />
    </div>
    <div class="flex flex-col pl-20 pt-24">
      <h1 class="text-3xl font-extrabold font-raleway mb-8">Create account</h1>
      <form class="flex flex-col gap-4 max-w-[26rem]">
        <!-- If it's okay I will leave it so, till I get familiar with vee-validate and later I will extract input and label into separate components to make it more clean and DRY.  -->
        <div class="flex flex-col">
          <label class="text-[#344054] text-sm mb-1">Username</label>
          <input
            type="text"
            placeholder="Your username"
            class="border border-[#D0D5DD] py-3 px-4 rounded-xl focus:border-4 outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-[#344054] text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            class="border border-[#D0D5DD] py-3 px-4 rounded-xl focus:border-4 outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-[#344054] text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="Must be 3 characters"
            class="border border-[#D0D5DD] py-3 px-4 rounded-xl focus:border-4 outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-[#344054] text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Must be 3 characters"
            class="border border-[#D0D5DD] py-3 px-4 rounded-xl focus:border-4 outline-none"
          />
          <!-- I will extract as different component when you merge previous branch, because I don't have icons folder here, and I will apply relevant styling at that time -->
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.626 2.00008C12.3789 2.05417 15.4579 5.48248 17 8.43226C17 8.43226 16.4573 9.5606 15.9484 10.2829C15.7021 10.6323 15.443 10.9727 15.1707 11.302C14.9766 11.5364 14.7761 11.7646 14.5681 11.9864C12.7094 13.9698 10.04 15.4493 7.22122 14.8749C4.08975 14.2366 1.53539 11.5104 0 8.57831C0 8.57831 0.545159 7.44888 1.05695 6.72766C1.28623 6.4042 1.52687 6.08939 1.77886 5.78395C1.97194 5.54991 2.17212 5.32165 2.37903 5.09987C4.02125 3.34155 6.12842 1.98782 8.626 2.00008ZM8.61287 3.44252C6.52238 3.43458 4.78398 4.62063 3.40866 6.09299C3.22162 6.29313 3.04132 6.4994 2.8667 6.71071C2.63706 6.9891 2.41772 7.27651 2.20867 7.57113C1.99962 7.86538 1.78525 8.23681 1.61525 8.55234C2.96891 10.8635 5.00083 12.951 7.50054 13.4606C9.82989 13.9355 12.0038 12.6308 13.5399 10.9919C13.7276 10.7917 13.909 10.5851 14.0843 10.3734C14.3328 10.073 14.5691 9.76255 14.7938 9.44341C15.0018 9.14807 15.2158 8.77592 15.3855 8.46003C13.9807 6.07099 11.5772 3.4894 8.61287 3.44252Z"
              fill="#98A2B3"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.4997 5.61426C10.0702 5.61426 11.3455 6.90992 11.3455 8.50526C11.3455 10.101 10.0702 11.3963 8.4997 11.3963C6.92953 11.3963 5.6543 10.101 5.6543 8.50526C5.6543 6.90992 6.92953 5.61426 8.4997 5.61426Z"
              fill="#98A2B3"
            />
          </svg>
        </div>

        <div class="flex items-center gap-4">
          <input type="radio" class="scale-150" />
          <label class="text-[#344054] text-sm">I accept the terms and privacy policy</label>
        </div>
        <button class="bg-black text-white py-4 rounded-xl mt-8">Sign Up</button>
      </form>

      <div class="mt-4">
        <p class="text-sm opacity-70">Already have account? <span>Log in</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2))
    },
    validateEmail(value) {
      if (!value) {
        return 'This field is required'
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!regex.test(value)) {
        return 'This field must be a valid email'
      }
      return true
    }
  }
}
</script>
