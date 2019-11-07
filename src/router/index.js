import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
