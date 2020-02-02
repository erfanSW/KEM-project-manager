import Api from "./Api";

export default {
  getTasks() {
    let id = 1
    Api().get(`tasks/${id}`)
  }
}
