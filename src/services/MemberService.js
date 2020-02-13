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
      params: {
        project: member.project
      },
      headers: {
        Authorization: 'Token ' + store().getters['account/token']
      }
    })
  }
}
