<template>
  <div class="mt-2 sm:mt-8">
    <p
      class="text-lg sm:text-sm font-normal sm:font-semibold flex justify-center sm:justify-normal"
    >
      <span class="opacity-70 mr-2"> {{ question }}</span>
      <RouterLink :to="{ name: linkTo }" class="text-[#4B69FD] block"> {{ buttonName }}</RouterLink>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    buttonName: String,
    linkTo: {
      type: String,
      default: 'login'
    }
  }
}
</script>
