import Api from "./Api";

export default {
  get_notes() {
    return Api().get('notes')
  },
  add_note(note) {
    return Api().post('notes/', note)
  },
  update_note(note) {
    return Api().post(`notes/${note.id}`, note)
  }, delete_note(note) {
    return Api().delete(`notes/${note}`)
  },
}
