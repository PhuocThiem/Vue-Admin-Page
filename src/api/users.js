import http from '../service/http'

export default class User {
  static register (email, password) {
    console.log(email, password)
    return http.post('/users', { email, password })
  }
}
