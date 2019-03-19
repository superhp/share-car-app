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


export class PassengerRideRequestsList extends React.Component {
    state = {
        show: false,
        coordinates: null,
        route: null
    }

    render() {
        return (
            <div className="request-card-container">
                <Card className="request-card">
                    {this.props.requests.map((req, i) =>
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
                                            onClick={() => { this.props.cancelRequest(req.requestId) }}
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