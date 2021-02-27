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
      paginationSearch: {},
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
      state.token = payload
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
      state.userSearch = payload.data
      state.paginationSearch = payload.pagination
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
          context.commit('setToken', response.data.data.token)
          context.commit('setUserData', response.data.data)
          resolve(response.data.message)
          // console.log(response.data.message)
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
        context.commit('setUserData', { id: null, email: null })
        resolve(true)
      })
    },
    userDetail (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user/${localStorage.id}`, { headers: { token: context.state.token } }).then((response) => {
          context.commit('setDetailUser', response.data.data[0])
          resolve(response.data.data[0])
          // console.log(response.data.data[0])
          // resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    updateUser (context, data) {
      // console.log(data)
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/user/${localStorage.id}`, data, { headers: { token: context.state.token } }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    changePass (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/changepass/${localStorage.getItem('id')}`, data, { headers: { token: context.state.token } }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    searchUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user?name=${data.name}&sort=${data.sort}&page=${data.page}`, { headers: { token: context.state.token } }).then((response) => {
          context.commit('setSearchUser', response.data)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    selectTarget (context, data) {
      context.commit('setTargetData', data)
    },
    deletePhoto (context) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/delete_photo/${localStorage.id}`, { headers: { token: context.state.token } }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    detailUser: state => state.dataDetailUser,
    getToken: state => state.token,
    userId: state => state.id,
    userSearch: state => state.userSearch,
    paginationSearch: state => state.paginationSearch,
    targetData: state => state.targetData
  }
}
export default moduleAuth
