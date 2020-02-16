import Api from "./Api";
import store from '../store/index'

export default {
  get_members(project) {
    return Api().get('memberships/', {
      params: {
        project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },add_member(member) {
    console.log(member)
    return Api().post('memberships/',member,{
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  },put(member) {
    member.user = member.user.id
    return Api().put(`memberships/${member.id}/`, member ,{
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  }
}
