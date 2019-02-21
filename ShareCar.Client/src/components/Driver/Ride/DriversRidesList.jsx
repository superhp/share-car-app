import * as React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import "typeface-roboto";

import api from "../../../helpers/axiosHelper";
import { ViewRideRequests } from "./ViewRideRequests";

import "../../../styles/driversRidesList.css";
import "../../../styles/genericStyles.css";
import "../../../styles/driversRidesList.css";


let moment = require("moment");

const style = {
  margin: "1em 0",
}
const fontColor = {
  color: "#007BFF"
}
export class DriversRidesList extends React.Component {
  handleDeletion(rideToDisactivate) {
    api.put("Ride/disactivate", rideToDisactivate).then(res => {
      if (res.status === 200) {
        this.props.onDelete(rideToDisactivate);
      }
    });
  }
  render() {
    let detailedRideInfo = this.props.rideClicked ? (
      <div className="detailedInfoContainer">
        <ViewRideRequests
          driver={true}
          selectedRide={this.props.selectedRide}
        />
      </div>
    ) : null;
    return (
      <Grid container>
        {this.props.driversRides.length !== 0 ? this.props.driversRides.map((req, index) => (
          <Grid style={style} key={index} item xs={12}>
            <Card className="rides-card">
            <Grid container >
            <Grid item xs={8}>
                  <CardContent > 
                    <Typography  style={fontColor} component="p">
                      From {req.fromStreet} {req.fromNumber}, {req.fromCity}
                    </Typography>
                    <Typography  color="textSecondary">
                      To {req.toStreet} {req.toNumber}, {req.toCity}
                    </Typography>
                    <Typography  color="textSecondary">
                      {moment(req.rideDateTime).format("dddd MMM DD YYYY")}
                    </Typography>
                  </CardContent>
                  </Grid>
                  <Grid item xs={4}>

                        <Button
                          onClick={() => {
                            this.props.onRideClick(req.rideId);
                          }}
                          variant="contained"
                          color="primary"
                          size="small"
                          className="generic-container-color generic-button"
                        >
                          {!this.props.rideClicked ? "View" : "Hide"}
                          <InfoIcon/>
                        </Button>
                        <Button
                          size="small"
                          onClick={() => this.handleDeletion(req)}
                          variant="contained"
                          color="secondary"
                          className="generic-button"
                        >
                          Delete
                          <DeleteIcon />
                        </Button>
                  </Grid>
                  </Grid>
            </Card>
          </Grid>
        )) : "You have no rides"}
        {detailedRideInfo}
      </Grid>
    );
  }
}
