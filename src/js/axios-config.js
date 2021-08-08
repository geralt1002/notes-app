import axios from 'axios';

const instance = axios.create({
//   baseURL: 'http://localhost:8001'
  baseURL: 'https://my-json-server.typicode.com/geralt1002/Notes-app/'
});

export default instance;
