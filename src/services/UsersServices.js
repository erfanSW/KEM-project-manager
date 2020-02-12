import Api from './Api'

export default {
  getUsers() {
    return Api().get('account/users')
  }
}
