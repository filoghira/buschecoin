import axios from "axios";

const API_URL = "http://localhost:3030/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          let value = {
            username: username,
            token: response.data.token,
          };
          sessionStorage.setItem("user", JSON.stringify(value));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new AuthService();
