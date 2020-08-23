import Api from "./Api";

export default {
  get_members(project) {
    return Api().get(`membership/?project=${project}`)
  },
  add_member(member) {
    return Api().post('membership/', member)
  },
  put(member) {
    member.user = member.user.id
    return Api().put(`membership/${member.id}/`, member)
  }
}
