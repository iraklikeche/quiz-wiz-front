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
      path: '/quiz/:id',
      name: 'quiz',
      component: () => import('../views/SingleQuizView.vue')
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/errors/ServerError500.vue')
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
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const restricted = ['/login', '/register', '/forgot-password', '/reset']

  if (isLoggedIn && restricted.includes(to.path)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
