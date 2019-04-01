// @flow
import React, { Component } from "react";

import UserService from "../../services/userService";
import { ViewRideRequests } from "../Driver/Ride/ViewRideRequests";
import { PassengerRideRequestsList } from "./Ride/PassengerRideRequestsList";
import { CircularProgress, withStyles } from "@material-ui/core";
import { styles } from "../../utils/spinnerStyle";

class Passenger extends Component<{}, MyProfileState> {
  userService = new UserService();
  state: MyProfileState = { loading: true, user: null };

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateLoggedInUser);
  }



  updateLoggedInUser = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
    
  };

  render() {
    const content = this.state.loading ? 
      <div>
        <CircularProgress/>
      </div>
      : this.state.user == null ? (
      <p>Failed</p>
    ) : (
      <div className="role-container">
        <PassengerRideRequestsList refetch={this.props.refetch}/>
      </div>
    );
    return <div>{content}</div>;
  }
}

export default withStyles(styles) (Passenger);