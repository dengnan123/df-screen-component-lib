import axios from 'axios';
import { API_HOST } from '../../config';
// const server_port = process.env.NODE_ENV === 'production' ? window.location.port : 3001;
const API = axios.create({
  baseURL: API_HOST,
});

API.interceptors.request.use(config => {
  return config;
});

API.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export default API;
