import UserService from "../services/userService";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { DriversRidesList } from "./DriversRidesList";

export class Rides extends React.Component {
  state = {
    driversRides: [],
    clicked: false,
    selectedRideId: null
  };
  componentDidMount() {
    this.showDriversRides();
  }

  handleClick(id) {
    this.setState({
      clicked: !this.state.clicked,
      selectedRideId: id
    });
  }

  showDriversRides() {
    api
      .get("Ride")
      .then(response => {
        if (response.status == 200) {
          const d = response.data;
          this.setState({ driversRides: d });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  render() {
    return (
      <DriversRidesList
        selectedRide={this.state.selectedRideId}
        rideClicked={this.state.clicked}
        onRideClick={this.handleClick.bind(this)}
        driversRides={
          this.state.clicked && this.state.selectedRideId != null
            ? this.state.driversRides.filter(
                x => x.rideId == this.state.selectedRideId
              )
            : this.state.driversRides
        }
      />
    );
  }
}
export default Rides;
