import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
export class RidesOfDriver extends React.Component {


    render() {
        return (
            <tbody>
                {
                    this.props.rides.map(ride =>
                        <tr key={ride.id}>
                          {
                    ride.driverEmail === this.props.driver
                   ?        <td>RideId: {ride.rideId} </td>
                : <td></td>    
                }
                            </tr>

                    )
                }
            </tbody>
        );
    }
}
export default RidesOfDriver;