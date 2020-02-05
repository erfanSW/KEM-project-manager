import Api from "./Api";

export default {
  getTasks(token) {
    console.log(token)
    return Api().get(`tasks`, {
      headers: {
        Authorization: 'Token ' + token
      }
    })
  }
}
