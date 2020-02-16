import Api from './Api'
import account from '../store/user/index'
import store from "../store/index"

export default {
  get() {
    return Api().get('projects', {
      headers: {
        Authorization: "Token " + store().getters['account/token']
      }
    })
  },
  post(data) {
    return Api().post('projects/', data, {
      headers: {
        Authorization: "Token " + store().getters['account/token']
      }
    })
  },
  put(data) {
    return Api().put(`projects/${data.id}/`, data, {
      headers: {
        Authorization: "Token " + store().getters['account/token']
      }
    })
  },
}
