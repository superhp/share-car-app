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
    clickedRequest: false
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
      .catch(function(error) {
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
    api.put("https://localhost:44360/api/RideRequest", data).then(res => {
      if (res.status === 200) {
        this.setState({ clickedRequest: true });
      }
    });
  }

  componentDidMount() {
    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longitude,req.latitude], show : true})}>Show on map</button>

  render() {
    return (
      <div>
        {this.state.show ? (
          <MapComponent
            id="map"
            className="requestMap"
            coordinates={this.state.coordinates}
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
          onShowClick={(longitude, latitude) => {
            this.setState({ show: !this.state.show });
            this.setState({ coordinates: [longitude, latitude]});
          }}
          sendRequestResponse={(button, response, requestId, rideId, driverEmail) => 
            this.sendRequestResponse(button, response, requestId, rideId, driverEmail)}
          passengers={this.state.passengers}
        />
      </div>
    );
  }
}
