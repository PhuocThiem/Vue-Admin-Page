import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import todos from './todos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    todos
  }
})
