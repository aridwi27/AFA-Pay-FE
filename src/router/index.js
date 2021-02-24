import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Landpage from '../views/Landpage.vue'
import Transfer from '../views/Transfer.vue'
import Search from '../views/Search.vue'
import Pin from '../views/Pin.vue'
import Topup from '../views/Topup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/page',
    name: 'page',
    component: Landpage
  },
  {
    path: '/pin',
    name: 'pin',
    component: Pin
  },
  {
    path: '/topup',
    name: 'Topup',
    component: Topup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
