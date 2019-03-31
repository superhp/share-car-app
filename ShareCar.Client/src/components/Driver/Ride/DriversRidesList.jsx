import * as React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import "typeface-roboto";
import SnackBars from "../../common/Snackbars";
import { SnackbarVariants } from "../../common/SnackbarVariants"
import api from "../../../helpers/axiosHelper";
import { DriverRideRequestsList } from "./DriverRideRequestList";

import "../../../styles/driversRidesList.css";
import "../../../styles/genericStyles.css";
import { PendingRequests } from "./PendingRequests";

let moment = require("moment");

const style = {
  margin: "1em 0",
}

export class DriversRidesList extends React.Component {
  state = {
    open: false
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <Grid container>
        {this.props.rides.length !== 0 ? this.props.rides.map((req, index) => (
          <Grid style={style} key={index} item xs={12}>
            <Card className="rides-card generic-card">
            <Grid container className="active-rides-card-container">
            <Grid item xs={8}>
                  <CardContent > 
                    <Typography  className="generic-color" component="p">
                      From {req.fromStreet} {req.fromNumber}, {req.fromCity}
                    </Typography>
                    <Typography  color="textSecondary">
                      To {req.toStreet} {req.toNumber}, {req.toCity}
                    </Typography>
                    <Typography  color="textSecondary">
                      {moment(req.rideDateTime).format("dddd MMM DD YYYY hh:mm")}
                    </Typography>
                  </CardContent>
                  </Grid>
                  <Grid item xs={4} className="list-buttons">
                        <Button
                          onClick={() => {
                            this.props.onRideClick(req.rideId);
                            this.handleClickOpen();
                          }}
                          variant="contained"
                          color="primary"
                          size="small"
                          className="generic-container-color generic-button"
                        >
                          View
                          <InfoIcon/>
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            this.props.onDelete(req);
                            this.props.onRideClick(req.rideId);
                          }}
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
        <PendingRequests
          open={this.state.open}
          rideRequests={this.props.requests}
          rides={this.props.rides}
          passengers={this.props.passengers}
          selectedRide={this.props.selectedRide}
          handleClose={() => this.handleClose()}
          handleRequestResponse={(button, response, requestId, rideId, driverEmail) => this.props.handleRequestResponse(button, response, requestId, rideId, driverEmail)}
        />
      </Grid>
    );
  }
}
