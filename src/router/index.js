import AuthorizationLoginPage from '@/pages/AuthorizationLoginPage.vue'
import AuthorizationRegistrationPage from '@/pages/AuthorizationRegistrationPage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/catalog',
      component: CatalogPage,
    },
    {
      path: '/login',
      component: AuthorizationLoginPage,
    },
    {
      path: '/register',
      component: AuthorizationRegistrationPage,
    }
  ],
})

export default router

