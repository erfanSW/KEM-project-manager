import Api from "./Api";

export default {
  get_roles(project) {
    return Api().get('roles/', {
      params: {
        project
      },
    })
  }, add_role(role) {
    return Api().post('roles/', role, {
      params: {
        project: role.project
      },
    })
  }, put(role) {
    return Api().put(`roles/${role.id}/`, role)
  }
}
