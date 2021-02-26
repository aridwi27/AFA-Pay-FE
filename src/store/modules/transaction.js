import axios from 'axios'
const moduleTrans = {
  namespaced: true,
  state: () => {
    return {
      userRecap: {
        income: 0,
        expense: 0
      },
      userTrans: [],
      detailTransUser: {
        id: 0,
        amount: 0,
        currentCredit: 0,
        info: ''
      },
      detailTrans: {
        amount: 0,
        currentCredit: 0,
        info: ''
      }
    }
  },
  mutations: {
    setUserTrans (state, payload) {
      state.userTrans = payload
    },
    setUserRecap (state, payload) {
      state.userRecap = payload
    },
    setDetailTrans (state, payload) {
      state.detailTrans = payload
    },
    setDetailTransUser (state, payload) {
      state.detailTransUser = payload
    }
  },
  actions: {
    getUserTrans (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/transaction?id=${data.id}&sort=${data.sort}&page=${data.page}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
          if (response.data.data.length > 0) {
            context.commit('setUserTrans', response.data.data)
            context.commit('setUserRecap', response.data.pagination)
            resolve(response.data)
          } else {
            context.commit('setUserTrans', [])
            context.commit('setUserRecap', { income: 0, expense: 0 })
            resolve(response.data)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addTrans (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/transaction`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            context.commit('setDetailTrans', response.data.data)
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    detailTrans (context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/transaction/${id}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            context.commit('setDetailTransUser', response.data.data[0])
            resolve(response.data.data[0])
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    confTrans (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/transaction/${context.state.detailTransUser.id}`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            // context.commit('setDetailTransUser', response.data.data[0])
            // resolve(response.data.data[0])
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    transRecap: state => state.userRecap,
    transUser: state => state.userTrans,
    transDetail: state => state.detailTrans,
    transDetailUser: state => state.detailTransUser
  }
}
export default moduleTrans
