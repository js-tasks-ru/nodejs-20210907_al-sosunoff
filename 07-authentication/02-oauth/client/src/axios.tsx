import axios from 'axios';

const { protocol, hostname } = window.location;

const api = axios.create({
  baseURL: `${protocol}//${hostname}:3000/api`,
  timeout: 200000,
  // withCredentials: true,
});

export { api as axios };
