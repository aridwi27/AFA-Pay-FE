import axios from 'axios'

const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      email: localStorage.getItem('email') || null,
      id: localStorage.getItem('id') || null,
      userData: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        pin: null,
        image: 'default_photo.png',
        email: 'user@afapay.com',
        handphone: '+62',
        credit: 0
      },
      dataDetailUser: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        pin: null,
        image: 'default_photo.png',
        email: 'user@afapay.com',
        handphone: '+62',
        credit: 0
      },
      userSearch: [],
      targetData: {
        image: 'default_photo.png',
        id: 0,
        first_name: '',
        last_name: '',
        handphone: ''
      }
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
    },
    setSearchUser (state, payload) {
      state.userSearch = payload
    },
    setTargetData (state, payload) {
      state.targetData = payload
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
    },
    updateUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/user/${context.state.id}`, data, { headers: { token: context.state.token } }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    changePass (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/changepass/${context.state.id}`, data, { headers: { token: context.state.token } }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    searchUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user?name=${data.name}&sort=${data.sort}&page=${data.page}`, { headers: { token: context.state.token } }).then((response) => {
          context.commit('setSearchUser', response.data.data)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    selectTarget (context, data) {
      context.commit('setTargetData', data)
    }
  },
  getters: {
    detailUser: state => state.dataDetailUser,
    getToken: state => state.token,
    userId: state => state.id,
    userSearch: state => state.userSearch,
    targetData: state => state.targetData
  }
}
export default moduleAuth
