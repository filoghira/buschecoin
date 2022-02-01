import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:3030/api/";

function handleError(err) {
  switch (err.response.status) {
    case 401:
      console.log("Unauthorized");
      AuthService.logout();
      window.location.reload();
      break;
    case 403:
      console.log("Forbidden");
      break;
    default:
      console.log("Unknown error");
      break;
  }
}

class UserService {
  async getUserBoard() {
    const username = JSON.parse(sessionStorage.getItem("user")).username;
    const user = await axios
      .get(API_URL + "user/" + username, {
        headers: authHeader(),
        params: {
          username: username,
        },
      })
      .then((result) => result.data)
      .catch((err) => {
        handleError(err);
      });
    return user;
  }

  async getInventory() {
    const username = JSON.parse(sessionStorage.getItem("user")).username;
    const user = await axios
      .get(API_URL + "user/" + username + "/inventory", {
        headers: authHeader(),
        params: {
          username: username,
        },
      })
      .then((result) => result.data)
      .catch((err) => handleError(err));
    return user;
  }
}

export default new UserService();
