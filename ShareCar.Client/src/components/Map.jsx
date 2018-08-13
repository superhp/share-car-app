import React, { Component } from "react";
import { DriverMap } from "./DriverMap";
import { PassengerMap } from "./PassengerMap";
import history from "../helpers/history";

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
