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
          :style="buttonStyle"
          :class="{ 'border-[#000] border-2 text-[#000]': selectedCategoriesCount > 0 }"
        >
          <Filter />
          <span
            class="text-sm text-custom-light-gray group-hover:text-custom-blue"
            :class="{ 'text-[#000': selectedCategoriesCount > 0 }"
            >Filter</span
          >
        </button>
        <div class="bg-white absolute top-[30%] right-1 translate-x-1/2 py-1 pl-1 rounded-full">
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
        @update-selected-categories-count="selectedCategoriesCount = $event"
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
    document.addEventListener('click', this.handleClickOutside)

    this.getInitialData()
    let queryParams = { ...this.$route.query }

    this.selectedCategories = queryParams.categories ? queryParams.categories.split(',') : []
    this.selectedDifficulties = queryParams.difficulties ? queryParams.difficulties.split(',') : []
    this.selectedSort = queryParams.sort || ''
    this.isMyQuizzesChecked = queryParams.my_quizzes === 'true'
    this.isNotCompletedChecked = queryParams.not_completed === 'true'
    this.allQuizzesSelected = this.selectedCategories.length === 0

    this.applyFilters(queryParams)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    updateSelectedCategoriesCount(count) {
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
        ...(typeof filters.my_quizzes !== 'undefined' && { my_quizzes: filters.my_quizzes }),
        ...(typeof filters.not_completed !== 'undefined' && {
          not_completed: filters.not_completed
        })
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
    },
    // filterFillColor() {
    //   if (this.selectedCategoriesCount > 0) {
    //     return this.isHovering ? '#000' : '#000000'
    //   } else {
    //     return this.isHovering ? '#4B69FD' : '#667085'
    //   }
    // },
    filterClass() {
      if (this.selectedCategoriesCount > 0) {
        return 'border-black text-black font-semibold'
      } else {
        return 'text-custom-light-gray group-hover:text-custom-blue'
      }
    },
    buttonStyle() {
      if (this.selectedCategoriesCount > 0) {
        return { '--filter-icon-color': 'var(--filter-icon-active)' }
      } else if (this.isHovering) {
        return { '--filter-icon-color': 'var(--filter-icon-hover)' }
      } else {
        return { '--filter-icon-color': 'var(--filter-icon-default)' }
      }
    }
  }
}
</script>
