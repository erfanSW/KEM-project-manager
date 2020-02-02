import Api from './Api'

export default {
    getiin() {
      return Api().get('tasks')
    }
}
