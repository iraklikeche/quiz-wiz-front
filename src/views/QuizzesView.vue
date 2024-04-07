<template>
  <Header>
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
          class="outline-none pl-8 py-2 rounded-xl bg-transparent w-32 transition-all duration-300 focus:w-[10rem] sm:focus:w-[21.5rem]"
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
        <button @click="scrollLeft" class="rotate-180 flex items-center justify-center pt-2">
          <SliderArrow />
        </button>
        <ul
          class="flex gap-8 overflow-hidden border-b border-gray-300 max-w-[71rem]"
          ref="scrollContainer"
        >
          <li
            class="text-custom-light-gray text-sm font-semibold cursor-pointer pb-2"
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
            v-for="category in categories"
            :key="category.id"
            class="text-custom-light-gray text-sm font-semibold cursor-pointer pb-2"
            :class="{
              'border-b-2': true,
              'border-transparent': !isSelected(category.name),
              'border-black': isSelected(category.name)
            }"
            @click="toggleSelection(category.name)"
          >
            {{ category.name }}
          </li>
        </ul>

        <button @click="scrollRight" class="pb-2">
          <SliderArrow />
        </button>
      </div>
      <div class="mt-4 sm:mt-0 px-2 sm:px-0 sm:pt-8">
        <button
          @click="showModal = true"
          class="group flex gap-2 items-center border border-custom-light-gray border-opacity-60 py-2 px-4 rounded-xl hover:bg-[#4B69FD] hover:bg-opacity-10 hover:scale-105 hover:border-custom-blue"
        >
          <Filter />
          <span class="text-sm text-custom-light-gray group-hover:text-custom-blue">Filter</span>
        </button>
      </div>
    </div>

    <div class="relative">
      <FilterModal
        :showModal="showModal"
        @update:show="showModal = $event"
        @update:activeButton="handleActiveButtonChange($event)"
        @close-modal="showModal = false"
        :categories="categories"
        :diffLevels="difficultyLevels"
        @apply-filters="applyFilters"
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

      showModal: false,
      activeButton: 'filter',
      quizzes: null,
      debouncedSearch: null,
      categories: null,
      difficultyLevels: null
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
    const queryParams = this.$route.query
    if (queryParams.categories || queryParams.difficulties) {
      let filters = {
        categories: queryParams.categories ? queryParams.categories.split(',') : [],
        difficulties: queryParams.difficulties ? queryParams.difficulties.split(',') : []
      }
      this.applyFilters(filters)
    } else {
      this.getQuizzesData()
    }
  },
  methods: {
    async applyFilters(filters) {
      let queryParams = new URLSearchParams()

      if (filters.categories && filters.categories.length > 0) {
        queryParams.set('categories', filters.categories.join(','))
      }

      if (filters.difficulties && filters.difficulties.length > 0) {
        queryParams.set('difficulties', filters.difficulties.join(','))
      }

      // if (filters.sort) {
      //   queryParams.append('sort', filters.sort.toLowerCase())
      // }
      const sortMapping = {
        'A-Z': 'alphabet',
        'Z-A': 'reverse-alphabet',
        Newest: 'newest',
        Oldest: 'oldest'
        // Add other mappings as necessary
      }
      if (filters.sort) {
        // Use the mapping to convert frontend labels to backend identifiers
        const sortParam = sortMapping[filters.sort] || filters.sort // Fallback to the original value just in case
        queryParams.append('sort', sortParam.toLowerCase()) // Ensure lowercase for backend
      }

      this.$router
        .push({ path: this.$route.path, query: queryParams.toString() })
        .catch((err) => {})
      await this.getQuizzesData(null, queryParams.toString())
    },

    async getQuizzesData(searchQuery = '', filterQuery = '') {
      try {
        let url = '/api/quizzes'
        if (searchQuery) {
          const searchParam = `search=${searchQuery}`
          url += filterQuery ? `?${filterQuery}&${searchParam}` : `?${searchParam}`
        } else if (filterQuery) {
          url += `?${filterQuery}`
        }
        const res = await getQuizzes(url)
        this.quizzes = res.data.data
      } catch (err) {
        console.log(err)
      }
    },

    removeAllQueriesFromUrl() {
      this.$router.replace({ query: {} })
      this.allQuizzesSelected = true
      this.selectedItems = []
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
    toggleSelection(genre) {
      const index = this.selectedItems.indexOf(genre)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      } else {
        this.allQuizzesSelected = false
        this.selectedItems.push(genre)
      }
      this.updateUrl()
    },
    updateUrl() {
      if (this.selectedItems.length === 0) {
        this.removeAllQueriesFromUrl()
      } else {
        this.$router.replace({ query: { id: this.selectedItems } })
      }
    },
    isSelected(genre) {
      return (
        this.selectedItems.includes(genre) || (this.allQuizzesSelected && genre === 'All Quizzes')
      )
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
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.$router.push({ query: { ...this.$route.query, search: newQuery } }).catch((err) => {})
      this.debouncedSearch(newQuery)
    }
  }
}
</script>
