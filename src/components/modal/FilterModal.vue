<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    :modalContentClasses="'bg-white rounded-lg shadow-lg w-full h-full'"
    class="fixed sm:absolute sm:w-[66rem] inset-0 z-[1000] sm:bottom-auto sm:left-[17.5%] sm:border-2 sm:rounded-xl sm:border-border-gray sm:bg-white sm:pt-2 overflow-y-scroll sm:overflow-auto"
  >
    <div
      class="sm:hidden text-sm font-semibold text-custom-gray flex justify-between items-center bg-[#D0D5DD] p-6 bg-opacity-20"
    >
      <button @click="resetFilters">Reset</button>
      <button class="uppercase">Filters</button>
      <CloseModalBtn @click="close" />
    </div>

    <div class="bg-white relative py-2 border-y border-border-gray sm:px-4 sm:border-0">
      <div
        class="sm:bg-[#D0D5DD] sm:bg-opacity-30 sm:rounded-xl sm:flex items-center sm:px-4 sm:py-4 sm:gap-6"
      >
        <button
          class="hidden sm:block bg-black py-2 px-6 text-white rounded-xl mr-4 sm:mr-0 text-sm"
        >
          Filter
        </button>
        <div class="absolute left-6 sm:left-40 top-1/2 transform -translate-y-1/2">
          <Search />
        </div>
        <div class="flex sm:w-full items-center px-4 sm:bg-white sm:rounded-3xl">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="outline-none pl-8 py-2 rounded-xl bg-transparent sm:w-full"
          />
        </div>
        <div class="flex items-center gap-2">
          <div class="sm:flex items-center gap-2 hidden" v-if="isFilterSelected">
            <button
              class="bg-[#4B69FD] px-8 py-2 text-white rounded-xl text-sm font-semibold"
              @click="confirmFilters"
            >
              Confirm
            </button>
            <div class="border-r h-4 w-2 border-border-gray"></div>
            <button class="text-custom-light-gray text-sm whitespace-nowrap" @click="resetFilters">
              Reset all filter
            </button>
          </div>
          <div class="hidden sm:block cursor-pointer">
            <CloseModalBtn @click="close" class="w-3" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 px-4 sm:hidden">
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

    <div class="sm:px-4 sm:grid grid-cols-[70fr_30fr] gap-2">
      <div
        v-if="activeButton === 'filter'"
        class="sm:border border-border-gray sm:rounded-xl sm:pb-8 sm:mb-12"
      >
        <p class="hidden sm:block px-6 mt-4 text-custom-blue font-bol">Filter by</p>
        <div v-if="isLogged" class="flex items-center mb-8 sm:mb-4 mt-12 sm:mt-4 px-6 gap-2">
          <label for="my-quizzes" class="text-[#101828] font-semibold">My quizzes</label>
          <input
            id="my-quizzes"
            type="checkbox"
            class="mr-2 scale-125"
            v-model="isMyQuizzesChecked"
          />
        </div>

        <div v-if="isLogged" class="flex items-center mb-4 px-6 gap-2">
          <label for="not-completed" class="text-[#101828] font-semibold">Not completed</label>
          <input
            id="not-completed"
            type="checkbox"
            class="mr-2 scale-125"
            v-model="isNotCompletedChecked"
          />
        </div>

        <!-- *********************** LEVELS ******************************** -->
        <div class="my-4 px-6">
          <p class="text-sm font-semibold border-t border-border-gray pt-4">Levels</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <button
              class="py-2 px-6 rounded-3xl font-semibold"
              v-for="level in filteredCategoriesAndLevels.filteredDiffLevels"
              :key="level.id"
              :style="
                isSelected(level.id, 'selectedDifficulties')
                  ? {
                      color: 'white',
                      background: level.textColor
                    }
                  : {
                      color: level.textColor,
                      background: level.backgroundColor
                    }
              "
              @click="toggleSelection(level.id, 'selectedDifficulties')"
            >
              {{ level.name }}
            </button>
          </div>
        </div>
        <!-- ******************** CATEGORIES  ************************* -->
        <div class="px-6 bg-white sm:bg-transparent">
          <p class="text-sm font-semibold border-t border-border-gray pt-4">Categories</p>
          <div class="flex flex-wrap gap-2 mt-2 font-semibold text-custom-gray">
            <button
              class="px-4 py-2 font-semibold"
              v-for="category in filteredCategoriesAndLevels.filteredCategories"
              :key="category.id"
              :class="{
                'bg-transparent': !isSelected(category.id, 'selectedCategories'),
                'bg-black text-white rounded-full': isSelected(category.id, 'selectedCategories')
              }"
              @click="toggleSelection(category.id, 'selectedCategories')"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="sm:hidden">
        <SortList class="flex flex-col gap-8 px-6 mt-12 justify-center" />
      </div>
      <div class="sm:border border-border-gray sm:rounded-xl sm:pb-8 sm:mb-12 hidden sm:block">
        <SortList
          ref="sortListRef"
          class="flex flex-col gap-8 px-6 mt-12 justify-center"
          @update:sort="selectedSort = $event"
        />
      </div>
    </div>
    <div
      class="sm:hidden bg-white py-4 shadow-2xl px-4 flex gap-4 items-center"
      v-if="isFilterSelected"
    >
      <button
        class="bg-[#4B69FD] px-8 py-3 text-white rounded-lg text-sm font-semibold flex-1"
        @click="confirmFilters"
      >
        Confirm
      </button>
      <button
        @click="resetFilters"
        class="text-custom-gray border border-border-gray px-8 py-3 rounded-lg font-bold text-sm"
      >
        Cancel
      </button>
    </div>
    {{ parentSelectedCategories }}
    {{ selectedCategories }}
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
    showModal: Boolean,
    categories: Array,
    diffLevels: Array,
    parentSelectedCategories: Array
  },
  emits: ['update:show', 'update:activeButton', 'apply-filters'],

  data() {
    return {
      activeButton: 'filter',
      search: '',
      isFocused: false,
      selectedCategories: [...this.parentSelectedCategories],
      tempSelectedCategories: [],
      selectedDifficulties: [],
      isLogged: false,
      selectedSort: '',
      isMyQuizzesChecked: false,
      isNotCompletedChecked: false,
      showFilterConfirmation: false
    }
  },
  mounted() {
    this.initialLoginCheck()
  },
  computed: {
    filteredCategoriesAndLevels() {
      const searchLower = this.search.toLowerCase()
      return {
        filteredCategories: this.categories.filter((category) =>
          category.name.toLowerCase().includes(searchLower)
        ),
        filteredDiffLevels: this.diffLevels.filter((level) =>
          level.name.toLowerCase().includes(searchLower)
        )
      }
    },
    isFilterSelected() {
      return (
        this.selectedCategories.length > 0 ||
        this.selectedDifficulties.length > 0 ||
        this.selectedSort !== '' ||
        this.isMyQuizzesChecked ||
        this.isNotCompletedChecked
      )
    }
  },

  methods: {
    resetFilters() {
      this.selectedCategories = []
      this.selectedDifficulties = []
      this.selectedSort = ''
      this.isMyQuizzesChecked = false
      this.isNotCompletedChecked = false
      this.$refs.sortListRef.resetSort()
    },
    initialLoginCheck() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        this.isLogged = true
      }
    },
    toggleSelection(itemId, selectedArray) {
      const itemString = itemId.toString()
      const index = this[selectedArray].indexOf(itemString)
      if (index > -1) {
        this[selectedArray].splice(index, 1)
      } else {
        this[selectedArray].push(itemString)
      }
    },

    isSelected(itemId, selectedArray) {
      return this[selectedArray].includes(itemId.toString())
    },

    setActiveButton(button) {
      this.activeButton = button
      this.$emit('update:activeButton', button)
    },
    close() {
      this.$emit('update:show', false)
    },

    confirmFilters() {
      this.$emit('apply-filters', {
        categories: this.selectedCategories,
        difficulties: this.selectedDifficulties,
        sort: this.selectedSort.toLowerCase(),
        my_quizzes: this.isMyQuizzesChecked,
        not_completed: this.isNotCompletedChecked
      })
      this.close()
    }
  },
  watch: {
    selectedSort(newVal) {
      this.sort = newVal
    },
    parentSelectedCategories(newVal) {
      this.selectedCategories = [...newVal]
    }
  }
}
</script>
