const KEY_LOGIN = 'key-login'

export default class Storage {
  static setItem (value, key = KEY_LOGIN) {
    return localStorage.setItem(key, value)
  }
}
