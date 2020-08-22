import Api from './Api'

export default {
  get() {
    return Api().get('projects')
  },
  post(data) {
    return Api().post('projects/', data)
  },
  put(data) {
    return Api().put(`projects/${data.id}/`, data)
  },
  delete(id) {
    return Api().delete(`projects/${id}/`)
  },
}
