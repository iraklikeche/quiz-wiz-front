<template>
  <ErrorView :errorType="'404'" :errorImage="notFound" />
</template>

<script>
import notFound from '@/assets/imgs/errors/notFound.png'
import ErrorView from '@/views/errors/ErrorView.vue'

export default {
  components: {
    ErrorView
  },
  data() {
    return {
      notFound
    }
  }
}
</script>
