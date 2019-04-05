import * as React from "react";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MapComponent from "../Maps/MapComponent";
import { Status } from "../../utils/status";
import Grid from "@material-ui/core/Grid";
import "../../styles/riderequests.css";
import "../../styles/genericStyles.css";
import "../../styles/driversRidesList.css";


export default class PassengerRideRequestsCard extends React.Component {

    state = {
        show: false,
    }

    render() {
        return (
            <div>
            <Card className="request-card generic-card">
                <Grid container className="requests-card-container">
                    <Grid item xs={8}>
                        {!this.props.request.seenByPassenger ? 
                            <Badge
                                className="rides-badge"
                                badgeContent={"new"}
                                color="primary"
                            />
                         : null}
                        <CardContent >
                            <Typography className="generic-color" component="p">
                                Request for {this.props.request.driverFirstName} {this.props.request.driverLastName}
                            </Typography>
                            <Typography color="textSecondary">
                                Date: <Moment date={this.props.request.rideDate} format="MM-DD HH:mm" />
                            </Typography>
                            <Typography component="p">
                                Status: {Status[parseInt(this.props.request.status)]}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={4} className="list-buttons">
                        <Button
                            variant="contained"
                            className="show-on-map"
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
                                    variant="contained"
                                    className="cancel-request"
                                    onClick={() => { this.props.cancelRequest(this.props.request.requestId) }}
                                >
                                    Cancel request
                        </Button>
                            )
                                : (<div> </div>)
                        } 
                    </Grid>
                    
                        
                </Grid>
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