import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import {SnackbarVariants} from "../../common/SnackbarVariants"
import { PendingRequestCard } from "./PendingRequestCard";
import { RidePassengersList } from "./RidePassengersList";
import {Status} from "../../../utils/status"
const fontColor = {
    color: "#007BFF"
};
export class PendingRequests extends React.Component {
    render() {
        return (
            
    <Grid container justify="center">
    {console.log("------------------")}
    {console.log(this.props)}
        <Grid item xs={12}>
            <Typography style={fontColor} variant="title">
                Requests
            </Typography>
        </Grid>
        {this.props.rideRequests.filter(x => x.rideId === this.props.selectedRide).length !== 0
        ? this.props.rideRequests
            .filter(x => x.rideId === this.props.selectedRide)
            .map((req, index) => (
                <Grid item xs={12}>
                    <Grid container>
                        <PendingRequestCard 
                            req={req}
                            index={index}
                            key={index}
                            onAcceptClick={() => this.props.handleRequestResponse(Status[1], 1, req.requestId, req.rideId, req.driverEmail)}
                            onDenyClick={() => {this.props.handleRequestResponse(Status[2], 2, req.requestId, req.rideId)}}
                        />
                    </Grid>
                </Grid>
            ))
        : "No requests"}
                        <Grid item xs={12}>

        <RidePassengersList 
            passengers={this.props.passengers}
            rides={this.props.rides}
        />
    </Grid>
    </Grid>
);
    }}