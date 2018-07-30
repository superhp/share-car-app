// @flow
import api from "../helpers/axiosHelper";

class UserService {
  getLoggedInUser = (callback: User => void) => {
    api
      .get("user")
      .then(response => {
        callback((response.data: User));
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  getUserProfile = (callback: UserProfile => void) => {
    api
      .get("user/mock")
      .then(response => {
        callback((response.data: UserProfile));
      })
      .catch(function(error) {
        console.error(error);
      });
  };
}

export default UserService;
