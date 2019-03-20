// @flow
import React, { Component } from "react";
import { withAlert } from "react-alert";
import "typeface-roboto";

import SnackBars from "../common/Snackbars";
import {SnackbarVariants} from "../common/SnackbarVariants";
import api from "../../helpers/axiosHelper";
import AuthenticationService from "../../services/authenticationService";
import history from "../../helpers/history";
import UserService from "../../services/userService";
import { UserProfileForm } from "./UserProfileForm";

import "../../styles/userProfile.css";

type UserProfileState = {
  loading: boolean,
  user: UserProfileData | null,
  snackBarClicked: boolean,
  snackBarMessage: string,
  snackBarVariant: string
};

class UserProfile extends Component<{}, UserProfileState, LayoutProps, MyProfileState> {
  state: MyProfileState = { loading: true, user: null };
  userService = new UserService();
  authService = new AuthenticationService();

  componentDidMount() {
    this.userService.getLoggedInUser(user => this.updateUserProfile(user));
  }

  updateUserProfile = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
  };

  logout = () => {
    this.authService.logout(this.userLoggedOut);
  };

  userLoggedOut = () => {
    history.push("/login");
  };

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      firstName: this.state.user.user.firstName,
      lastName: this.state.user.user.lastName,
      profilePicture: this.state.user.user.pictureUrl,
      email: this.state.user.user.email,
      licensePlate: this.state.user.user.licensePlate,
      phone: this.state.user.user.phone
    };
    api.post(`https://localhost:44347/api/user`, data).then(res => {
      if (res.status === 200) {
        this.showSnackBar("Profile updated", 0);
      }
    }).catch((error) => {
      this.showSnackBar("Failed to update profile", 2);

    });
  }
  showSnackBar(message, variant) {
    this.setState({
      snackBarClicked: true,
      snackBarMessage: message,
      snackBarVariant: SnackbarVariants[variant]
    });
    setTimeout(
      function () {
        this.setState({ snackBarClicked: false });
      }.bind(this),
      3000
    );
  }
  render() {
    const content = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : this.state.user === null ? (
      <p>The user failed to load</p>
    ) : (
      <UserProfileForm 
        onClick={() => this.logout()}
        onNameChange={e => this.setState({user: {...this.state.user.user, firstName: e.target.value}})}
        onSurnameChange={e => this.setState({user: {...this.state.user.user, lastName: e.target.value}})}
        onPhoneChange={e => this.setState({user: {...this.state.user.user, phone: e.target.value}})}
        onLicenseChange={e => this.setState({user: {...this.state.user.user, licensePlate: e.target.value}})}
        onButtonClick={e => {
          this.handleSubmit(e);
          setTimeout(
            function() {
            this.setState({
              snackBarClicked: false
            });
            }.bind(this),
            3000
          );
        }}
        user={this.state.user.user}
        role={this.props.match.params.role}
      />
    );

    return (
      <div>
        {content}{" "}
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
          variant={this.state.snackBarVariant}
        />
        ;
      </div>
    );
  }
}

export default withAlert(UserProfile);
