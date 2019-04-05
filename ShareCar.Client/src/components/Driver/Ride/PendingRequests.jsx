import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import api from "../../../helpers/axiosHelper";
import { PendingRequestCard } from "./PendingRequestCard";
import { RidePassengersList } from "./RidePassengersList";
import { Status } from "../../../utils/status";
import "../../../styles/genericStyles.css";

export class PendingRequests extends React.Component {

    seenRequests(requests) {
        const unseenRequests = [];
        for (let i = 0; i < requests.length; i++) {
            if (!requests[i].seenByDriver) {
                unseenRequests.push(requests[i].requestId);
            }
        }
        if (unseenRequests.length !== 0) {
            api.post("RideRequest/seenDriver", unseenRequests).then(res => {
            });
        }
    }

    componentWillReceiveProps(props) {
        if(props.open){
        this.seenRequests(props.rideRequests);
    }
    }

    render() {
        return (
            <Dialog onClose={() => this.props.handleClose()} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <div className="pending-requests">
                    <DialogTitle className="dialog-title">Requests</DialogTitle>
                    <List>
                        {this.props.rideRequests.length > 0
                            ? this.props.rideRequests.map((req, index) => (
                                <ListItem key={index}>
                                    <PendingRequestCard
                                        req={req}
                                        index={index}
                                        onAcceptClick={() => this.props.handleRequestResponse(Status[1], 1, req.requestId, req.rideId, req.driverEmail)}
                                        onDenyClick={() => { this.props.handleRequestResponse(Status[2], 2, req.requestId, req.rideId) }}
                                    />
                                </ListItem>
                            ))
                            : <div className="no-requests-div">No requests</div>}
                    </List>
                    <DialogTitle className="dialog-title">Passengers</DialogTitle>
                    <RidePassengersList
                        passengers={this.props.passengers}
                    />
                </div>
            </Dialog>
        );
    }
}