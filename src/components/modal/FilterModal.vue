<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    :modalContentClasses="'bg-white rounded-lg shadow-lg w-full h-full'"
  >
    <div
      class="text-sm font-semibold text-custom-gray flex justify-between items-center bg-[#D0D5DD] p-6 bg-opacity-20"
    >
      <button>Reset</button>
      <button class="uppercase">Filters</button>
      <CloseModalBtn @click="close" />
    </div>

    <div class="bg-white relative py-2 border-y border-border-gray">
      <div class="absolute left-6 top-1/2 transform -translate-y-1/2">
        <Search />
      </div>
      <div class="flex items-center px-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="outline-none pl-8 py-2 rounded-xl bg-transparent w-32 transition-all duration-300 focus:w-[10rem] sm:focus:w-[21.5rem]"
        />
      </div>
    </div>

    <div class="mt-4 px-4">
      <div class="bg-[#D0D5DD] bg-opacity-50 rounded-full grid grid-cols-2 font-semibold">
        <button
          class="py-3 px-12 rounded-full"
          :class="{
            'border border-border-gray text-custom-blue bg-white': activeButton === 'filter',
            'opacity-60': activeButton !== 'filter'
          }"
          @click="setActiveButton('filter')"
        >
          Filter
        </button>
        <button
          class="py-3 px-12 rounded-full"
          :class="{
            'border border-border-gray text-custom-blue bg-white': activeButton === 'sorting',
            'opacity-60': activeButton !== 'sorting'
          }"
          @click="setActiveButton('sorting')"
        >
          Sorting
        </button>
      </div>
    </div>

    <div v-if="activeButton === 'filter'">
      <div class="flex items-center mb-8 mt-12 px-6 gap-2">
        <label for="my-quizzes" class="text-[#101828] font-semibold">My quizzes</label>
        <input id="my-quizzes" type="checkbox" class="mr-2 scale-125" />
      </div>

      <div class="flex items-center mb-4 px-6 gap-2">
        <label for="not-completed" class="text-[#101828] font-semibold">Not completed</label>
        <input id="not-completed" type="checkbox" class="mr-2 scale-125" />
      </div>

      <!-- *********************** LEVELS ******************************** -->
      <div class="my-4 px-6">
        <p class="text-sm font-semibold border-t border-border-gray pt-4">Levels</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <button class="bg-blue-200 py-2 px-6 rounded-3xl">Starter</button>
          <button class="bg-blue-200 py-2 px-6 rounded-3xl">Beginner</button>
        </div>
      </div>
      <!-- ******************** CATEGORIES  ************************* -->
      <div class="px-6">
        <p class="text-sm font-semibold border-t border-border-gray pt-4">Categories</p>
        <div class="flex flex-wrap gap-2 mt-2 font-semibold text-custom-gray">
          <button class="py-1 px-3 rounded">Geography</button>
          <button class="py-1 px-3 rounded">Geography</button>
          <button class="py-2 bg-black text-white rounded-full px-4">Geography</button>
          <button class="py-1 px-3 rounded">Geography</button>
        </div>
      </div>
    </div>
    <div v-else>
      <SortList class="flex flex-col gap-8 px-6 mt-12 justify-center" />
    </div>
  </TheModal>
</template>

<script>
import TheModal from './TheModal.vue'
import CloseModalBtn from '../icons/CloseModalBtn.vue'
import Search from '../icons/Search.vue'
import SortList from './SortList.vue'

export default {
  components: {
    TheModal,
    CloseModalBtn,
    Search,
    SortList
  },
  props: {
    showModal: Boolean
  },
  emits: ['update:show', 'update:activeButton'],
  data() {
    return {
      activeButton: 'filter',
      search: '',
      isFocused: false
    }
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button
      this.$emit('update:activeButton', button)
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
