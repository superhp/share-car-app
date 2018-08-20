import React, { Component } from "react";
import { DriverMap } from "../Driver/DriverMap";
import { PassengerMap } from "../Passenger/PassengerMap";

// General map component where driver creates rides, passenger
// generates ride requests

export default class Map extends React.Component {
  render() {
    {
      return this.props.match.params.role == "driver" ? (
        <DriverMap />
      ) : (
        <PassengerMap />
      );
    }
  }
}
