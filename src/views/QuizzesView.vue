<template>
  <Header />
  <div class="px-24">
    <div class="flex gap-2 pt-10 items-center justify-between">
      <ul class="flex gap-8 overflow-x-scroll">
        <li
          v-for="(genre, index) in 50"
          :key="index"
          class="text-custom-light-gray text-sm font-semibold"
        >
          {{ genre }}
        </li>
      </ul>
      <SliderArrow />
      <button
        class="flex gap-2 items-center border border-custom-light-gray border-opacity-60 py-2 px-4 rounded-xl"
      >
        <Filter />
        <span class="text-sm text-custom-light-gray">Filter</span>
      </button>
    </div>
    <div class="grid grid-cols-3 justify-between mt-12 gap-8">
      <!-- Just for testing till I get data from back-end -->
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <div class="flex items-center justify-center mt-12 mb-24">
      <button
        class="bg-[#4B69FD] bg-opacity-10 py-3 px-5 rounded-lg text-custom-blue font-semibold flex gap-2 items-center"
      >
        <ArrowDown />
        <span> Load more </span>
      </button>
    </div>
  </div>
  <Footer :customClass="'border-t border-border border-border-gray'" />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SliderArrow from '@/components/icons/SliderArrow.vue'
import Filter from '@/components/icons/Filter.vue'
import resetImage from '@/assets/imgs/sessions/reset.png'
import Card from '@/components/Card.vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'

export default {
  components: {
    Header,
    Footer,
    SliderArrow,
    Filter,
    Card,
    ArrowDown
  },
  data() {
    return {
      resetImage
    }
  }
}
</script>
