import http from '../service/http'

export default class Todo {
  static addTask (text, token) {
    return http.post('/todos', { text }, token)
  }
  static getTask (token) {
    return http.get('/todos', token)
  }
  static deleteTask (id, token) {
    return http.delete(`/todos/${id}`, token)
  }
  static updateTask (id, text, completed, token) {
    console.log('id', id)
    console.log('token', token)
    console.log('completed', completed)
    console.log('text', text)
    return http.patch(`/todos/${id}`, { text, completed }, token)
  }
}
