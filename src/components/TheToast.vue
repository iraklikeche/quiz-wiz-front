<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-y-full"
    leave-to-class="-translate-y-full"
  >
    <div
      v-if="showToast"
      class="max-w-[21rem] fixed top-4 right-1/2 translate-x-1/2 sm:-translate-x-0 sm:right-12 font-raleway py-3 rounded-lg px-4 bg-gradient-to-r to-[#242C32] to-35% from-green-900 z-10 overflow-hidden"
    >
      <div class="flex items-center justify-between gap-6">
        <div v-if="type === 'success'" class="bg-toast-green/10 p-1 rounded-full">
          <SuccessToast />
        </div>
        <div v-else-if="type === 'warning'" class="bg-toast-yellow/10 p-1 rounded-full">
          <WarningToast />
        </div>
        <div v-else class="bg-toast-red/10 p-1 rounded-full">
          <ErrorToast />
        </div>
        <div>
          <h1 class="text-white font-extrabold">{{ header }}</h1>
          <p class="text-[#C8C5C5] text-sm">
            {{ toastMsg }}
          </p>
          <slot />
        </div>
      </div>
      <div
        class="before:absolute before:bottom-0 before:right-0 before:h-full before:w-full rounded-b-lg absolute bottom-0 w-full h-1 left-0"
        :class="animate"
      ></div>
    </div>
  </Transition>
</template>

<script>
import SuccessToast from '@/components/icons/toast/SuccessToast.vue'
import WarningToast from '@/components/icons/toast/WarningToast.vue'
import ErrorToast from '@/components/icons/toast/ErrorToast.vue'

export default {
  components: {
    SuccessToast,
    WarningToast,
    ErrorToast
  },
  props: {
    showToast: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    toastMsg: {
      type: String,
      required: true
    }
  },
  computed: {
    animate() {
      if (this.type === 'success')
        return `before:animate-[progress_3000ms_linear_forwards] before:bg-toast-green`
      else if (this.type === 'warning')
        return `before:animate-[progress_4000ms_linear_forwards] before:bg-toast-yellow`
      else return `before:animate-[progress_5000ms_linear_forwards] before:bg-toast-red`
    }
  }
}
</script>
