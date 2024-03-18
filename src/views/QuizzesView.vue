<template>
  <Header>
    <div class="relative bg-[#f9fafb] rounded-xl">
      <div class="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Search />
      </div>
      <div class="flex items-center border rounded-xl">
        <input
          type="text"
          placeholder="Search"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="outline-none pl-8 py-2 rounded-xl bg-transparent w-32 transition-all duration-300 focus:w-[21.5rem]"
        />
        <button
          class="bg-white py-[0.9rem] px-4 rounded-r-xl border-l"
          @click="closeInput"
          v-show="isFocused"
        >
          <Close />
        </button>
      </div>
    </div>
  </Header>
  <div class="px-24">
    <div class="flex gap-2 pt-10 items-center justify-between">
      <button @click="scrollLeft" class="rotate-180 flex items-center justify-center pt-2">
        <SliderArrow />
      </button>
      <ul class="flex gap-8 overflow-hidden border-b border-gray-300" ref="scrollContainer">
        <li
          v-for="(genre, index) in genres"
          :key="index"
          class="text-custom-light-gray text-sm font-semibold cursor-pointer pb-2"
          :class="{
            'border-b-2': true,
            'border-transparent': !isSelected(genre),
            'border-black': isSelected(genre)
          }"
          @click="toggleSelection(genre)"
        >
          {{ genre }}
        </li>
      </ul>

      <button @click="scrollRight" class="pb-2">
        <SliderArrow />
      </button>

      <div class="pb-2">
        <button
          class="group flex gap-2 items-center border border-custom-light-gray border-opacity-60 py-2 px-4 rounded-xl hover:bg-[#4B69FD] hover:bg-opacity-10 hover:scale-105 hover:border-custom-blue"
        >
          <Filter />
          <span class="text-sm text-custom-light-gray group-hover:text-custom-blue">Filter</span>
        </button>
      </div>
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
import Search from '@/components/icons/Search.vue'
import Close from '@/components/icons/Close.vue'

export default {
  components: {
    Header,
    Footer,
    SliderArrow,
    Filter,
    Card,
    ArrowDown,
    Search,
    Close
  },
  data() {
    const genres = Array.from({ length: 50 }, (_, i) => `${i + 1}`)
    return {
      resetImage,
      genres: genres,
      selectedItems: [genres[0]],
      isFocused: false,
      scrollAmount: 0
    }
  },
  methods: {
    closeInput() {
      console.log('Button is Clicked')
    },
    toggleSelection(genre) {
      const index = this.selectedItems.indexOf(genre)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      } else {
        this.selectedItems.push(genre)
      }
    },
    isSelected(genre) {
      return this.selectedItems.includes(genre)
    },
    scrollLeft() {
      this.scroll(-100)
    },
    scrollRight() {
      this.scroll(100)
    },
    scroll(amount) {
      const container = this.$refs.scrollContainer
      if (container) {
        container.scrollLeft += amount
      }
    }
  }
}
</script>
