import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import "../styles/driversRidesList.css";
import { Route, Link } from "react-router-dom";
import NewRideForm from "./NewRideForm";
import  "../styles/genericStyles.css";

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
        <h2 className="alert alert-info">Detailed information</h2>
        <NewRideForm
          drive={this.props.driversRides.find(
            x => x.rideId == this.state.selectedRideId
          )}
        />
      </div>
    ) : (
      ""
    );
    return (
      <div className="container">
        {!this.state.clicked ? <h1>List of Rides</h1> : ""}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-primary">
                <td className="generic-text"> From:</td>
                <td className="generic-text">To:</td>
                <td className="generic-text">Date Time</td>
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
                        {req.fromCountry}, {req.fromCity}, {req.fromStreet},
                        {req.fromNumber}
                      </td>
                      <td>
                        {req.toCountry}, {req.toCity}, {req.toStreet},{" "}
                        {req.toNumber}
                      </td>
                      <td>{req.rideDateTime} </td>
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
                          {req.fromCountry}, {req.fromCity}, {req.fromStreet},
                          {req.fromNumber}
                        </td>
                        <td>
                          {req.toCountry}, {req.toCity}, {req.toStreet},{" "}
                          {req.toNumber}
                        </td>
                        <td>{req.rideDateTime} </td>
                      </tr>
                    ))}

            </tbody>
          </table>
        </div>
        {!this.state.clicked ? (
          <Link to="/newRideForm">
            <button type="button" className="btn btn-success btn-lg btn-block">
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
