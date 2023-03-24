import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'enter',
    component: () => import('@/views/enter/index.vue')
  }, {
    path: '/join/:method',
    name: 'join',
    component: () => import('@/views/join/index.vue')
  },
  {
    path: '/chat/:Type/:selectValue',
    name: 'chat',
    component: () => import('@/views/chat/index.vue')
  },
  {
    path: '/media/:Type/:selectValue',
    name: 'media',
    component: () => import('@/views/media/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
