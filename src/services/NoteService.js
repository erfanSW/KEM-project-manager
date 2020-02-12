import Api from "./Api";

export default {
  get_notes(token) {
    return Api().get('notes',{
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },
  add_note(token, note) {
    return Api().post('notes/', note,{
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },
  update_note(token, note) {
    return Api().post(`notes/${note.id}`, note,{
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },delete_note(token, note) {
    return Api().delete(`notes/${note}`, {
      headers: {
        Authorization: 'Token ' + token
      }
    })
  },
}
