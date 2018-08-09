import * as React from "react";
import api from "../helpers/axiosHelper";
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
import "../styles/genericStyles.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export class DriverRideRequestsList extends React.Component {
  // constructor(props) {
  //   super(props);

  state = {
    coordinates: [],
    show: false
  };
  // this.child = React.createRef();
  // }

  sendRequestResponse(response, requestId, rideId, driverEmail) {
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    api.put("https://localhost:44360/api/RideRequest", data).then(res => {});
  }

  componentDidMount() {
    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>

  render() {
    return (
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
                    <Button
                      color="primary"
                      onClick={() => {
                        this.sendRequestResponse(
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
                        this.sendRequestResponse(2, req.requestId, req.rideId);
                        window.location.reload();
                      }}
                    >
                      Deny
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    );
  }
}
