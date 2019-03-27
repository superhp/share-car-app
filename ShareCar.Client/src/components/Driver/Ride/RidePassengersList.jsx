import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../../styles/genericStyles.css";
import RidePassengerCard from "./RidePassengerCard";

export class RidePassengersList extends React.Component {
  render() {
    return (
      this.props.passengers != null ? (
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography className="generic-color" variant="title">
              Passengers
            </Typography>
          </Grid>
          {this.props.passengers.length !== 0
            ? this.props.passengers.map((passenger, index) => (
              <RidePassengerCard
                passenger={passenger}
                index={index}
              />
            ))
            : "Ride doesn't have any passengers"}
        </Grid>
      ) : null
    );
  }
}