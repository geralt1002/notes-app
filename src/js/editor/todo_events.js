import axios from '../axios-config';

export function getAll() {
  return new Promise((resolve, reject) => {
    axios
      .get('/lists')
      .then(res => res.data)
      .then(items => resolve(items))
      .catch(err => console.log(err));
  });
}
export function add(title) {
  return new Promise((resolve, reject) => {
    axios
      .post('/lists', {
        title,
        Date: '18/11/2019 11:00'
      })
      .then(res => res.data)
      .then(items => resolve(items))
      .catch(err => console.log(err));
  });
}
export function remove(itemId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/lists/${itemId}`)
      .then(res => res.data)
      .then(items => resolve(items))
      .catch(err => console.log(err));
  });
}
export function save(itemId, todoContent) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/lists/${itemId}`, {
        title: todoContent
      })
      .then(res => res.data)
      .then(items => resolve(items))
      .catch(err => console.log(err));
  });
}
export function saveMD(itemId, todoMDContent) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/lists/${itemId}`, {
        body: todoMDContent
      })
      .then(res => res.data)
      .then(items => resolve(items))
      .catch(err => console.log(err));
  });
}
