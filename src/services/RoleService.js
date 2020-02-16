import Api from "./Api";
import store from "../store/index";

export default {
  get_roles(project) {
    return Api().get('roles/', {
      params: {
        project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },add_role(role) {
    return Api().post('roles/', role,{
      params: {
        project: role.project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },put(role) {
    return Api().put(`roles/${role.id}/`, role,{
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  }
}
