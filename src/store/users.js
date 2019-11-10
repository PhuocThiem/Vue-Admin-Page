import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import User from '../api/users'

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from '../constant/muationTypes'

const state = {
  signUp: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {
  async signUp ({ commit }, { email, password }) {
    commit(SIGN_UP_REQUEST)
    try {
      const res = await User.signUp(email, password)
      const data = get(res, 'data')
      const token = get(res, 'headers.[x-Auth]')
      localStorage.setItem(token)
      commit(SIGN_UP_SUCCESS, { data: data })
    } catch (error) {
      commit(SIGN_UP_FAIL, { error: serializeError(error) })
    }
  }
}

const mutations = {
  [SIGN_UP_REQUEST] (state) {
    state.signUp.requesting = true
    state.signUp.status = ''
  },
  [SIGN_UP_SUCCESS] (state, payload) {
    state.signUp.requesting = false
    state.signUp.status = 'success'
    state.signUp.result = payload
  },
  [SIGN_UP_FAIL] (state, payload) {
    state.signUp.requesting = false
    state.signUp.status = 'success'
    state.signUp.error = payload
  }
}

export default {
  state,
  actions,
  mutations
}
