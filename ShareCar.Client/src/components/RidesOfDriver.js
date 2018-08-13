import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
import api from "../helpers/axiosHelper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

var moment = require("moment");

export class RidesOfDriver extends React.Component {
  sendrequest(rideId, driverEmail) {
    var request = {
      RideId: rideId,
      DriverEmail: driverEmail,
      Longtitude: this.props.pickUpPoint[0],
      Latitude: this.props.pickUpPoint[1]
    };
    console.log(request);
    api.post(`https://localhost:44360/api/RideRequest`, request).then(res => {
      console.log(res);
      this.setState({ showForm: false });
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <tbody>
          {this.props.rides.map(ride => (
            <Grid item key={ride.id}>
              {ride.driverEmail === this.props.driver ? (
                <div>
                  <Typography variant="body1">
                    {" "}
                    Date:{" "}
                    {moment(ride.rideDateTime).format(
                      "YYYY-MM-DD HH:MM:SS"
                    )}{" "}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ "background-color": "#007bff" }}
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
                <td />
              )}
            </Grid>
          ))}
        </tbody>
      </Grid>
    );
  }
}
export default RidesOfDriver;
