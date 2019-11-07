import http from '../service/http'

export default class User {
  static signUp (email, password) {
    return http.post('/users', { email, password })
  }
}
