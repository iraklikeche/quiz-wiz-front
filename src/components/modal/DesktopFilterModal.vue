<template>
  <div
    class="absolute right-0 z-50 p-4 bg-white shadow-lg border-2 border-black rounded-xl min-w-[64rem]"
  >
    <div class="bg-[#D0D5DD] bg-opacity-20 flex items-center w-full rounded-xl p-4">
      <button class="bg-black py-2 px-6 text-white rounded-xl mr-4 text-sm">Filter</button>
      <div class="flex-grow relative min-w-[38rem]">
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2">
          <Search />
        </div>
        <div class="flex items-center border rounded-xl mr-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="outline-none pl-8 py-2 rounded-full w-full bg-white bg-transparent"
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2" v-if="false">
          <button class="bg-[#4B69FD] px-8 py-2 text-white rounded-xl text-sm font-semibold">
            Confirm
          </button>
          <div class="border-r h-4 w-2 border-border-gray"></div>
          <button class="flex gap-4 items-center text-custom-light-gray text-sm">
            Reset all filter
          </button>
        </div>
        <Close class="cursor-pointer" />
      </div>
    </div>
    <div class="grid grid-cols-[70fr_30fr] gap-2">
      <div class="border border-border-gray rounded-xl">
        <div class="p-4">
          <p class="text-custom-blue font-semibold text-sm">Filter by</p>
          <div class="flex items-center my-4 gap-2">
            <label for="my-quizzes" class="text-[#101828] font-semibold">My quizzes</label>
            <input id="my-quizzes" type="checkbox" class="mr-2 scale-125" />
          </div>

          <div class="flex items-center mb-4 gap-2">
            <label for="not-completed" class="text-[#101828] font-semibold">Not completed</label>
            <input id="not-completed" type="checkbox" class="mr-2 scale-125" />
          </div>
          <!-- LEVELS -->
          <div class="my-4">
            <p class="text-sm font-semibold border-t border-border-gray pt-4">Levels</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <button class="bg-blue-200 py-2 px-6 rounded-3xl">Starter</button>
              <button class="bg-blue-200 py-2 px-6 rounded-3xl">Beginner</button>
            </div>
          </div>
          <!-- CATEGORIES -->
          <div>
            <p class="text-sm font-semibold border-t border-border-gray pt-4">Categories</p>
            <div class="flex flex-wrap gap-2 mt-2 font-semibold text-custom-gray">
              <button class="py-1 px-3 rounded">Geography</button>
              <button class="py-1 px-3 rounded">Geography</button>
              <button class="py-2 bg-black text-white rounded-full px-4">Geography</button>
              <button class="py-1 px-3 rounded">Geography</button>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-border-gray rounded-xl p-4">
        <p class="text-custom-blue font-semibold text-sm">Sort by</p>
        <SortList class="flex flex-col gap-4 justify-center mt-4 pl-3" />
      </div>
    </div>
  </div>
</template>

<script>
import SortList from '@/components/modal/SortList.vue'
import Close from '../icons/Close.vue'
import Search from '../icons/Search.vue'

export default {
  components: {
    SortList,
    Search,
    Close
  },
  data() {
    return {
      showModal: false,
      search: ''
    }
  }
}
</script>
