import * as React from "react";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MapComponent from "../Maps/MapComponent";
import { Status } from "../../utils/status";
import "../../styles/riderequests.css";
import "../../styles/genericStyles.css";


export default class PassengerRideRequestsCard extends React.Component {

    state = {
        show: false,
    }

    render() {
        return (
            <div>

                <Card className="request-card">

                    <CardContent >
                        <Typography variant="headline">
                            {!this.props.request.seenByPassenger ? (
                                <Badge
                                    className="new-badge"
                                    badgeContent={"new"}
                                    color="primary"
                                />
                            ) : null}
                        </Typography>
                        <Typography variant="headline">

                            Name: {this.props.request.driverFirstName} {this.props.request.driverLastName}
                        </Typography>
                        <Typography color="textSecondary">
                            Date: <Moment date={this.props.request.rideDate} format="MM-DD HH:mm" />
                        </Typography>
                        <Typography component="p">
                            Status: {Status[parseInt(this.props.request.status)]}
                        </Typography>
                        <Button
                            onClick={() => {
                                this.setState({
                                    show: !this.state.show
                                });

                            }}
                        >
                            Show on map
                        </Button>
                        {
                            this.props.request.status === 0 || this.props.request.status === 1 ? (
                                <Button
                                    onClick={() => { this.props.cancelRequest(this.props.request.requestId) }}
                                >
                                    Cancel request
                        </Button>
                            )
                                : (<div> </div>)
                        }
                    </CardContent>
                </Card>



                {this.state.show ? (
                    <Card className="request-card requestMap">
                        <MapComponent
                            pickUpPoint={{longitude: this.props.request.longitude, latitude: this.props.request.latitude}}
                            route={this.props.request.route}
                            index={this.props.index}
                        />
                    </Card>
                ) : (
                        <div></div>
                    )}
            </div>
        )
    }
}
