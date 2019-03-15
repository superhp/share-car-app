import * as React from "react";

import api from "../../../helpers/axiosHelper";
import { PassengerRideRequestsList } from "../../Passenger/Ride/PassengerRideRequestsList";
import { DriverRideRequestsList } from "./DriverRideRequestList";

export class ViewRideRequests extends React.Component {
  state = {
    driverRequests: [],
    passengerRequests: []
  };

  componentWillMount() {
    this.props.driver
      ? this.showDriverRequests()
      : this.showPassengerRequests();
  }
  handleRequestClick(button, requestId) {
    if (button === "Accept" || button === "Deny") {
      this.setState({
        driverRequests: this.state.driverRequests.filter(
          x => x.requestId !== requestId
        )
      });
    }
  }

  coordinatesToLocation(latitude, longitude) {
    return new Promise(function (resolve, reject) {
      fetch(
        "//eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&format=json"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          resolve(json);
        });
    });
  }

  cancelRequest(id) {

    var requests = this.state.passengerRequests;
    var index = requests.findIndex(x => x.id === id);
    var request = requests[index];

    let data = {
      RequestId: request.requestID,
      Status: "Canceled",
      RideId: request.rideId,
      DriverEmail: request.driverEmail
    };
    api.put("https://localhost:44360/api/RideRequest", data).then(res => {
      if (res.status === 200) {
        requests.splice(index, 1);
        this.setState({ passengerRequests: requests });
      }
    })
      .catch(error => {
        console.error(error);
      });

  }

  showPassengerRequests() {
    api
      .get("RideRequest/false")
      .then(response => {
        if (response.data !== "") {
          this.setState({ passengerRequests: response.data });
        }
      })
      .then(() => {
        const unseenRequests = [];

        for (let i = 0; i < this.state.passengerRequests.length; i++) {
          if (!this.state.passengerRequests[i].seenByPassenger) {
            unseenRequests.push(this.state.passengerRequests[i].requestId);
          }
        }

        if (unseenRequests.length !== 0) {
          api.post("RideRequest/seenPassenger", unseenRequests).then(res => {
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  showDriverRequests() {
    api
      .get("RideRequest/true")
      .then(response => {
        if (response.status === 200)
          this.setState({ driverRequests: response.data });
      })
      .then(() => {
        const unseenRequests = [];

        for (let i = 0; i < this.state.driverRequests.length; i++) {
          if (!this.state.driverRequests[i].seenByDriver) {
            unseenRequests.push(this.state.driverRequests[i].requestId);
          }
        }

        if (unseenRequests.length !== 0) {
          api.post("RideRequest/seenDriver", unseenRequests).then(res => {
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.driver ? (
          <DriverRideRequestsList
            onRequestClick={this.handleRequestClick.bind(this)}
            selectedRide={this.props.selectedRide}
            rideRequests={
              this.props.selectedRide !== null && this.state.driverRequests !== []
                ? this.state.driverRequests.filter(
                  x => x.rideId === this.props.selectedRide
                )
                : []
            }
          />
        ) : (
            <PassengerRideRequestsList
              requests={this.state.passengerRequests}
              cancelRequest={id => { this.cancelRequest(id) }}
            />
          )}
      </div>
    );
  }
}
