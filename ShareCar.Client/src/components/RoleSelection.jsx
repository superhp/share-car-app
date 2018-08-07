// @flow
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import UserService from "../services/userService";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import driverLogo from "../images/driver.png";
import passengerLogo from "../images/passenger.png";
import  RideCompletedNotification from "./RideCompletedNotification";
import "../styles/roleSelection.css";
import "../styles/genericStyles.css";
import axios from "axios";
import api from "../helpers/axiosHelper";
import Driver from "./Driver";

class RoleSelection extends Component<{}, MyProfileState> {
  userService = new UserService();
  authService = new AuthenticationService();

 // state: MyProfileState = { loading: true, user: null };
  
  state = {
    rideNotifications : [],
    MyProfileState : { loading: true, user: null }
  }

componentWillMount(){
  api.get(`/RideRequest/checkFinished`).then(response => {
    console.log(response);
    this.setState({ rideNotifications: response.data });    
  });
}

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
      this.state.rideNotifications.length == 0 
      ? <div className="role-container">
         <h1 className="generic-every-header">Choose a role:</h1> 
        <Link to="/driver">
          {" "}
          <img className="role-image" src={driverLogo} />
        </Link>
        <h1 className="generic-every-header">Driver</h1>
          
        <Link to="/passenger">
          {" "}
          <img className="role-image" src={passengerLogo} />
        </Link>
        <h1 className="generic-every-header">Passenger</h1>
      </div>
      : <RideCompletedNotification rides = {this.state.rideNotifications}/>
      
    );
    return <div>{content}</div>;
  }
}
export default RoleSelection;
