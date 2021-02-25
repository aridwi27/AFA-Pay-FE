import axios from 'axios'

const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      email: localStorage.getItem('email') || null,
      id: localStorage.getItem('id') || null,
      useraData: {}
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload.token
    },
    setUserData (state, payload) {
      state.userData = {
        id: payload.id,
        email: payload.email
      }
    }
  },
  actions: {
    signUp (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/register`, data).then((response) => {
          resolve(response.data.message)
        }).then((err) => {
          reject(err)
        })
      })
    },
    login (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data).then((response) => {
          console.log(response.data.message)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('email', response.data.emai)
          localStorage.setItem('id', response.data.id)
          context.commit('setToken', response.data)
          context.commit('setUserData', response.data)
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        context.commit('setToken', null)
        context.commit('setUserData', null)
        resolve(true)
      })
    }
  },
  getters: {
  }
}
export default moduleAuth
