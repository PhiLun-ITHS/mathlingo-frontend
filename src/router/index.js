import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myPage',
    name: 'MyPage',

    component: () => import('../views/MyPage')
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import('../views/Login')
  },
  {
    path: '/signup',
    name: 'Signup',

    component: () => import('../views/Signup')
  },
  {
    path: '/contact',
    name: 'Contact',

    component: () => import('../views/Contact')
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
