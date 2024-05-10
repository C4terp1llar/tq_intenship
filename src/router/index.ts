import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import app from "@/App.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: app
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
