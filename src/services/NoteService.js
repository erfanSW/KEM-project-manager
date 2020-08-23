import Api from "./Api";

export default {
  get_notes() {
    return Api().get('note')
  },
  add_note(note) {
    return Api().post('note/', note)
  },
  update_note(note) {
    return Api().post(`note/${note.id}`, note)
  }, delete_note(note) {
    return Api().delete(`note/${note}`)
  },
}
