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
import Profile from '../views/Profile.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import ChangePassword from '../views/ChangePassword.vue'
import ChangePin from '../views/ChangePin.vue'
import Notification from '../views/Notification.vue'
import AddPhone from '../views/AddPhone.vue'
import ManagePhone from '../views/ManagePhone.vue'
import Status from '../views/Status.vue'
import store from '../store/index'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      auth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: {
      auth: true
    }
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: ChangePassword,
    meta: {
      auth: true
    }
  },
  {
    path: '/changepin',
    name: 'changepin',
    component: ChangePin,
    meta: {
      auth: true
    }
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification,
    meta: {
      auth: true
    }
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Transfer,
    meta: {
      auth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      auth: true
    }
  },
  {
    path: '/status',
    name: 'status',
    component: Status,
    meta: {
      auth: true
    }
  },
  {
    path: '/',
    name: 'page',
    component: Landpage,
    meta: {
      auth: false
    }
  },
  {
    path: '/pin',
    name: 'pin',
    component: Pin,
    meta: {
      auth: true
    }
  },
  {
    path: '/topup',
    name: 'topup',
    component: Topup,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      auth: true
    }
  },
  {
    path: '/personalinfo',
    name: 'personalinfo',
    component: PersonalInfo,
    meta: {
      auth: true
    }
  },
  {
    path: '/addphone',
    name: 'addphone',
    component: AddPhone,
    meta: {
      auth: true
    }
  },
  {
    path: '/managephone',
    name: 'managephone',
    component: ManagePhone,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched[0].meta.auth)
  // console.log(pin)
  // console.log(Boolean(store.getters['auth/getToken']))
  // console.log(store.getters['auth/detailUser'])
  if (to.matched[0].meta.auth) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Not Login',
        text: 'Login Needed!'
      })
      next({
        path: '/login'
      })
    }
  } else {
    if (store.getters['auth/getToken']) {
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'You already logged in!'
      })
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

export default router
