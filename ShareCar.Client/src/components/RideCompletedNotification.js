import * as React from "react";
import api from "../helpers/axiosHelper";

class RideCompletedNotification extends React.Component {

    sendResponse(response, rideId){
    api.post(`https://localhost:44360/api/Ride/passengerResponse`, response, rideId);
}
    render() {
        console.log(this.props.rides);
        return (
            <div>
                <h1>Have you participated in these Rides ? </h1>

                <table>
                {
                    this.props.rides.map(ride =>
                        <tr key={ride.id}>
                            <td>Who: {ride.driverFirstName} {ride.driverLastName}</td>
                            <td>When: {ride.rideDate} </td>
                            <td>Where: {ride.address} </td>
                        </tr>
<tr><button onClick={()=>{this.sendResponse(true, ride.rideId)}}> YES</button></tr>
<tr><button onClick={()=>{this.sendResponse(false,ride.rideId)}}> NO</button></tr>
                    )
                }
                </table>

            </div>
        );
    }
}
export default RideCompletedNotification;
