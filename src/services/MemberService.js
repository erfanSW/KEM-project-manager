import Api from "./Api";

export default {
  get_members(project) {
    return Api().get('memberships/', {
      params: {
        project: project.project_id
      },
    })
  }, add_member(member) {
    return Api().post('memberships/', member)
  }, put(member) {
    member.user = member.user.id
    return Api().put(`memberships/${member.id}/`, member)
  }
}
