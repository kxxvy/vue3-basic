export default [
  {
    path: '/',
    redirect: '/main'
  },

  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/mainPage/index.vue')
  }
]
