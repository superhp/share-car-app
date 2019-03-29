import React from "react";
import Paper from "@material-ui/core/Paper";
import "typeface-roboto";

import api from "../../../helpers/axiosHelper";
import { DriversRidesList } from "./DriversRidesList";

import "../../../styles/genericStyles.css";
import SnackBars from "../../common/Snackbars";
import { SnackbarVariants } from "../../common/SnackbarVariants"

export class Rides extends React.Component {
  state = {
    rides: [],
    requests: [],
    passengers: [],
    clicked: false,
    selectedRideId: null,
    snackBarClicked: false,
    snackBarMessage: null,
    snackBarVariant: null
  };
  componentDidMount() {
    this.getDriversRides();
    this.getDriverPassengers();
    this.getDriverRequests();
  }

  showSnackBar(message, variant) {
    this.setState({
      snackBarClicked: true,
      snackBarMessage: message,
      snackBarVariant: SnackbarVariants[variant]
    });
    setTimeout(
      function () {
        this.setState({ snackBarClicked: false });
      }.bind(this),
      3000
    );
  }

  handleRideDelete(rideToDelete) {
    api.put("Ride/disactivate", rideToDelete).then(res => {
      if (res.status === 200) {
        this.setState({
          rides: this.state.rides.filter(
            x => x.rideId !== rideToDelete.rideId
          ),
          clicked: false,
          selectedRideId: null
        });
      }
    }).catch(() => {
      this.showSnackBar("Failed to delete ride", 2);
    });
  }

  handleClick(id) {
    this.setState({
      clicked: this.state.selectedRideId === id ? !this.state.clicked : true,
      selectedRideId: id
    });
  }

  getDriversRides() {
    api.get("Ride")
      .then(response => {
        if (response.status === 200) {
          this.setState({ rides: response.data });
        }
      })
      .catch((error) => {
        this.showSnackBar("Failed to load rides", 2)
      });
  }

  getDriverPassengers() {
    api
      .get("Passenger")
      .then(response => {
        if (response.status === 200) {
          this.setState({ passengers: response.data });
        }
      })
      .catch((error) => {
        this.showSnackBar("Failed to load passengers", 2)
      });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ clickedRequest: false });
  };

  sendRequestResponse(button, response, requestId, rideId, driverEmail) {
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    api.put("/RideRequest", data).then(res => {
      if (res.status === 200) {
        if (response === 1) {
          this.showSnackBar("Request accepted", 0)
          var request = this.state.requests.find(x => x.requestId === requestId);
          this.setState({
            passengers: [...this.state.passengers, {
              firstName: request.passengerFirstName,
              lastName: request.passengerLastName,
              phone: request.passengerPhone,
              longitude: request.longitude,
              latitude: request.latitude,
              route: request.route,
              rideId: request.rideId,
            }],
            clickedRequest: true,
          });

        } else {
          this.showSnackBar("Request denied", 0)
        }
        this.setState({
          clickedRequest: true,
          requests: this.state.requests.filter(
            x => x.requestId !== requestId
          ),
        });
      }
    }).catch((error) => {
      if (error.response && error.response.status === 409) {
        this.showSnackBar(error.response.data, 2)
      }
      else {
        this.showSnackBar("Failed to respond to request", 2)
      }
    });
  }

  getDriverRequests() {
    api
      .get("RideRequest/driver")
      .then(response => {
        if (response.status === 200)
          this.setState({ requests: response.data });
      })
      .then(() => {
        const unseenRequests = [];

        for (let i = 0; i < this.state.requests.length; i++) {
          if (!this.state.requests[i].seenByDriver) {
            unseenRequests.push(this.state.requests[i].requestId);
          }
        }
        if (unseenRequests.length !== 0) {
          api.post("RideRequest/seenDriver", unseenRequests).then(res => {
          });
        }
      })
      .catch((error) => {
        this.showSnackBar("Failed to load requests", 2)
      });
  }

  sendRequests() {
    return this.state.rides.length !== 0
      ? this.state.requests.length !== 0
        ? this.state.clicked
          ? this.state.requests.filter(
            x => x.rideId === this.state.selectedRideId
          )
          : []
        : []
      : [];
  }
  render() {

    return (
      <div>
        <DriversRidesList
          onDelete={this.handleRideDelete.bind(this)}
          handleRequestResponse={(button, response, requestId, rideId, driverEmail) => { this.sendRequestResponse(button, response, requestId, rideId, driverEmail) }}
          selectedRide={this.state.selectedRideId}
          rideClicked={this.state.clicked}
          onRideClick={this.handleClick.bind(this)}
          rides={this.state.rides.length !== 0
            ? this.state.rides
            : []}
          passengers={this.state.rides.length !== 0
            ? this.state.passengers.length !== 0
              ? this.state.passengers.filter(x => x.rideId === this.state.selectedRideId)
              : [] 
            : []}
          requests={this.state.rides.length !== 0
            ? this.state.requests.length !== 0
              ? this.state.requests.filter(x => x.rideId === this.state.selectedRideId)
              : []
            : []}
        />
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
          variant={this.state.snackBarVariant}
        />
      </div>
    );
  }
}
export default Rides;
