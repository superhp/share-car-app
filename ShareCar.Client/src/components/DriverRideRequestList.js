import * as React from "react";
import api from "../helpers/axiosHelper";
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
import "../styles/genericStyles.css";
<<<<<<< HEAD
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
=======
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
<<<<<<< HEAD
=======
import 'typeface-roboto'
import Snackbar from '@material-ui/core/Snackbar';

>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3

export class DriverRideRequestsList extends React.Component {
  // constructor(props) {
  //   super(props);

  state = {
    coordinates: [],
    show: false,
    clickedRequest: false,
  };
  // this.child = React.createRef();
  // }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ clickedRequest: false });
  };

  sendRequestResponse(button, response, requestId, rideId, driverEmail) {
    this.props.onRequestClick(button, requestId)
    this.setState({clickedRequest: true});
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    // api.put("https://localhost:44360/api/RideRequest", data).then(res => {});
  }

  componentDidMount() {
    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>

  render() {
    return (
<<<<<<< HEAD
      <Grid container justify="center">
        {this.props.rideRequests != null
          ? this.props.rideRequests.map((req, index) => (
              <Grid item xs={12}>
                <Card className="rides-card">
                  <Grid justify="center" container>
                    <CardContent>
                      <Grid item xs={12}>
                        <Typography component="p">
                          #{index + 1} {req.passengerFirstName}{" "}
                          {req.passengerLastName}
                        </Typography>
                      </Grid>
                      <Typography color="textSecondary">
                        {req.address}{" "}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <CardActions>
                    <Button
                      color="primary"
=======
      <div>
        {this.state.show ? (
          <MapComponent
            id="map"
            coords={this.state.coordinates}
            ref={this.child}
            driver={true}
          />
        ) : (
          ""
        )}
        <Grid container justify="center">
        <Grid item xs={12}>
              <Paper>
        <Typography variant="headline" component="h3">
         Pending Requests
        </Typography>
      </Paper>
      </Grid>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.clickedRequest}
          onClose={this.handleClose}
          autoHideDuration={3000}
          message={<span id="message-id">Request accepted</span>}
        />
              {this.props.rideRequests.filter(x=>x.rideId == this.props.selectedRide).map((req, index) => (
                          <Grid item xs={12}>
                          <Card className="rides-card">
                          <Grid container>
                          <Grid item xs={12}>
                              <CardContent>
                                <Typography component="p">
                                #{index + 1} {req.passengerFirstName}{" "}
                      {req.passengerLastName}
                                </Typography>
                              </CardContent>
                              </Grid>
                              </Grid>
                              <CardActions>
                                <Button
>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3
                      onClick={() => {
                        this.setState({ show: true });
                        this.setState({
                          coordinates: [req.longtitude, req.latitude]
                        });

                        window.scrollTo(0, 0);
                      }}
                    >
                      Show on map
                    </Button>
<<<<<<< HEAD
                    <Button
                      color="primary"
=======
                    <Button color="primary"
>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3
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
<<<<<<< HEAD
                    <Button
                      color="secondary"
=======
                    <Button color="secondary"
                    
>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3
                      onClick={() => {
                        this.sendRequestResponse(2, req.requestId, req.rideId);
                        window.location.reload();
                      }}
                    >
                      Deny
                    </Button>
<<<<<<< HEAD
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    );
=======
                            </CardActions>
                          </Card>
                        </Grid>
    ))}
    </Grid>
    </div>);
>>>>>>> a317a72a0600673a8275e0845eef9bf1bc4b93c3
  }
}
