// @flow
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import UserService from "../services/userService";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import driverLogo from "../images/driver.png";
import passengerLogo from "../images/passenger.png";
import "../styles/roleSelection.css";
import "../styles/genericStyles.css";
import Driver from "./Driver";

class RoleSelection extends Component<{}, MyProfileState> {
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
        <em>Loading..</em>
      </p>
    ) : this.state.user == null ? (
      <p>Failed</p>
    ) : (
      <div className="role-container">
        <h1 className="role-text">Passenger</h1> 
        <Link to="/passenger">
          {" "}
          <img className="role-image" src={passengerLogo} />
        </Link>
        <h1 className="role-text">Driver</h1>
        <Link to="/driver">
          {" "}
          <img className="role-image" src={driverLogo} />
        </Link>
      </div>
    );
    return <div>{content}</div>;
  }
}
export default RoleSelection;
