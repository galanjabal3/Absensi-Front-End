import http from "../http-common";

class AbsenDataService {
  getAll() {
    return http.get("/absen");
  }

  get(id) {
    return http.get(`/absen/${id}`);
  }

  create(data) {
    return http.post("/absen/create", data);
  }

  update(id, data) {
    return http.put(`/absen/${id}`, data);
  }

  delete(id) {
    return http.delete(`/absen/${id}`);
  }

  deleteAll() {
    return http.delete(`/absen`);
  }

  findByUsername(username) {
    return http.get(`/absen?username=${username}`);
  }
}

export default new AbsenDataService();