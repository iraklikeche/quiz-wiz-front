<!--********************** It is just blueprint ************************** -->
<template>
  <div class="p-6 px-20">
    <header class="">
      <h1 class="text-4xl font-bold text-center">Timeline of Discoveries</h1>
      <div class="text-sm text-gray-600 text-center mt-2">
        History • World • 10 Questions • 15 Points • 169 plays • 5m
      </div>
    </header>
    <div class="grid grid-cols-[70fr_30fr] gap-8">
      <div class="mt-6">
        <div class="flex justify-between items-center mb-8">
          <div class="text-gray-700 text-sm">Question 1 - Points 2</div>
        </div>

        <div v-for="(question, index) in questions" :key="index" class="mb-4">
          <div class="text-lg font-medium mb-2">
            {{ question.text }}
          </div>
          <div class="flex flex-col">
            <label v-for="(option, oIndex) in question.options" :key="oIndex" class="block mb-2">
              <input
                type="radio"
                :value="option"
                v-model="question.selected"
                class="hidden"
                :id="'option-' + index + '-' + oIndex"
              />
              <div
                :class="[
                  question.selected === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300',
                  'flex items-center p-4 border rounded-lg cursor-pointer'
                ]"
              >
                <span class="text-gray-700">{{ option }}</span>
                <span class="ml-auto" v-if="question.selected === option">
                  <svg
                    class="text-blue-500 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <div class="flex flex-col items-center">
          <div class="bg-white px-8 py-4 rounded-lg shadow flex items-center flex-col">
            <span class="text-sm font-semibold text-gray-500 mb-1">Timer</span>
            <span class="text-5xl font-semibold text-gray-800">{{ formattedTime }}</span>
          </div>

          <div class="border-t my-4 w-full border-gray-200"></div>

          <button
            @click="submitAnswers"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalTime: 300,
      timer: null,
      startTime: 300,

      questions: [
        {
          text: 'What is the study of medicines and their action called?',
          options: ['Pharmacology', 'Toxicology', 'Pathology', 'Zoology'],
          selected: []
        }
      ]
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.totalTime / 60)
      const seconds = this.totalTime % 60
      return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeUnmount() {
    this.clearTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.totalTime > 0) {
          this.totalTime -= 1
        } else {
          this.clearTimer()
          console.log('finish')
        }
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    submitAnswers() {
      this.clearTimer()

      const timePassed = this.startTime - this.totalTime

      console.log(`Time passed: ${timePassed} seconds`)

      console.log(this.questions)
    }
  }
}
</script>
