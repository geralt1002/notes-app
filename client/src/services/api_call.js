import api from './api';

export default {
  fetchNotes() {
    return api().get('notes');
  },

  addNote(params) {
    return api().post('add_note/', params);
  },

  updateNote(id, params) {
    return api().put(`notes/${id}`, params);
  },

  getNote(id) {
    return api().get(`notes/${id}`);
  },

  deleteNote(id) {
    return api().delete(`notes/${id}`);
  },
};
