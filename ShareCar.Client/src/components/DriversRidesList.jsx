import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import "../styles/driversRidesList.css";
import { Route, Link } from "react-router-dom";

export class DriversRidesList extends React.Component<{}> {
  state = {
    clicked: false
  };
  handleClick(id) {
    this.setState({ clicked: !this.state.clicked });
    console.log(this.state.clicked);
  }
  render() {
    return (
      <div className="container">
        <h1>List of Rides</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-primary">
                <td>From:</td>
                <td>To:</td>
                <td>Date Time</td>
              </tr>
            </thead>
            <tbody>
              {this.props.driversRides.map((req, index) => (
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
        <Link to="/newRideForm">
          {" "}
          <button type="button" className="btn btn-success btn-lg btn-block">
            Add new Ride
          </button>
        </Link>
        {this.state.clicked ? <h1>Clicked!</h1> : ""}
      </div>
    );
  }
}
