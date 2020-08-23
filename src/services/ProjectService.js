import Api from './Api'

export default {
  get() {
    return Api().get('project')
  },
  post(data) {
    return Api().post('project/', data)
  },
  put(data) {
    return Api().put(`project/${data.id}/`, data)
  },
  delete(id) {
    return Api().delete(`project/${id}/`)
  },
}
