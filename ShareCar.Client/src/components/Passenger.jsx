// @flow
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import UserService from "../services/userService";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import { ViewRideRequests } from "./ViewRideRequests";
import { RequestNewRide } from "./RequestNewRide";
import { NavBar } from "./NavBar";
export default class Driver extends Component<{}, MyProfileState> {
  userService = new UserService();
  state: MyProfileState = { loading: true, user: null };

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateLoggedInUser);
  }

  updateLoggedInUser = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
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
        <h1 className="role-container">Passenger Page</h1>
        <ViewRideRequests driver={false} />
        <RequestNewRide/>
      </div>
    );
    return <div>{content}</div>;
  }
}
