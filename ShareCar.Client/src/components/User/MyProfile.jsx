// @flow
import React, { Component } from "react";

import UserService from "../../services/userService";
import AuthenticationService from "../../services/authenticationService";
import history from "../../helpers/history";

type MyProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
class MyProfile extends Component<{}, MyProfileState> {
  userService = new UserService();
  authService = new AuthenticationService();
  state: MyProfileState = { loading: true, user: null };

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateLoggedInUser);
  }

  updateLoggedInUser = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
  };

  logout = () => {
    this.authService.logout(this.userLoggedOut);
  };

  userLoggedOut = () => {
    history.push("/login");
  };

  render() {
    const content = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : this.state.user === null ? (
      <p>The user failed to load</p>
    ) : (
      <div>
        <div>
          <img alt="Profile" src={this.state.user.profilePicture} />
        </div>
        <div>
          {this.state.user.firstName} {this.state.user.lastName}
        </div>

        <div>
          <button type="button" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <h1>My profile</h1>
        {content}
      </div>
    );
  }
}

export default MyProfile;
