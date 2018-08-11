import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
import api from "../helpers/axiosHelper";
export class RidesOfDriver extends React.Component {

sendrequest(rideId, driverEmail){
    var request = {
        RideId : rideId,
        DriverEmail : driverEmail,
        City: "Vilnius",
        Street:"gin",
        HouseNumber:1
    }
    api.post(`https://localhost:44360/api/RideRequest`, request).then(res => {
        console.log(res);
        this.setState({ showForm: false });
      });
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
                   <button onClick={()=>{this.sendrequest(ride.rideId, ride.driverEmail)}}>Request</button>
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