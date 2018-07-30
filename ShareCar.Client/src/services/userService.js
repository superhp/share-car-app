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

  getUserProfile = (callback: UserProfileData => void) => {
    api
      .get("user/mock")
      .then(response => {
        callback((response.data: UserProfileData));
      })
      .catch(function(error) {
        console.error(error);
      });
  };
}

export default UserService;
