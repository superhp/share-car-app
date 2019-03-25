import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../../styles/genericStyles.css";
import RidePassengerCard from "./RidePassengerCard";
const fontColor = {
    color: "#007BFF"
};

export const RidePassengersList = (props) => (
    props.passengers != null ? (
      <Grid container justify="center">
            <Grid item xs={12}>
            {console.log(props)}

            <Typography style={fontColor} variant="title">
              Passengers
            </Typography>
          </Grid>
          {props.passengers.length !== 0
            ? props.passengers.map((pas, index) => (
                  <RidePassengerCard 
                  passenger = {pas}
                  />
              ))
            : "Ride doesn't have any passengers"}
        </Grid>
      ) : null
);