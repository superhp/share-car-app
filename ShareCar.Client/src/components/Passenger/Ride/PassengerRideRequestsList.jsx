import * as React from "react";
import { Status } from "../../../utils/status";
import Grid from "@material-ui/core/Grid";
import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";
import api from "../../../helpers/axiosHelper";
import SnackBars from "../../common/Snackbars";
import { SnackbarVariants } from "../../common/SnackbarVariants";
import PassengerRideRequestCard from "../PassengerRideRequestCard";
import { CircularProgress } from "@material-ui/core";

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
        loading: true
    }

    componentDidMount() {
        this.showPassengerRequests();
    }

    componentWillReceiveProps(nextProps) {
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
                    this.setState({ requests: response.data, loading: false });
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
            <div>
                {this.state.loading 
                ? <div className="progress-circle">
                    <CircularProgress />
                </div> 
                : <Grid container justify="center">
                        {this.state.requests.length > 0 ? this.state.requests.map((req, i) =>
                            <Grid style={style} key={i} item xs={12}>
                                <PassengerRideRequestCard
                                    request={req}
                                    key={i}
                                    index={i}
                                    cancelRequest ={id => {this.cancelRequest(id)}}
                                />
                            </Grid>)
                        : <div className="informative-message"><h3>You have no requests</h3></div>
                        } 
                    <SnackBars
                        message={this.state.snackBarMessage}
                        snackBarClicked={this.state.snackBarClicked}
                        variant={this.state.snackBarVariant}
                    />
                </Grid>
                }
            </div>  
        )
    }
}            