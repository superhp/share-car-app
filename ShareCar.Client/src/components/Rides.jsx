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
  componentWillMount() {
    this.showDriversRides();
  }

  handleClick(id) {
    this.setState({
      clicked: !this.state.clicked,
      selectedRideId: id,
      driversRides: this.state.driversRides.filter(x => x.rideId == id)
    });

    if (!this.state.clicked) {
      this.showDriversRides();
    }
  }

  showDriversRides() {
    api
      .get("Ride")
      .then(response => {
        const d = response.data;
        console.log(response.data);
        this.setState({ driversRides: d });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <DriversRidesList
          selectedRide={this.state.selectedRideId}
          rideClicked={this.state.clicked}
          onRideClick={this.handleClick.bind(this)}
          driversRides={this.state.driversRides}
        />
      </div>
    );
  }
}
export default Rides;
