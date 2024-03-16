<template>
  <div class="mt-8">
    <p class="text-sm font-semibold">
      <span class="opacity-70 mr-2"> {{ question }}</span>
      <RouterLink :to="{ name: linkTo }" class="text-[#4B69FD]"> {{ buttonName }}</RouterLink>
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
