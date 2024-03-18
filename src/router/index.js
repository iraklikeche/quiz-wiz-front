import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {

      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    
      path: '/register',
      name: 'register',
      component: () => import('../views/SessionView/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SessionView/LoginView.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('../views/SessionView/ResetPasswordView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot',
      component: () => import('../views/SessionView/ForgotPasswordView.vue')
    },
      {
      path: '/:catchAll(.*)', // This will match all paths that aren't matched by above routes
      name: 'notfound',
      component: () => import('../views/errors/notFound404.vue')
      },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
