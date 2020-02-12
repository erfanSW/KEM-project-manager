import Api from "./Api";

export default {
  getTasks(token,project) {
    console.log(token)
    return Api().get(`tasks`, {
      params: {
        project
      },
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },
  add_comment(token,comment) {
    console.log(token + " " + comment)
    return Api().post(`comment/`, comment ,{
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },
  get_comments(token,task) {
    console.log(String(task )+ "  kir")
    return Api().get(`comment`, {
      params: {
        task: task
      },
      headers: {
        Authorization: 'Token ' + token
      }
    })
  }
}
