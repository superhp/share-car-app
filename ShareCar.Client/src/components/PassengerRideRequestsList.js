import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
export class PassengerRideRequestsList extends React.Component {



    render() {
        return (
            <tbody>
                {
                    this.props.requests.map(req =>
                        <tr key={req.id}>

                            <td >{req.seenByPassenger ? "" : "NEW  "}</td>
                            <td>Who: {req.driverFirstName} {req.driverLastName}</td>
                            <td>When: {req.rideDate} </td>
                            <td>Where: {req.address} </td>
                            <td>Status: {Status[parseInt(req.status)]} </td>
                        </tr>

                    )
                }



            </tbody>
        );
    }
}