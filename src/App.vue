<script></script>

<template>
  <RouterView />
</template>

<!-- QUIZZESVIEW -->
<!-- 

  <template>
  <Header :isFocused="isFocused">
    <div class="relative bg-[#f9fafb] rounded-xl">
      <div class="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Search />
      </div>
      <div class="flex items-center border rounded-xl">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="outline-none pl-8 py-2 rounded-xl bg-transparent w-32 transition-all duration-300 focus:w-[21rem] sm:focus:w-[21.5rem]"
        />
        <button
          class="bg-white py-[0.9rem] px-4 rounded-r-xl border-l"
          @mousedown="closeInput"
          v-show="isFocused"
        >
          <Close />
        </button>
      </div>
    </div>
  </Header>
  <div class="sm:px-20">
    <div class="sm:flex items-center">
      <div class="flex flex-grow gap-2 pt-10 items-center">
        <button
          @click="scrollLeft"
          class="rotate-180 items-center justify-center pt-2 hidden sm:flex"
        >
          <SliderArrow />
        </button>
        <ul
          class="flex items-center gap-8 overflow-hidden border-b border-gray-300 max-w-[26rem] sm:max-w-[71rem] overflow-x-scroll sm:overflow-x-auto px-4"
          ref="scrollContainer"
        >
          <li
            class="text-custom-light-gray text-sm font-semibold cursor-pointer pb-2 whitespace-nowrap"
            :class="{
              'border-b-2': true,
              'border-transparent': !allQuizzesSelected,
              'border-black': allQuizzesSelected
            }"
            @click="removeAllQueriesFromUrl"
          >
            All Quizzes
          </li>
          <li
            class="text-custom-light-gray text-sm font-semibold cursor-pointer pb-2"
            v-for="category in categories"
            :key="category.id"
            :class="categoryClasses(category.id)"
            @click="toggleSelection(category.id)"
          >
            {{ category.name }}
          </li>
        </ul>

        <button @click="scrollRight" class="pb-2 hidden sm:block">
          <SliderArrow />
        </button>
      </div>
      <div class="mt-4 sm:mt-0 px-2 sm:px-0 sm:pt-8 relative">
        <button
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
          @click="toggleModal"
          class="group flex gap-2 items-center border border-custom-light-gray border-opacity-60 py-2 px-4 rounded-xl hover:bg-[#4B69FD] hover:bg-opacity-10 hover:scale-105 hover:border-custom-blue"
          :style="{ border: selectedCategoriesCount > 0 ? '2px solid #000' : undefined }"
        >
          <Filter
            class="group-hover:text-[#4B69FD]"
            :style="{ color: selectedCategoriesCount > 0 ? '#000' : undefined }"
          />
          <span
            class="text-sm text-custom-light-gray group-hover:text-custom-blue"
            :style="{ color: selectedCategoriesCount > 0 ? '#000' : undefined }"
            >Filter</span
          >
        </button>
        <div
          class="absolute bottom-1/2 sm:top-[30%] sm:right-1 left-16 translate-x-1/2 py-1 pl-1 rounded-full"
          :class="{ 'bg-white': selectedCategoriesCount > 0 }"
        >
          <span
            v-if="selectedCategoriesCount > 0"
            class="font-bold text-white text-xs bg-black w-1 h-1 p-3 rounded-full flex items-center justify-center"
          >
            {{ selectedCategoriesCount }}</span
          >
        </div>
      </div>
    </div>

    <div class="relative">
      <FilterModal
        ref="filterModal"
        :showModal="showModal"
        @update:show="showModal = $event"
        @update:activeButton="handleActiveButtonChange($event)"
        @close-modal="showModal = false"
        :categories="categories"
        :diffLevels="difficultyLevels"
        @apply-filters="handleFilterApply"
        :parentSelectedCategories="selectedCategories"
        @resetAllFilters="resetFiltersInModal"
        @update-selected-categories-count="updateSelectedCategoriesCount($event)"
        @initial-state="setInitialState"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 justify-between mt-12 gap-20 sm:gap-8 px-4 sm:px-0">
      <RouterLink
        :to="{ name: 'quiz', params: { id: quiz.id } }"
        v-for="quiz in quizzes"
        :key="quiz.id"
      >
        <Card :quiz="quiz" />
      </RouterLink>
    </div>
    <div class="flex items-center justify-center mt-12 mb-24">
      <button
        v-if="pagination.currentPage < pagination.lastPage"
        @click="loadMoreQuizzes"
        class="bg-[#4B69FD] bg-opacity-10 py-3 px-5 rounded-lg text-custom-blue font-semibold flex gap-2 items-center"
      >
        <ArrowDown />
        <span> Load more </span>
      </button>
    </div>
  </div>

  <Footer :customClass="'border-t border-border-gray pt-8 '" />
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
import FilterModal from '@/components/modal/FilterModal.vue'
import { getQuizzes, getAllCategories, getAllDifficultyLevels } from '@/services/quizService.js'

export default {
  components: {
    FilterModal,
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
    return {
      resetImage,
      allQuizzesSelected: true,
      selectedItems: [],
      isFocused: false,
      scrollAmount: 0,
      searchQuery: '',
      selectedCategories: [],

      showModal: false,
      activeButton: 'filter',
      quizzes: [],
      pagination: {
        currentPage: 1,
        lastPage: null
      },
      debouncedSearch: null,
      categories: null,
      difficultyLevels: null,
      selectedCategoriesCount: 0,
      isHovering: false
    }
  },
  created() {
    this.debouncedSearch = this.debounce(this.getQuizzesData, 500)
    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search
      this.getQuizzesData(this.searchQuery)
    }
  },
  mounted() {
    this.getInitialData()
    this.updateSelectedCategoriesCountFromUrl()

    document.addEventListener('click', this.handleClickOutside)

    let queryParams = { ...this.$route.query }

    this.selectedCategories = queryParams.categories ? queryParams.categories.split(',') : []
    this.selectedDifficulties = queryParams.difficulties ? queryParams.difficulties.split(',') : []
    this.selectedSort = queryParams.sort || ''
    this.isMyQuizzesChecked = queryParams.my_quizzes === 'true'
    this.isNotCompletedChecked = queryParams.not_completed === 'true'
    this.allQuizzesSelected = this.selectedCategories.length === 0

    this.applyFilters(queryParams)
    const savedCount = localStorage.getItem('selectedCategoriesCount')
    if (savedCount !== null) {
      this.selectedCategoriesCount = parseInt(savedCount, 10)
    }
    this.setInitialState(queryParams)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    setInitialState(queryParams) {
      this.$refs.filterModal.setInitialStateFromQueryParams(queryParams)
    },
    updateSelectedCategoriesCountFromUrl() {
      const urlParams = new URLSearchParams(window.location.search)
      const categories = urlParams.get('categories') ? urlParams.get('categories').split(',') : []
      const difficulties = urlParams.get('difficulties')
        ? urlParams.get('difficulties').split(',')
        : []
      const sort = urlParams.get('sort') ? 1 : 0
      const myQuizzes = urlParams.get('my_quizzes') === 'true' ? 1 : 0
      const notCompleted = urlParams.get('not_completed') === 'true' ? 1 : 0

      const totalSelectedCount =
        categories.length + difficulties.length + sort + myQuizzes + notCompleted
      this.selectedCategoriesCount = totalSelectedCount
    },
    updateSelectedCategoriesCount(count) {
      localStorage.setItem('selectedCategoriesCount', count)

      this.selectedCategoriesCount = count
    },
    handleClickOutside(e) {
      if (this.$refs.filterModal && !this.$refs.filterModal.$el.contains(e.target)) {
        this.showModal = false
      }
    },
    resetFiltersInModal() {
      if (this.$refs.filterModal) {
        this.$refs.filterModal.resetFilters()
      }
    },
    toggleModal(e) {
      e.stopPropagation()
      this.showModal = !this.showModal
    },

    applyFilters(filters = {}) {
      const ensureArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])

      let categories = ensureArray(filters.categories)
      let difficulties = ensureArray(filters.difficulties)

      let queryParams = {
        ...(categories.length && { categories: categories.join(',') }),
        ...(difficulties.length && { difficulties: difficulties.join(',') }),
        ...(filters.sort && { sort: filters.sort }),
        ...{ not_completed: filters.notCompleted },
        ...{ my_quizzes: filters.notCompleted }
        // ...(typeof filters.my_quizzes !== 'undefined' && { my_quizzes: filters.my_quizzes }),
        // ...(typeof filters.not_completed !== 'undefined' && {
        //   not_completed: filters.not_completed
        // })
      }

      this.$router.push({ query: queryParams }).catch((err) => {})
      this.getQuizzesData(queryParams)
    },

    async getQuizzesData(filters = {}, isLoadMore = false) {
      if (!isLoadMore) {
        this.quizzes = []
        this.pagination.currentPage = 1
      } else {
        filters = { ...filters, page: this.pagination.currentPage + 1 }
      }
      filters = { ...filters, page: this.pagination.currentPage }

      let queryString = Object.keys(filters)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
        .join('&')

      let url = `/api/quizzes?${queryString}`

      try {
        const res = await getQuizzes(url)

        if (isLoadMore) {
          res.data.data.forEach((quiz) => this.quizzes.push(quiz))
        } else {
          this.quizzes = res.data.data
        }

        this.pagination = {
          ...this.pagination,
          currentPage: res.data.meta.current_page,
          lastPage: res.data.meta.last_page
        }
      } catch (err) {
        console.error('Failed to fetch quizzes:', err)
      }
    },

    loadMoreQuizzes() {
      if (this.pagination.currentPage < this.pagination.lastPage) {
        this.pagination.currentPage += 1
        this.getQuizzesData({}, true)
      }
    },

    removeAllQueriesFromUrl() {
      this.$router.replace({ query: {} }).then(() => {
        this.selectedCategories = []
        this.getQuizzesData()
        if (this.$refs.filterModal) {
          this.$refs.filterModal.hardReset()
        }
      })
      this.allQuizzesSelected = true
      this.selectedCategoriesCount = 0
      localStorage.removeItem('selectedCategoriesCount')
    },

    async getInitialData() {
      try {
        const [categoriesResponse, difficultyLevelsResponse] = await Promise.all([
          getAllCategories(),
          getAllDifficultyLevels()
        ])
        this.categories = categoriesResponse.data.data
        this.difficultyLevels = difficultyLevelsResponse.data.data
      } catch (err) {
        console.error('Error fetching initial data:', err)
      }
    },

    debounce(func, wait) {
      let timeout
      return function (...args) {
        const later = () => {
          clearTimeout(timeout)
          func.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },

    closeInput() {
      this.searchQuery = ''
    },

    toggleSelection(categoryId) {
      const index = this.selectedCategories.findIndex(
        (id) => id.toString() === categoryId.toString()
      )

      if (index > -1) {
        this.selectedCategories.splice(index, 1)
      } else {
        this.selectedCategories.push(categoryId.toString())
      }
      this.allQuizzesSelected = this.selectedCategories.length === 0
      this.applyFilters({
        categories: this.selectedCategories
      })
    },

    updateUrl() {
      if (this.selectedItems.length === 0) {
        this.removeAllQueriesFromUrl()
      } else {
        this.$router.replace({ query: { id: this.selectedItems } })
      }
    },
    isSelected(categoryId) {
      return this.selectedCategories.includes(String(categoryId))
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
    },
    setActiveButton(button) {
      this.activeButton = button
    },
    handleActiveButtonChange(newActiveButton) {
      this.activeButton = newActiveButton
    },
    handleFilterApply(newFilters) {
      this.selectedCategories = newFilters.categories || this.selectedCategories
      this.applyFilters(newFilters)
      console.log(newFilters)
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.$router.push({ query: { ...this.$route.query, search: newQuery } }).catch((err) => {})
      this.debouncedSearch(newQuery)
    }
  },
  computed: {
    categoryClasses() {
      return (categoryId) => ({
        'border-b-2': true,
        'border-transparent': !this.isSelected(categoryId),
        'border-black': this.isSelected(categoryId)
      })
    }
  }
}
</script>

 -->

<!-- FILTERMODAL -->
<!-- <template>
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
            v-model="myQuizzesChecked"
          />
        </div>

        <div v-if="isLogged" class="flex items-center mb-4 px-6 gap-2">
          <label for="not-completed" class="text-[#101828] font-semibold">Not completed</label>
          <input
            id="not-completed"
            type="checkbox"
            class="mr-2 scale-125"
            v-model="notCompletedChecked"
          />
        </div>

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
        sort: { current: '', confirmed: '' }
        // myQuizzesChecked: { current: false, confirmed: false },
        // notCompletedChecked: { current: false, confirmed: false }
      },
      myQuizzesChecked: false,
      notCompletedChecked: false,

      showFilterConfirmation: false,
      localChangesMade: false
    }
  },
  mounted() {
    this.initialLoginCheck()
    this.checkLocalChanges()
    this.setInitialStateFromUrl()
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
      this.filterState.categories.current = queryParams.categories
        ? queryParams.categories.split(',')
        : []
      this.filterState.difficulties.current = queryParams.difficulties
        ? queryParams.difficulties.split(',')
        : []
      this.filterState.sort.current = queryParams.sort || ''
      // this.filterState.myQuizzesChecked.current = queryParams.my_quizzes === 'true'
      // this.filterState.notCompletedChecked.current = queryParams.not_completed === 'true'

      this.checkLocalChanges()
    },

    setInitialStateFromUrl() {
      const urlParams = new URLSearchParams(window.location.search)
      this.filterState.categories.current = urlParams.get('categories')
        ? urlParams.get('categories').split(',')
        : [...this.parentSelectedCategories]
      this.filterState.difficulties.current = urlParams.get('difficulties')
        ? urlParams.get('difficulties').split(',')
        : []
      this.filterState.sort.current = urlParams.get('sort') || ''
      // this.filterState.myQuizzesChecked.current = urlParams.get('my_quizzes') === 'true'
      // this.filterState.notCompletedChecked.current = urlParams.get('not_completed') === 'true'
    },

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

      const totalSelections =
        this.filterState.categories.current.length +
        this.filterState.difficulties.current.length +
        (this.filterState.sort.current ? 1 : 0) +
        // (this.filterState.myQuizzesChecked.current ? 1 : 0 ) +
        // (this.filterState.notCompletedChecked.current ? 1 : 0)

        this.$emit('apply-filters', {
          categories: this.filterState.categories.current,
          difficulties: this.filterState.difficulties.current,
          sort: this.filterState.sort.current,
          // myQuizzes: this.filterState.myQuizzesChecked.current,
          // notCompleted: this.filterState.notCompletedChecked.current
          myQuizzes: this.myQuizzesChecked,
          notCompleted: this.notCompletedChecked
        })
      this.localChangesMade = false
      this.$emit('update-selected-categories-count', totalSelections)

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

    toggleMyQuizzes() {
      this.filterState.myQuizzesChecked.current = !this.filterState.myQuizzesChecked.current
      this.checkLocalChanges()
      console.log(this.filterState.myQuizzesChecked.current)
    },

    toggleNotCompleted() {
      this.filterState.notCompletedChecked.current = !this.filterState.notCompletedChecked.current
      this.checkLocalChanges()
      console.log(this.filterState.notCompletedChecked.current)
    },

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
    }
  }
}
</script>
 -->
