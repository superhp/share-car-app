import * as React from "react";
import api from "../helpers/axiosHelper";
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
import "../styles/genericStyles.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";
import Snackbar from "@material-ui/core/Snackbar";
import { CardHeader } from "../../node_modules/@material-ui/core";

const fontColor = {
  color: "#007BFF"
}

export class DriverRideRequestsList extends React.Component {
  // constructor(props) {
  //   super(props);

  state = {
    coordinates: [],
    passengers: [],
    show: false,
    clickedRequest: false
  };
  // this.child = React.createRef();
  // }

  componentWillMount() {
    this.getAllPassengers();
  }

  getAllPassengers() {
    api
      .get("Passenger/rideId=" + this.props.selectedRide)
      .then(response => {
        if (response.status == 200) {
          this.setState({ passengers: response.data });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ clickedRequest: false });
  };

  sendRequestResponse(button, response, requestId, rideId, driverEmail) {
    this.props.onRequestClick(button, requestId);
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    api.put("https://localhost:44360/api/RideRequest", data).then(res => {
      if (res.status == 200) {
        this.setState({ clickedRequest: true });
      }
    });
  }

  componentDidMount() {
    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>

  render() {
    let passengersList =
      this.state.passengers != null ? (
        <Grid container justify="center" >
          <Grid item xs={12}>
            <Typography style={fontColor} variant="title">
              Passengers
            </Typography>
          </Grid>
          {this.state.passengers.length != 0 ? this.state.passengers.map((pas, index) => (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="title">
                    #1 {pas.firstName + " " + pas.lastName}
                  </Typography>
                  <Typography variant="p">
                    Phone {pas.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) : "No Passengers For This Drive"}
        </Grid>
      ) : null;

    return (
      <div>
        {this.state.show ? (
          <MapComponent
            id="map"
            className="requestMap"
            coordinates={this.state.coordinates}
            show={this.state.show}
            ref={this.child}
            driver={true}
          />
        ) : (
          ""
        )}
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography style={fontColor} variant="title">
              Pending Requests
            </Typography>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.clickedRequest}
            onClose={this.handleClose}
            autoHideDuration={3000}
            message={<span id="message-id">Request accepted</span>}
          />
          {this.props.rideRequests.filter(
            x => x.rideId == this.props.selectedRide
          ).length != 0
            ? this.props.rideRequests
                .filter(x => x.rideId == this.props.selectedRide)
                .map((req, index) => (
                  <Grid item xs={12}>
                  <Grid container>
                    <Card className="rides-card">
                    <Grid container justify="center">
                    <Grid item xs={12} zeroMinWidth>
                            <Typography component="p">
                              #{index + 1} {req.passengerFirstName}{" "}
                              {req.passengerLastName}
                            </Typography>
                    </Grid>
                          <Grid item xs={12} zeroMinWidth>
                      <CardActions>
                        <Button
                          onClick={() => {
                            this.setState({ show: !this.state.show });
                            this.setState({
                              coordinates: [req.longtitude, req.latitude]
                            });

                            window.scrollTo(0, 0);
                          }}
                        >
                          Show on map
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.sendRequestResponse(
                              "Accept",
                              1,
                              req.requestId,
                              req.rideId,
                              req.driverEmail
                            );
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => {
                            this.sendRequestResponse(
                              "Deny",
                              2,
                              req.requestId,
                              req.rideId
                            );
                            window.location.reload();
                          }}
                        >
                          Deny
                        </Button>
                      </CardActions>
                      </Grid>
                      </Grid>
                    </Card>
                    </Grid>
                    </Grid>
                ))
            : "No requests"}
          {passengersList}
        </Grid>
      </div>
    );
  }
}
