<template>
  <div class="flex gap-32 py-16 pl-20 relative z-50">
    <RouterLink :to="{ name: 'home' }">
      <Logo />
    </RouterLink>
    <FooterList heading="Content">
      <li class="text-custom-gray text-xs">Quizzes</li>
    </FooterList>
    <FooterList heading="Contact us">
      <li class="text-custom-gray text-xs">Email: quizwiz@gmail.com</li>
      <li class="text-custom-gray text-xs">Tel: +995 328989</li>
    </FooterList>
    <FooterList heading="Social media">
      <li class="text-custom-gray text-xs">Facebook</li>
      <li class="text-custom-gray text-xs">LinkedIn</li>
    </FooterList>
  </div>
  <div class="flex items-end justify-end px-24 py-6 border-t-2 border-opacity-25">
    <p class="text-[#667085] text-xs font-medium font-raleway">
      &copy; {{ year }} QW. All rights reserved
    </p>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'
import FooterList from '@/components/FooterList.vue'

export default {
  components: {
    Logo,
    FooterList
  },
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
