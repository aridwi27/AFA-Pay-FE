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
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      auth: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      auth: true
    }
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      auth: true
    }
  },
  {
    path: '/changepin',
    name: 'ChangePin',
    component: ChangePin,
    meta: {
      auth: true
    }
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer,
    meta: {
      auth: true
    }
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
    meta: {
      auth: true
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
    meta: {
      auth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      auth: true
    }
  },
  {
    path: '/page',
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
    name: 'Topup',
    component: Topup,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true
    }
  },
  {
    path: '/personalinfo',
    name: 'PersonalInfo',
    component: PersonalInfo,
    meta: {
      auth: true
    }
  },
  {
    path: '/addphone',
    name: 'AddPhone',
    component: AddPhone,
    meta: {
      auth: true
    }
  },
  {
    path: '/managephone',
    name: 'ManagePhone',
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
  // console.log(Boolean(store.getters['auth/getToken']))
  if (to.matched[0].meta.auth) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('Need Login')
      next({
        path: '/'
      })
    }
  } else {
    // if (store.getters['auth/getToken']) {
    //   Swal.fire({
    //     icon: 'info',
    //     title: '',
    //     text: 'You already logged in!'
    //   })
    //   next({
    //     path: '/product'
    //   })
    // } else {
    next()
    // }
  }
})

export default router
