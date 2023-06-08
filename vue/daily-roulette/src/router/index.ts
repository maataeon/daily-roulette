import { createRouter, createWebHistory } from 'vue-router'
import RouletteView from '../views/RouletteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'roulette',
      component: RouletteView
    }
  ]
})

export default router
