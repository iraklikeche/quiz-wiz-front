<template>
  <div class="grid grid-cols-[45fr_55fr] h-screen relative">
    <div class="bg-[#EAFAFE] pt-32">
      <img :src="image" />
    </div>
    <div class="flex gap-20 absolute top-[5%] left-[3%]">
      <RouterLink :to="{ name: 'home' }">
        <Logo />
      </RouterLink>
    </div>
    <div class="flex flex-col pl-20">
      <div class="mt-10">
        <button class="flex gap-2 items-center" @click="goBack">
          <GoBack />
          <span class="text-sm font-medium text-[#667085]">Back</span>
        </button>
      </div>
      <div class="pt-10">
        <h1 class="text-3xl font-extrabold font-raleway mb-8">{{ heading }}</h1>
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
    heading: String
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
