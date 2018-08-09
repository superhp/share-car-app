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
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

var moment = require("moment");

export class DriversRidesList extends React.Component<{}> {
  componentDidMount() {
    console.log(this.props.driversRides);
    this.setState({ driversRides: this.props.driversRides });
  }
  render() {
    let detailedRideInfo = !this.props.rideClicked ? (
      <div className="detailedInfoContainer">
        <ViewRideRequests
          driver={true}
          selectedRide={this.props.selectedRideId}
        />
      </div>
    ) : null;
    return (
      <Grid container>
        {this.props.driversRides.map((req, index) => (
          <Grid item xs={12}>
            <Card className="rides-card">
              <CardActions>
                <CardContent>
                  <Typography component="p">
                    {req.fromStreet} {req.fromNumber}, {req.fromCity}
                  </Typography>
                  <Typography color="textSecondary">
                    {req.toStreet} {req.toNumber}, {req.toCity}
                  </Typography>
                  <Typography color="textSecondary">
                    {moment(req.rideDateTime).format("dddd MMM Mo YYYY")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      this.props.onRideClick(req.rideId);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    View
                  </Button>
                </CardActions>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {/* {!this.state.clicked ? (
          <Grid item xs={12}>
            <Link to="/newRideForm">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="add-new-button"
              >
                Add new Ride
              </Button>
            </Link>
          </Grid>
=======
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
>>>>>>> d29da0cb1443c78761169623b355d280ac443153
        ) : (
          <button
            onClick={() => {
              this.setState({ clicked: !this.state.clicked });
            }}
            className="btn btn-primary btn-lg btn-block"
          >
            Back
          </button>
        )} */}
        {detailedRideInfo}
      </Grid>
    );
  }
}
