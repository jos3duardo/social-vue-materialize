import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
