import SortedUpper from '@/views/SortedUpper.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeBooks from '@/views/HomeBooks.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/Books', component: HomeBooks },
    { path: '/sorted', component: SortedUpper },
    { path: '/', component: HomeView },
  ],
})

export default router
