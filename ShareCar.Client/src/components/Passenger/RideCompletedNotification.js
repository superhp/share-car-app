import * as React from "react";
import api from "../../helpers/axiosHelper";

class RideCompletedNotification extends React.Component {

    sendResponse(response, rideId) {
        var passengerResponse = {
            Response: response,
            RideId: rideId
        }
        api.post(`https://localhost:44360/api/Ride/passengerResponse`, passengerResponse);
    }
    render() {
        return (
            <div>
                <h1>Have you participated in these Rides ? </h1>

                <table>
                    {
                        this.props.rides.map(ride =>
                            <tr key={ride.id}>
                                <td>Driver {ride.driverFirstName} {ride.driverLastName}</td>
                                <td>When {ride.rideDateTime} </td>

                                <td>
                                    <button
                                        onClick={() => this.sendResponse(true, ride.rideId)}
                                    >
                                        Yes
                  </button>
                                    <button
                                        onClick={() => this.sendResponse(false, ride.rideId)}
                                    >
                                        No
                  </button>
                                </td>
                            </tr>


                        )
                    }
                </table>

            </div>
        );
    }
}
export default RideCompletedNotification;
