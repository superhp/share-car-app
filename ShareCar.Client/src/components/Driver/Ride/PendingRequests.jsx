import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import {SnackbarVariants} from "../../common/SnackbarVariants"
import { PendingRequestCard } from "./PendingRequestCard";
import { RidePassengersList } from "./RidePassengersList";
import {Status} from "../../../utils/status";
import "../../../styles/genericStyles.css";

export class PendingRequests extends React.Component {
    render() {
        return (
            <Dialog onClose={() => this.props.handleClose()} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <div>
                    <DialogTitle>Requests</DialogTitle>
                    <List>
                    {this.props.rideRequests.filter(x => x.rideId === this.props.selectedRide).length !== 0
                    ? this.props.rideRequests
                        .filter(x => x.rideId === this.props.selectedRide)
                        .map((req, index) => (
                            <ListItem>
                                <PendingRequestCard 
                                    req={req}
                                    index={index}
                                    key={index}
                                    onAcceptClick={() => this.props.handleRequestResponse(Status[1], 1, req.requestId, req.rideId, req.driverEmail)}
                                    onDenyClick={() => {this.props.handleRequestResponse(Status[2], 2, req.requestId, req.rideId)}}
                                />
                            </ListItem>
                        ))
                    : "No requests"}
                    </List>
                    <DialogTitle>Passengers</DialogTitle>
                    <RidePassengersList 
                        passengers={this.props.passengers}
                        rides={this.props.rides}
                    />
                </div>
            </Dialog>
);
    }}