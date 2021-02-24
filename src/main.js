import Vue from 'vue'
import App from './App.vue'
import router from './router'
import css from '../src/assets/css/style.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/index'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
Vue.use(css)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
