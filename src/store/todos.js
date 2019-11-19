import { get } from 'lodash'
import { serializError } from 'serialize-error'

import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,

  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,

  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,

  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL
} from '../constant/muationTypes'

import Todo from '../api/todos'

const state = {
  task: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  tasks: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {
  async addNewTask ({ commit }, { task, token }) {
    commit(ADD_TASK_REQUEST)
    try {
      const res = await Todo.addTask(task, token)
      const data = get(res, 'data')
      commit(ADD_TASK_SUCCESS, data)
    } catch (error) {
      commit(ADD_TASK_FAIL, { error: serializError(error) })
    }
  },
  async getTask ({ commit }, token) {
    commit(GET_TASK_REQUEST)
    try {
      const res = await Todo.getTask(token)
      const data = get(res, 'data.todos')
      commit(GET_TASK_SUCCESS, { data: data })
    } catch (error) {
      commit(GET_TASK_FAIL, { error: serializError(error) })
    }
  },
  async deleteTask ({ commit }, { id, token }) {
    commit(DELETE_TASK_REQUEST)
    try {
      const res = await Todo.deleteTask(id, token)
      const data = get(res, 'data.todos')
      commit(DELETE_TASK_SUCCESS, data)
    } catch (error) {
      commit(DELETE_TASK_FAIL, { error: serializError(error) })
    }
  },
  async updateTask ({ commit }, { id, text, completed, token }) {
    commit(UPDATE_TASK_REQUEST)
    try {
      const res = await Todo.updateTask(id, text, completed, token)
      const data = get(res, 'data.todos')
      commit(UPDATE_TASK_SUCCESS, data)
    } catch (error) {
      commit(UPDATE_TASK_FAIL, { error: serializError(error) })
    }
  }
}

const mutations = {
  [ADD_TASK_REQUEST] (state) {
    state.task.requesting = true
    state.task.status = 'requesting...'
  },
  [ADD_TASK_SUCCESS] (state, payload) {
    state.task.requesting = false
    state.task.status = 'success'
    state.task.result = payload
  },
  [ADD_TASK_FAIL] (state, payload) {
    state.task.requesting = false
    state.task.status = 'error'
    state.task.error = payload.error
  },
  [GET_TASK_REQUEST] (state) {
    state.tasks.requesting = true
    state.tasks.status = 'requesting...'
  },
  [GET_TASK_SUCCESS] (state, payload) {
    state.tasks.requesting = false
    state.tasks.status = 'success'
    state.tasks.result = payload
  },
  [GET_TASK_FAIL] (state, payload) {
    state.tasks.requesting = false
    state.tasks.status = 'error'
    state.tasks.error = payload.error
  },
  [DELETE_TASK_REQUEST] (state) {
    state.task.requesting = true
    state.task.status = 'requesting...'
  },
  [DELETE_TASK_SUCCESS] (state, payload) {
    state.task.requesting = false
    state.task.status = 'success'
    state.task.result = payload
  },
  [DELETE_TASK_FAIL] (state, payload) {
    state.task.requesting = false
    state.task.status = 'error'
    state.task.error = payload.error
  },
  [UPDATE_TASK_REQUEST] (state) {
    state.task.requesting = true
    state.task.status = 'requesting...'
  },
  [UPDATE_TASK_SUCCESS] (state, payload) {
    state.task.requesting = false
    state.task.status = 'success'
    state.task.result = payload
  },
  [UPDATE_TASK_FAIL] (state, payload) {
    state.task.requesting = false
    state.task.status = 'error'
    state.task.error = payload.error
  }
}

const getters = {
  task: state => get(state, 'task.result', {}),
  tasks: state => get(state, 'tasks.result', [])
}

export default {
  state,
  actions,
  mutations,
  getters
}
