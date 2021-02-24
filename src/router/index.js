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
import Success from '../views/Success.vue'
import Error from '../views/Error.vue'
import Topup from '../views/Topup.vue'
import Profile from '../views/Profile.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import ChangePassword from '../views/ChangePassword.vue'
import ChangePin from '../views/ChangePin.vue'
import AddPhone from '../views/AddPhone.vue'
import ManagePhone from '../views/ManagePhone.vue'

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
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/changepin',
    name: 'ChangePin',
    component: ChangePin
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/personalinfo',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/addphone',
    name: 'AddPhone',
    component: AddPhone
  },
  {
    path: '/managephone',
    name: 'ManagePhone',
    component: ManagePhone
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
