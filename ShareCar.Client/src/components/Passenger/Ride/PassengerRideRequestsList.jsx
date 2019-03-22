import * as React from "react";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import MapComponent from "../../Maps/MapComponent";
import { Status } from "../../../utils/status";

import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";
import api from "../../../helpers/axiosHelper";


export class PassengerRideRequestsList extends React.Component {
    state = {
        show: false,
        coordinates: null,
        route: null,
        requests:[],
    }

    cancelRequest(id) {
        var requests = this.state.requests;
        var index = requests.findIndex(x => x.requestId === id);
        var request = requests[index];
    
        let data = {
          RequestId: request.requestId,
          Status: Status[4],
          RideId: request.rideId,
          DriverEmail: request.driverEmail
        };
        api.put("RideRequest", data).then(res => {
          if (res.status === 200) {
            requests[index].status = 4;
            this.setState({ requests: requests });
          }
        })
          .catch(error => {
            this.showSnackBar("Failed to cancel request", 2)
          });
    
      }
    
      showPassengerRequests() {
        api
          .get("RideRequest/passenger")
          .then(response => {
            if (response.data !== "") {
              this.setState({ requests: response.data });
            }
          })
          .then(() => {
            const unseenRequests = [];
    
            for (let i = 0; i < this.state.requests.length; i++) {
              if (!this.state.requests[i].seenByPassenger) {
                unseenRequests.push(this.state.requests[i].requestId);
              }
            }
    
            if (unseenRequests.length !== 0) {
              api.post("RideRequest/seenPassenger", unseenRequests).then(res => {
              });
            }
          })
          .catch((error) => {
            this.showSnackBar("Failed to load requests", 2)
          });
      }
    

    render() {
        return (
            <div className="request-card-container">
                <Card className="request-card">
                    {this.state.requests.map((req, i) =>
                        <tr key={i}>
                            <CardContent >
                                <Typography variant="headline">
                                    {req.seenByPassenger ? "" : "NEW  "}
                                    Name: {req.driverFirstName} {req.driverLastName}
                                </Typography>
                                <Typography color="textSecondary">
                                    Date: <Moment date={req.rideDate} format="MM-DD HH:mm" />
                                </Typography>
                                <Typography component="p">
                                    Status: {Status[parseInt(req.status)]}
                                </Typography>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            coordinates: { longitude: req.longitude, latitude: req.latitude },
                                            route: req.route,
                                            show: !this.state.show
                                        });

                                    }}
                                >
                                    Show on map
                        </Button>
                                {
                                    req.status === 0 || req.status === 1 ? (
                                        <Button
                                            onClick={() => { this.cancelRequest(req.requestId) }}
                                        >
                                            Cancel request
                        </Button>
                                    )
                                        : (<div> </div>)
                                }
                            </CardContent>
                        </tr>
                    )}
                </Card>

                {this.state.show ? (
                    <Card className="request-card requestMap">
                        <MapComponent
                            id="map"
                            pickUpPoint={this.state.coordinates}
                            route={this.state.route}
                            show={this.state.show}
                        />
                    </Card>

                ) : (
                        <div></div>
                    )}
            </div>


        )
    }
}