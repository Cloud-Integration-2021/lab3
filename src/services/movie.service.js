import http from "../http-common";

class MovieDataService {
  getAll() {
    return http.get("/api/v1/movies");
  }

  get(id) {
    return http.get(`/api/v1/movies/${id}`);
  }

  create(data) {
    return http.post("/api/v1/movies", data);
  }

  update(id, data) {
    return http.put(`/api/v1/movies/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/v1/movies/${id}`);
  }
}

export default new MovieDataService();