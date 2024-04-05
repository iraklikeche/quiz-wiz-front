<template>
  <div class="flex gap-4">
    <div class="flex gap-2 items-center">
      <slot />
      <div class="flex flex-col">
        <span class="text-sm text-[#101828] font-semibold">{{ label }}</span>
        <span class="text-sm text-custom-gray">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String
  }
}
</script>
