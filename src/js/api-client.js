import axios from './axios-config';

export function getAll() {
  return axios
    .get('/lists')
    .then(res => res.data)
    .catch(err => console.log(err));
}
export function add(title) {
  return axios
    .post('/lists', {
      title
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}
export function remove(itemId) {
  return axios
    .delete(`/lists/${itemId}`)
    .then(res => res.data)
    .catch(err => console.log(err));
}
export function save(itemId, todoContent, todoMDContent) {
  return axios
    .patch(`/lists/${itemId}`, {
      title: todoContent,
      body: todoMDContent
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}
