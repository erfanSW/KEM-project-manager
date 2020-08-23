import Api from "./Api";

export default {
  get_all(id) {
    return Api().get(`notifications/${id}`)
  },
}
