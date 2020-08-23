import Api from "./Api";

export default {
  getTasks(project) {
    console.log(111111)
    return Api().get(`task/?project=${project}`)
  },
  add_task(task) {
    return Api().post(`task/`, task, {
      params: {
        project: task.project
      },
    })
  },
  delete_task(id) {
    return Api().delete(`task/${id}`)
  },
  patch(data) {
    return Api().patch(`task/${data.id}/`, data)
  },
  add_comment(comment) {
    return Api().post(`comment/`, comment, {})
  },
  get_comments(task) {
    return Api().get(`comment`, {
      params: {
        task: task
      },
    })
  },
  delete_comment(id) {
    return Api().delete(`comment/${id}`)
  },
}
