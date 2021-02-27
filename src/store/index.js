import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
import moduleTrans from './modules/transaction'
Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      webURL: process.env.VUE_APP_WEBURL
    }
  },
  getters: {
    webURL: state => state.webURL
  },
  mutations: {
  },
  tions: {
  },
  modules: {
    auth: moduleAuth,
    trans: moduleTrans
  }
})
export default store
