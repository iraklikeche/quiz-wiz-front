<template>
  <li class="flex gap-2">
    <slot></slot>
    <span class="text-custom-light-gray text-sm font-semibold">{{ text }}</span>
  </li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
