import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import api from "../../../helpers/axiosHelper";
import SnackBars from "../../common/Snackbars";

import "../../../styles/riderequests.css";
import "../../../styles/driversRidesList.css";
import "../../../styles/genericStyles.css";

let moment = require("moment");

export class RidesOfDriver extends React.Component {
  state = {
    snackBarClicked: false,
    snackBarMessage: ""
  };
  sendrequest(rideId, driverEmail) {
    const request = {
      RideId: rideId,
      DriverEmail: driverEmail,
      Longtitude: this.props.pickUpPoints[0],
      Latitude: this.props.pickUpPoints[1]
    };

    api.post(`https://localhost:44360/api/RideRequest`, request).then(res => {
      this.setState({
        showForm: false,
        snackBarClicked: true,
        snackBarMessage: "Request sent!"
      });
      setTimeout(
        function() {
          this.setState({
            snackBarClicked: false
          });
        }.bind(this),
        3000
      );
    });
  }

  render() {
    return (
      <Grid container justify="center">
            {this.props.rides.map((ride,i) => (
              <Grid item key={i}>
                {ride.driverEmail === this.props.driver.email ? (
                  <div>
                    <Typography variant="body1">
                      {" "}
                      Date:{" "}
                      {moment(ride.rideDateTime).format("YYYY-MM-DD HH:MM:SS")}{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      style={{ "backgroundColor": "#007bff" }}
                      color="primary"
                      onClick={() => {
                        this.sendrequest(ride.rideId, ride.driverEmail);
                      }}
                    >
                      {" "}
                      Request
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
            ))}
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
        />
      </Grid>
    );
  }
}
export default RidesOfDriver;
