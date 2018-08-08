import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import "../styles/driversRidesList.css";
import { Route, Link } from "react-router-dom";
import NewRideForm from "./NewRideForm";
import PassengersList from "./PassengersList";
import "../styles/genericStyles.css";
import "../styles/driversRidesList.css";
import { ViewRideRequests } from "../components/ViewRideRequests";
var moment = require("moment");

export class DriversRidesList extends React.Component<{}> {
  state = {
    clicked: false,
    selectedRideId: null
  };
  handleClick(id) {
    this.setState({ clicked: !this.state.clicked, selectedRideId: id });
  }
  render() {
    let detailedRideInfo = this.state.clicked ? (
      <div className="detailedInfoContainer">
        <ViewRideRequests
          driver={true}
          selectedRide={this.state.selectedRideId}
        />
      </div>
    ) : (
      ""
    );
    return (
      <div className="container-fluid">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-primary">
                <td className="generic-text"> My Rides</td>
              </tr>
            </thead>
            <tbody>
              {!this.state.clicked
                ? this.props.driversRides.map((req, index) => (
                    <tr
                      onClick={() => {
                        this.handleClick(req.rideId);
                      }}
                      key={index}
                    >
                      <td>
                        {req.fromStreet} {req.fromNumber}, {req.fromCity}
                      </td>
                      <td>
                        {req.toStreet} {req.toNumber}, {req.toCity}
                      </td>
                      <td>
                        {moment(req.rideDateTime).format("dddd MMM Mo YYYY")}{" "}
                      </td>
                    </tr>
                  ))
                : this.props.driversRides
                    .filter(x => x.rideId == this.state.selectedRideId)
                    .map((req, index) => (
                      <tr
                        onClick={() => {
                          this.handleClick(req.rideId);
                        }}
                        key={index}
                      >
                        <td>
                          {req.fromStreet} {req.fromNumber}, {req.fromCity}
                        </td>
                        <td>
                          {req.toStreet} {req.toNumber}, {req.toCity}
                        </td>
                        <td>
                          {moment(req.rideDateTime).format("dddd MMM Mo YYYY")}
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
        {!this.state.clicked ? (
          <Link to="/newRideForm">
            <button
              type="button"
              className="add-new-button btn btn-success btn-lg btn-block"
            >
              Add new Ride
            </button>
          </Link>
        ) : (
          <button
            onClick={() => {
              this.setState({ clicked: !this.state.clicked });
            }}
            className="btn btn-primary btn-lg btn-block"
          >
            Back
          </button>
        )}
        {detailedRideInfo}
      </div>
    );
  }
}
