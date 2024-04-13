<template>
  <div
    :class="[
      'flex sm:flex-row flex-col gap-8 sm:gap-32 py-12 px-10 sm:pl-20 relative z-50,',
      customClass
    ]"
  >
    <RouterLink :to="{ name: 'home' }" :class="[logoBorderMobile]">
      <Logo />
    </RouterLink>
    <FooterList heading="Content">
      <li class="text-custom-gray text-xs">Quizzes</li>
    </FooterList>
    <FooterList heading="Contact us">
      <li class="text-custom-gray text-xs">Email: {{ details.email }}</li>
      <li class="text-custom-gray text-xs">Tel: {{ details.number }}</li>
    </FooterList>
    <FooterList heading="Social media">
      <li class="text-custom-gray text-xs">
        <a :href="details.facebook_link">Facebook</a>
      </li>
      <li class="text-custom-gray text-xs">
        <a :href="details.facebook_link">LinkedIn</a>
      </li>
    </FooterList>
  </div>
  <div
    class="flex items-start sm:items-end justify-start sm:justify-end px-10 sm:px-24 py-5 border-t-2 border-opacity-25"
  >
    <p class="text-custom-light-gray text-xs font-medium font-raleway">
      &copy; {{ year }} QW. All rights reserved
    </p>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import FooterList from '@/components/FooterList.vue'
import { getCompanyDetails } from '@/services/footerService'

export default {
  components: {
    Logo,
    FooterList
  },
  data() {
    return {
      details: null,
      year: new Date().getFullYear()
    }
  },
  props: {
    customClass: {
      type: String,
      default: ''
    },
    logoBorderMobile: String
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const response = await getCompanyDetails()
        this.details = response.data
        console.log(this.details)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
