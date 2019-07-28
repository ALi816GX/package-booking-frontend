import Vue from 'vue'
import Router from 'vue-router'
import Boss from './views/Boss.vue'
import Customer from './views/Customer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Boss',
      component: Boss
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    }
  ]
})
