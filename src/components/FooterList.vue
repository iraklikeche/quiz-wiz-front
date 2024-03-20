<template>
  <div>
    <h2 class="text-sm font-semibold mb-4 sm:mb-8">{{ heading }}</h2>
    <ul class="flex flex-col justify-center gap-6">
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    heading: String
  }
}
</script>
