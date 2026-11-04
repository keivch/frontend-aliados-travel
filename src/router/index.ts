import SortedUpper from '@/views/SortedUpper.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: SortedUpper }],
})

export default router
