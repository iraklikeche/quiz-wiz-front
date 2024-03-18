<template>
  <div class="sm:grid grid-cols-[45fr_55fr] sm:h-screen relative px-6 sm:px-0 flex flex-col">
    <div :class="['pt-32 hidden sm:block', customClass]">
      <img :src="image" :class="[imageClass]" />
    </div>
    <div class="hidden sm:flex gap-20 absolute top-[5%] left-[3%]">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
    </div>
    <div class="flex flex-col sm:pl-20">
      <div class="mt-2 md:mt-10">
        <button class="sm:flex gap-2 items-center hidden" @click="goBack">
          <GoBack />
          <span class="text-sm font-medium text-custom-light-gray">Back</span>
        </button>
      </div>
      <div class="pt-10 sm:pl-4">
        <h1
          :class="['text-3xl font-extrabold font-raleway text-center sm:text-left', headingClass]"
        >
          {{ heading }}
        </h1>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import GoBack from '@/components/icons/GoBack.vue'

export default {
  components: {
    Logo,
    GoBack
  },

  props: {
    image: String,
    heading: String,
    customClass: {
      type: String,
      default: ''
    },
    imageClass: {
      type: String,
      default: ''
    },
    headingClass: {
      type: String,
      default: 'mb-4 sm:mb-8'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
