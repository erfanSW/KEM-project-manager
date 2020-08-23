import Api from "./Api";

export default {
  get_roles(project) {
    return Api().get('role/', {
      params: {
        project
      },
    })
  }, add_role(role) {
    return Api().post('role/', role, {
      params: {
        project: role.project
      },
    })
  }, put(role) {
    return Api().put(`role/${role.id}/`, role)
  }
}
