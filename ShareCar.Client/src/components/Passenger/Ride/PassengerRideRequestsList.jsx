import * as React from "react";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MapComponent from "../../Maps/MapComponent";
import { Status } from "../../../utils/status";
import Grid from "@material-ui/core/Grid";
import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";
import api from "../../../helpers/axiosHelper";
import SnackBars from "../../common/Snackbars";
import { SnackbarVariants } from "../../common/SnackbarVariants"
import PassengerRideRequestCard from "../PassengerRideRequestCard"

const style = {
    margin: "1em 0",
  }

export class PassengerRideRequestsList extends React.Component {
    state = {
        show: false,
        coordinates: null,
        route: null,
        requests: [],
        snackBarClicked: false,
        snackBarMessage: null,
        snackBarVariant: null,
    }

    componentDidMount() {
        this.showPassengerRequests();
    }

    showSnackBar(message, variant) {
        this.setState({
            snackBarClicked: true,
            snackBarMessage: message,
            snackBarVariant: SnackbarVariants[variant]
        });
        setTimeout(
            function () {
                this.setState({ snackBarClicked: false });
            }.bind(this),
            3000
        );
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
            <Grid container style={style} justify="center">
                <Grid item xs={12} >
               {this.state.requests.length > 0 
               ? <div>
               {this.state.requests.map((req, i) =>
                    <PassengerRideRequestCard
                        request={req}
                        key={i}
                        index={i}
                        cancelRequest ={id => {this.cancelRequest(id)}}
                    />
                )}
                </div>
                : <h3>You have no requests</h3>
               }
                 </Grid>
                <SnackBars
                    message={this.state.snackBarMessage}
                    snackBarClicked={this.state.snackBarClicked}
                    variant={this.state.snackBarVariant}
                />
            </Grid>
        )
    }
}