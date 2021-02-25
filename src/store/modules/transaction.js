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
    }
  },
  actions: {
    getUserTrans (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/transaction?user=${context.rootState.auth.id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
          if (response.data.data.length > 0) {
            context.commit('setUserTrans', response.data.data)
            context.commit('setUserRecap', response.data.pagination)
            resolve(response.data)
          } else {
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
            resolve(response)
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
    transDetail: state => state.detailTrans
  }
}
export default moduleTrans
