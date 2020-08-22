import Api from "./Api";

export default {
  getTasks(project) {
    return Api().get(`tasks`, {
      params: {
        project: project.project_id
      },
    })
  },
  add_task(task) {
    return Api().post(`tasks/`, task, {
      params: {
        project: task.project
      },
    })
  },
  delete_task(id) {
    return Api().delete(`tasks/${id}`)
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
  }
}
