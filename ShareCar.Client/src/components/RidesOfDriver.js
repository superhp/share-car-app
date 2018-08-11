import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
export class RidesOfDriver extends React.Component {

sendrequest(rideId, driverEmail){

}

    render() {
        return (
            <tbody>
                {
                    this.props.rides.map(ride =>
                        <tr key={ride.id}>
                          {
                    ride.driverEmail === this.props.driver
                   ?    <div>
                       <td>RideId: {ride.rideId} </td>
                   <button>Request</button>
                   </div>
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