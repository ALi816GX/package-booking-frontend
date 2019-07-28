import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    tempOrders: []
  },
  getters: {

    getOrders: function (state) {
      return state.orders
    },
    getTempOrders: function (state) {
      return state.tempOrders
    },
    getOrderByOrderId: function (state, getters) {
      return function (orderId) {
        return state.orders.find(item => item.orderId == orderId)
      }
    }
  },
  mutations: {
    addOrder: function (state, value) {
      state.orders = state.orders.concat(value)
    },
    updateOrdersByOrder: function (state, order) {
      let result = state.orders.filter(item => item.orderId !== order.orderId)
      let one = []
      one.push(order)
      state.orders = one.concat(result)
    },
    changeTempOrders: function (state,value) {
      if (value === '所有') {
        state.tempOrders = state.orders
      } else {
        console.log(state.orders.filter(item => item.state === value))
        state.tempOrders = state.orders.filter(item => item.state === value)
      }
    }
  },
  actions: {}
})
