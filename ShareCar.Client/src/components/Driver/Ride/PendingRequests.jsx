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
        <Grid item xs={12}>
            <Typography style={fontColor} variant="title">
                Requests
            </Typography>
        </Grid>
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            open={this.props.clickedRequest}
            onClose={() => this.props.handleClose()}
            autoHideDuration={3000}
            variant = {SnackbarVariants[0]}
            message={<span id="message-id">Request accepted</span>}
        />
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
                            onAcceptClick={() => this.props.sendRequestResponse(Status[1], 1, req.requestId, req.rideId, req.driverEmail)}
                            onDenyClick={() => {this.props.sendRequestResponse(Status[2], 2, req.requestId, req.rideId)}}
                        />
                    </Grid>
                </Grid>
            ))
        : "No requests"}
        <RidePassengersList 
            passengers={this.props.passengers}
        />
    </Grid>
);
    }}