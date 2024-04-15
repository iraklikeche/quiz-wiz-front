<template>
  <TheModal
    :name="'fade-in'"
    :show="showModal"
    :modalContentClasses="'bg-white rounded-lg shadow-lg w-full min-h-[40rem]'"
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
          <div class="sm:flex items-center gap-2 hidden" v-if="localChangesMade">
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

    <div class="sm:px-4 sm:grid grid-cols-[60fr_40fr] gap-2 h-full">
      <div
        v-if="activeButton === 'filter'"
        class="sm:border border-border-gray sm:rounded-xl min-h-[34rem]"
      >
        <p class="hidden sm:block px-6 mt-4 text-custom-blue font-bold">Filter by</p>
        <div v-if="isLogged" class="flex items-center mb-8 sm:mb-4 mt-12 sm:mt-4 px-6 gap-2">
          <label for="my-quizzes" class="text-[#101828] font-semibold">My quizzes</label>
          <input
            id="my-quizzes"
            type="checkbox"
            class="mr-2 scale-125"
            v-model="filterState.myQuizzesChecked.current"
            @change="checkLocalChanges"
          />
        </div>

        <div v-if="isLogged" class="flex items-center mb-4 px-6 gap-2">
          <label for="not-completed" class="text-[#101828] font-semibold">Not completed</label>
          <input
            id="not-completed"
            type="checkbox"
            class="mr-2 scale-125"
            v-model="filterState.notCompletedChecked.current"
            @change="checkLocalChanges"
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
                isSelected(level.id, 'difficulties')
                  ? {
                      color: 'white',
                      background: level.textColor
                    }
                  : {
                      color: level.textColor,
                      background: level.backgroundColor
                    }
              "
              @click="toggleSelection(level.id, 'difficulties')"
            >
              {{ level.name }}
            </button>
          </div>
        </div>
        <!-- ******************** CATEGORIES  ************************* -->
        <div class="px-6 bg-white sm:bg-transparent pb-6">
          <p class="text-sm font-semibold border-t border-border-gray pt-4">Categories</p>
          <div class="flex flex-wrap gap-2 mt-2 font-semibold text-custom-gray">
            <button
              class="px-4 py-2 font-semibold"
              v-for="category in filteredCategoriesAndLevels.filteredCategories"
              :key="category.id"
              :class="{
                'bg-transparent': !isSelected(category.id, 'categories'),
                'bg-black text-white rounded-full': isSelected(category.id, 'categories')
              }"
              @click="toggleSelection(category.id, 'categories')"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="sm:hidden">
        <SortList
          class="flex flex-col gap-8 px-6 mt-12 justify-center"
          :currentSort="filterState.sort.current"
          ref="sortListRef"
          @update:sort="handleSortChange"
        />
      </div>
      <div class="sm:border border-border-gray sm:rounded-xl sm:pb-8 hidden sm:block">
        <p class="hidden sm:block px-6 mt-4 text-custom-blue font-bold">Sort by</p>
        <SortList
          :currentSort="filterState.sort.current"
          ref="sortListRef"
          @update:sort="handleSortChange"
          class="flex flex-col gap-4 px-4 mt-4 pl-8 justify-center"
        />
      </div>
    </div>
    <div
      class="sm:hidden bg-white py-4 shadow-2xl px-4 flex gap-4 items-center"
      v-if="localChangesMade"
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
  emits: [
    'update:show',
    'update:activeButton',
    'apply-filters',
    'reset-filters',
    'update-selected-categories-count'
  ],

  data() {
    return {
      activeButton: 'filter',
      search: '',
      isFocused: false,
      isLogged: false,

      filterState: {
        categories: {
          current: [...this.parentSelectedCategories],
          confirmed: [...this.parentSelectedCategories]
        },
        difficulties: { current: [], confirmed: [] },
        sort: { current: '', confirmed: '' },
        myQuizzesChecked: { current: false, confirmed: false },
        notCompletedChecked: { current: false, confirmed: false }
      },

      showFilterConfirmation: false,
      localChangesMade: false
    }
  },
  mounted() {
    this.initialLoginCheck()
    this.checkLocalChanges()
    console.log(this.filterState)
    // this.setInitialStateFromUrl()
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
        this.filterState.categories.current.length > 0 ||
        this.filterState.difficulties.current.length > 0 ||
        this.filterState.sort.current !== '' ||
        this.filterState.myQuizzesChecked.current ||
        this.filterState.notCompletedChecked.current
      )
    }
  },

  methods: {
    setInitialStateFromQueryParams(queryParams) {
      // this.filterState.categories.current = queryParams.categories
      //   ? queryParams.categories.split(',')
      //   : []
      // this.filterState.difficulties.current = queryParams.difficulties
      //   ? queryParams.difficulties.split(',')
      //   : []
      // this.filterState.sort.current = queryParams.sort || ''
      // this.filterState.myQuizzesChecked.current = queryParams.my_quizzes === 'true'
      // this.filterState.notCompletedChecked.current = queryParams.not_completed === 'true'
      this.filterState.categories.current = queryParams.categories
        ? queryParams.categories.split(',')
        : []
      this.filterState.categories.confirmed = [...this.filterState.categories.current]

      // Difficulties
      this.filterState.difficulties.current = queryParams.difficulties
        ? queryParams.difficulties.split(',')
        : []
      this.filterState.difficulties.confirmed = [...this.filterState.difficulties.current]

      // Sort
      this.filterState.sort.current = queryParams.sort || ''
      this.filterState.sort.confirmed = this.filterState.sort.current

      // My Quizzes Checked
      this.filterState.myQuizzesChecked.current = queryParams.my_quizzes === 'true'
      this.filterState.myQuizzesChecked.confirmed = this.filterState.myQuizzesChecked.current

      // Not Completed Checked
      this.filterState.notCompletedChecked.current = queryParams.not_completed === 'true'
      this.filterState.notCompletedChecked.confirmed = this.filterState.notCompletedChecked.current
      console.log(this.filterState)

      this.checkLocalChanges()
    },

    // setInitialStateFromUrl() {
    //   const urlParams = new URLSearchParams(window.location.search)
    //   this.filterState.categories.current = urlParams.get('categories')
    //     ? urlParams.get('categories').split(',')
    //     : [...this.parentSelectedCategories]
    //   this.filterState.difficulties.current = urlParams.get('difficulties')
    //     ? urlParams.get('difficulties').split(',')
    //     : []
    //   this.filterState.sort.current = urlParams.get('sort') || ''
    //   this.filterState.myQuizzesChecked.current = urlParams.get('my_quizzes') === 'true'
    //   this.filterState.notCompletedChecked.current = urlParams.get('not_completed') === 'true'
    // },

    initializeFilterStatesFromConfirmed() {
      Object.keys(this.filterState).forEach((key) => {
        if (Array.isArray(this.filterState[key].current)) {
          this.filterState[key].current = [...this.filterState[key].confirmed]
        } else {
          this.filterState[key].current = this.filterState[key].confirmed
        }
      })
    },

    checkLocalChanges() {
      this.localChangesMade = Object.values(this.filterState).some(
        (state) => JSON.stringify(state.current) !== JSON.stringify(state.confirmed)
      )
    },

    hardReset() {
      this.filterState = {
        categories: {
          current: [],
          confirmed: []
        },
        difficulties: { current: [], confirmed: [] },
        sort: { current: '', confirmed: '' },
        myQuizzesChecked: { current: false, confirmed: false },
        notCompletedChecked: { current: false, confirmed: false }
      }

      this.search = ''

      this.checkLocalChanges()
    },

    resetFilters() {
      this.initializeFilterStatesFromConfirmed()
      this.checkLocalChanges()
    },

    confirmFilters() {
      Object.keys(this.filterState).forEach((key) => {
        if (Array.isArray(this.filterState[key].current)) {
          this.filterState[key].confirmed = [...this.filterState[key].current]
        } else {
          this.filterState[key].confirmed = this.filterState[key].current
        }
      })

      // const totalSelections =
      // this.filterState.categories.current.length +
      // this.filterState.difficulties.current.length +
      // (this.filterState.sort.current ? 1 : 0) +
      // (this.filterState.myQuizzesChecked.current ? 1 : 0) +
      // (this.filterState.notCompletedChecked.current ? 1 : 0)

      this.$emit('apply-filters', {
        categories: this.filterState.categories.current,
        difficulties: this.filterState.difficulties.current,
        sort: this.filterState.sort.current,
        myQuizzes: this.filterState.myQuizzesChecked.current,
        notCompleted: this.filterState.notCompletedChecked.current
      })
      this.localChangesMade = false
      // this.$emit('update-selected-categories-count', )

      this.close()
    },
    initialLoginCheck() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        this.isLogged = true
      }
    },

    toggleSelection(itemId, selectedArray) {
      const index = this.filterState[selectedArray].current.indexOf(itemId.toString())
      if (index > -1) {
        this.filterState[selectedArray].current.splice(index, 1)
      } else {
        this.filterState[selectedArray].current.push(itemId.toString())
      }
      this.checkLocalChanges()
    },

    handleSortChange(newSortValue) {
      this.filterState.sort.current = newSortValue

      this.checkLocalChanges()
    },

    // toggleMyQuizzes() {
    //   this.filterState.myQuizzesChecked.current = !this.filterState.myQuizzesChecked.current
    //   this.checkLocalChanges()
    //   console.log(this.filterState.myQuizzesChecked.current)
    // },

    // toggleNotCompleted() {
    //   this.filterState.notCompletedChecked.current = !this.filterState.notCompletedChecked.current
    //   this.checkLocalChanges()
    //   console.log(this.filterState.notCompletedChecked.current)
    // },

    isSelected(itemId, selectedArray) {
      if (this.filterState[selectedArray]) {
        if (Array.isArray(this.filterState[selectedArray].current)) {
          return this.filterState[selectedArray].current.includes(itemId.toString())
        } else {
          return this.filterState[selectedArray].current
        }
      }
      console.error(`Key ${selectedArray} does not exist in filterState.`)
      return false
    },
    setActiveButton(button) {
      this.activeButton = button
      this.$emit('update:activeButton', button)
    },
    close() {
      this.$emit('update:show', false)
    }
  },
  watch: {
    parentSelectedCategories: {
      handler(newVal) {
        this.filterState.categories.current = [...newVal]
        this.filterState.categories.confirmed = [...newVal]
      },
      deep: true,
      immediate: true
    },
    isMyQuizzesChecked() {
      this.checkLocalChanges()
    },
    isNotCompletedChecked() {
      this.checkLocalChanges()
    },
    showModal(newValue) {
      if (newValue) {
        this.initializeFilterStatesFromConfirmed()
      }
    },
    'filterState.difficulties'(val) {
      console.log(val)
    }
  }
}
</script>
