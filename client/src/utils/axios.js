import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1000/api/',
  timeout: 3000,
  headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
});

export default instance;
// Authorization: `Bearer ${localStorage.getItem('TOKEN')}
