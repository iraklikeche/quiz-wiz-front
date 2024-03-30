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
      path: '/quizzes',
      name: 'quizzes',
      component: () => import('../views/QuizzesView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SessionView/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SessionView/LoginView.vue'),
      props: (route) => ({ verified: route.query.verified })
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
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/SingleQuizView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('../views/errors/NotFound404.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
