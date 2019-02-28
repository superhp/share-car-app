// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";

import SnackBars from "../common/Snackbars";
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
  snackBarMessage: string
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
    api.post(`https://localhost:44360/api/user`, data).then(res => {
      if (res.status === 200) {
        this.setState({
          snackBarClicked: true,
          snackBarMessage: "Profile updated!"
        });
      }
    });
  }

  render() {
    console.log("user", this.state.user);
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
        />
        ;
      </div>
    );
  }
}

export default withAlert(UserProfile);
