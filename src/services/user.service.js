import axios from 'axios';
import authHeader from './auth-header';
// import http from "../http-common";

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAll() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/siswa/${id}` , { headers: authHeader() });
  }

  create(data) {
    return axios.post("/siswa", data);
  }

  update(id, data) {
    return axios.put(`/siswa/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/siswa/${id}`);
  }

  deleteAll() {
    return axios.delete(`/siswa`);
  }

  findByUsername(username) {
    return axios.get(`/siswa?username=${username}`);
  }
}

export default new UserService();