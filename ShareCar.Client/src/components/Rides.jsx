import UserService from "../services/userService";
import RideService from "../services/rideService";
import React, { Component } from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { DriversRidesList } from "./DriversRidesList";



export class Rides extends React.Component {
    state = {
        driversRides: []
    };
    componentWillMount() {
        this.showDriversRides();
        console.log(this.props.driversRides);
    }
    showDriversRides() {
        api
            .get("Ride")
            .then(response => {
                const d = response.data;
                this.setState({ driversRides: d });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    render() {
        return (
            <div>
                <DriversRidesList driversRides={this.state.driversRides} />
            </div>
        );
    }
}
export default Rides;

