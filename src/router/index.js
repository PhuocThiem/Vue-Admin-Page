import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../views/TotoList.vue'
import Users from '../views/Users.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import Storage from '../constant/Storage'

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
    path: '/todos',
    name: 'todo',
    component: TodoList
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      public: true,
      onlyWhenLogout: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: {
      public: true,
      onlyWhenLogout: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = Storage.getItem()

  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLogout = to.matched.some(record => record.meta.onlyWhenLogout)

  if (!isPublic && !token) {
    return next({
      path: '/signin',
      query: { redirect: to.fullPath }
    })
  }

  if (token && onlyWhenLogout) {
    return next('/')
  }
  return next()
})

export default router
