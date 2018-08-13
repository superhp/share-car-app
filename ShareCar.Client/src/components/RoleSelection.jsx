//@flow
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import UserService from "../services/userService";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import driverLogo from "../images/driver.png";
import passengerLogo from "../images/passenger.png";
import RideCompletedNotification from "./RideCompletedNotification";
import "../styles/roleSelection.css";
import axios from "axios";
import api from "../helpers/axiosHelper";
import Driver from "./Driver";
import { RoleContext } from "../helpers/roles";
import RideRequestForm from "../components/RideRequestForm";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import test from "../components/TestMap";

const options = {
  position: "bottom center",
  timeout: 3000,
  offset: "30px",
  transition: "fade",
  type: "success"
};

class RoleSelection extends Component<RoleSelectionState, MyProfileState> {
  userService = new UserService();
  authService = new AuthenticationService();

  state = {
    loading: true,
    user: null,
    rideNotifications: [],
    showNotification: false,
    roleSelection: {
      isDriver: null
    }
  };

  componentDidMount() {
    api.get(`/Ride/checkFinished`).then(response => {
      console.log(response.data);
      this.state.rideNotifications = response.data;
      //  this.setState({ rideNotifications: response.data });
      if (response.data.length != 0) {
        this.state.showNotification = true;
      } else {
        this.state.showNotification = false;
      }
      console.log(this.state.rideNotifications.length);
      this.userService.getLoggedInUser(this.updateLoggedInUser);
    });
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

  handleRoleSelection(isDriver) {
    var currentState = this.state.roleSelection;
    currentState.isDriver = isDriver;
    this.setState({ roleSelection: currentState });
  }

  render() {
    const content = this.state.loading ? (
      <p>
        <em>Loading..</em>
      </p>
    ) : this.state.user == null ? (
      <p>Failed</p>
    ) : (
      <div>
        {this.state.showNotification ? (
          <RideCompletedNotification rides={this.state.rideNotifications} />
        ) : (
          <div />
        )}
        <RoleContext.Consumer>
          {({ role, changeRole }) => (
            <div className="role-container">
              <Link to="/driver/rides" onClick={changeRole("driver")}>
                <img className="role-image" src={driverLogo} />
              </Link>
              <h2 className="role-selection">Driver</h2>

              <Link to="/passenger/Requests" onClick={changeRole("passenger")}>
                <img className="role-image" src={passengerLogo} />
              </Link>
              <h2 className="role-selection">Passenger</h2>
            </div>
          )}
        </RoleContext.Consumer>
      </div>
    );
    return <div>{content}</div>;
  }
}
export default RoleSelection;
