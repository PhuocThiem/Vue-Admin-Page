import http from '../service/http'

export default class Todo {
  static addTask (task, token) {
    return http.post('/todos', task, token)
  }
  static getTask (token) {
    return http.get('/todos', token)
  }
}
