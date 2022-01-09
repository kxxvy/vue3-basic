import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import error from './map/error'
import login from './map/login'
import home from './map/home'

const routes: RouteRecordRaw[] = [...login, ...error, ...home]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = window.localStorage.getItem('token')
//   const userId = window.localStorage.getItem('userId')
//   if (!tokenStr || !userId) return next('/login')
//   next()
// })

export default router
