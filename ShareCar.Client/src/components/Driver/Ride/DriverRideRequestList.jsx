import * as React from "react";
import "typeface-roboto";

import api from "../../../helpers/axiosHelper";
import MapComponent from "../../Maps/MapComponent";
import { PendingRequests } from "./PendingRequests";

import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";

export class DriverRideRequestsList extends React.Component {
  state = {
    coordinates: [],
    passengers: [],
    show: false,
    clickedRequest: false,
    route: null,
  };

  componentWillMount() {
    this.getAllPassengers();
  }

  getAllPassengers() {
    api
      .get("Passenger/rideId=" + this.props.selectedRide)
      .then(response => {
        if (response.status === 200) {
          this.setState({ passengers: response.data });
        }
      })
      .catch(function (error) {
        this.props.showSnackBar("Failed to load passengers", 2)
        console.error(error);
      });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ clickedRequest: false });
  };

  sendRequestResponse(button, response, requestId, rideId, driverEmail) {
    this.props.onRequestClick(button, requestId);
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    api.put("https://localhost:44347/api/RideRequest", data).then(res => {
      if (res.status === 200) {
        if (response === 1) {
          this.props.showSnackBar("Request accepted", 0)
          var request = this.props.rideRequests.find(x => x.requestId === requestId);
          this.setState(prevState => ({
            passengers: [...prevState.passengers, { firstName: request.passengerFirstName, passengerLastName: request.lastName, phone: request.phone }],
            clickedRequest: true
          }));
        } else {
          this.props.showSnackBar("Request denied", 0)
          this.setState({ clickedRequest: true });
        }
      }
    }).catch((error)=>{
      this.props.showSnackBar("Failed to respond to request", 2)
      console.error(error);
    });
  }


  render() {
    return (
      <div>
        {this.state.show ? (
          <MapComponent
            id="map"
            className="requestMap"
            pickUpPoint={this.state.coordinates}
            route={this.state.route}
            show={this.state.show}
            ref={this.child}
            driver={true}
          />
        ) : (
            ""
          )}
        <PendingRequests
          clickedRequest={this.state.clickedRequest}
          handleClose={() => this.handleClose()}
          rideRequests={this.props.rideRequests}
          selectedRide={this.props.selectedRide}
          onShowClick={(index) => {

            this.setState({ coordinates: { longitude: this.props.rideRequests[index].longitude, latitude: this.props.rideRequests[index].latitude }, route: this.props.rideRequests[index].route, show: !this.state.show });
          }}
          sendRequestResponse={(button, response, requestId, rideId, driverEmail) =>
            this.sendRequestResponse(button, response, requestId, rideId, driverEmail)}
          passengers={this.state.passengers}
        />
      </div>
    );
  }
}
