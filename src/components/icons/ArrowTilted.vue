<template>
  <svg
    :width="width"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 27L27 2M27 2H2M27 2V27"
      :stroke="stroke"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    stroke: {
      type: String,
      default: 'white'
    },
    width: {
      type: String,
      default: '29'
    }
  }
}
</script>
