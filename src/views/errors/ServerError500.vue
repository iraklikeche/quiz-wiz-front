<template>
  <ErrorView :errorType="'500'" :errorImage="serverError" />
</template>

<script>
import serverError from '@/assets/imgs/errors/serverError.png'
import ErrorView from '@/views/errors/ErrorView.vue'

export default {
  components: {
    ErrorView
  },
  data() {
    return {
      serverError
    }
  }
}
</script>
