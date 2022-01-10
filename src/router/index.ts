import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []
const files = require.context('./map', false, /.ts$/)
files.keys().forEach((key) => {
  const route = files(key).default
  if (Array.isArray(route)) {
    for (let item of route) {
      routes.push(item)
    }
  } else {
    routes.push(route)
  }
})

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
