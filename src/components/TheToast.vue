<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-y-full"
    leave-to-class="-translate-y-full"
  >
    <div
      v-if="showToast"
      class="max-w-[21rem] fixed top-4 right-1/2 translate-x-1/2 sm:-translate-x-0 sm:right-12 border-b-[3px] font-raleway py-3 rounded-lg px-4 bg-gradient-to-r to-[#242C32] to-35% border-b-[#01E17B] from-green-900 z-10"
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
  }
}
</script>
