import Api from "./Api";

export default {
  post(status) {
    return Api().post('task_status/', status)
  },
  get(project) {
    return Api().get(`task_status/?project=${project}`)
  }
}
