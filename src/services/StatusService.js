import Api from "./Api";
import store from '../store/index'

export default {
  post(status) {
    return Api().post('task_statuses/', status ,{
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },get(project) {
    return Api().get(`task_statuses/`,{
      params: {
        project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  }
}
