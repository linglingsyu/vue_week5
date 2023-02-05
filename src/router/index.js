import { createRouter, createWebHistory } from 'vue-router'

import products from '@/views/ProductView.vue'
import carts from '@/views/CartView.vue'
const history = createWebHistory('/vue_week5')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: products,
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'products',
    component: products,
  },
  {
    path: '/carts',
    name: 'carts',
    component: carts,
  },
]

const router = createRouter({ history, routes })
export default router
