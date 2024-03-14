<template>
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 27L27 2M27 2H2M27 2V27"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
scrollBehavior(to, from, savedPosition) { // Always scroll to top when navigating to a new route
return { top: 0 }; } // This closing bracket ends the scrollBehavior function.
