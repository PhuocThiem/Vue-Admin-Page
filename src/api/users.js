import http from '../service/http'

export default class User {
  static signUp (email, password) {
    console.log(email, password)
    return http.post('/users', { email, password })
  }
  static signIn (email, password) {
    console.log(email, password)
    return http.post('/users/login', { email, password })
  }
}
