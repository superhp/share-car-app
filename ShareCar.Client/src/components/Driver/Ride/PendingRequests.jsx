import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

import { PendingRequestCard } from "./PendingRequestCard";
import { RidePassengersList } from "./RidePassengersList";

const fontColor = {
    color: "#007BFF"
};

export const PendingRequests = (props) => (
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
            open={props.clickedRequest}
            onClose={() => props.handleClose()}
            autoHideDuration={3000}
            message={<span id="message-id">Request accepted</span>}
        />
        {props.rideRequests.filter(x => x.rideId === props.selectedRide).length !== 0
        ? props.rideRequests
            .filter(x => x.rideId === props.selectedRide)
            .map((req, index) => (
                <Grid item xs={12}>
                    <Grid container>
                        <PendingRequestCard 
                            req={req}
                            index={index}
                            onShowClick={() => {
                                props.onShowClick();
                                window.scrollTo(0, 0);
                            }}
                            onAcceptClick={() => props.sendRequestResponse("Accept", 1, req.requestId, req.rideId, req.driverEmail)}
                            onDenyClick={() => {
                                props.sendRequestResponse("Deny", 2, req.requestId, req.rideId);
                                window.location.reload();
                            }}
                        />
                    </Grid>
                </Grid>
            ))
        : "No requests"}
        <RidePassengersList 
            passengers={props.passengers}
        />
    </Grid>
);