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

export class DriversRidesList extends React.Component {
  render() {
    let detailedRideInfo = this.props.rideClicked ? (
      <ViewRideRequests driver={true} selectedRide={this.props.selectedRide} />
    ) : null;
    return (
      <Grid container>
        {this.props.driversRides.map((req, index) => (
          <Grid key={index} item xs={12}>
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
