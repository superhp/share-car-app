import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
type driversRidesListState = {
    fromAddress: Address
}
export class DriversRidesList extends React.Component<{}, driversRidesListState>{
    state: driversRidesListState;
    componentDidMount() {
        this.showStartPoint()
    }
    showStartPoint(fromId: number) {
        api
            .get("Location/" + fromId)
            .then(response => {
                const d = response.data;
                this.setState({ fromAddress: d });
                console.log(this.state.fromAddress)
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    /*showDestination(req) {
        api
            .get("Location/" + req.toId)
            .then(response => {
                const d = response.data;
                this.setState({ toAddress: d });
            })
            .catch(function (error) {
                console.error(error);
            });
    }*/
    render() {
        return (
            <div>
                <tbody>
                    {
                        this.props.driversRides.map(req =>

                            <tr key={req.id}>
                                <td>{req.driverEmail}</td>

                                <td>{this.state.fromAddress.country} {this.state.fromAddress.City}</td>

                                {/*<td>{this.state.toAddress.country} {this.state.toAddress.City}</td>*/}
                                <td>{req.passengers}</td>
                                <td>{req.rideDateTime}</td>
                            </tr>
                        )
                    }
                </tbody>
            </div>
        );
    }
}