export default [
  {
    path: '/404',
    name: '/404',
    component: () => import('@/views/errorPage/index.vue')
  },
  {
    // 匹配所有路径， vue2使用*  vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]
