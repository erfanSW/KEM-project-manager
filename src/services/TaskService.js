import Api from "./Api";
import store from "../store/index";

export default {
  getTasks(project) {
    return Api().get(`tasks`, {
      params: {
        project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },
  add_task(task) {
    return Api().post(`tasks/`, task, {
      params: {
        project: task.project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },
  add_comment(comment) {
    return Api().post(`comment/`, comment ,{
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },
  get_comments(task) {
    return Api().get(`comment`, {
      params: {
        task: task
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  }
}
