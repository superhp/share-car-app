import * as React from "react";
import "typeface-roboto";

import api from "../../../helpers/axiosHelper";
import MapComponent from "../../Maps/MapComponent";
import { PendingRequests } from "./PendingRequests";

import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";

export class DriverRideRequestsList extends React.Component {

  render() {
    return (
      <div>
        <PendingRequests
          rideRequests={this.props.requests}
          rides={this.props.rides}
          selectedRide={this.props.selectedRide}
          handleRequestResponse={(button, response, requestId, rideId, driverEmail) =>
            this.props.handleRequestResponse(button, response, requestId, rideId, driverEmail)}
          passengers={this.props.passengers}
        />
      </div>
    );
  }
}
