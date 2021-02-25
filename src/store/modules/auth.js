import axios from 'axios'

const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      email: localStorage.getItem('email') || null,
      id: localStorage.getItem('id') || null,
      userData: {},
      dataDetailUser: {}
      // dataDetailUser: {
      //   email: email
      // }
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
    },
    setDetailUser (state, payload) {
      state.dataDetailUser = payload
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
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data).then((response) => {
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('email', response.data.data.email)
          localStorage.setItem('id', response.data.data.id)
          context.commit('setToken', response.data.data)
          context.commit('setUserData', response.data.data)
          resolve(response.data)
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
    },
    userDetail (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user/${context.state.id}`, { headers: { token: context.state.token } }).then((response) => {
          context.commit('setDetailUser', response.data.data[0])
          resolve(response.data.data[0])
          // resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  },
  getters: {
    detailUser: state => state.dataDetailUser,
    getToken: state => state.token
  }
}
export default moduleAuth
