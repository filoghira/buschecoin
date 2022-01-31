import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/";

class UserService {
  async getUserBoard() {
    const user = await axios.get(API_URL + "user", {
      headers: authHeader(),
      params: {
        username: JSON.parse(sessionStorage.getItem("user")).username,
      },
    }).then(result => result.data);
    return user;
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
