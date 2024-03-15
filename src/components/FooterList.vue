<template>
  <div>
    <h2 class="text-sm font-semibold mb-8">{{ props.heading }}</h2>
    <ul class="flex flex-col justify-center gap-8">
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
