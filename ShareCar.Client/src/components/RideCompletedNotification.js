import * as React from "react";
import api from "../helpers/axiosHelper";
 class RideCompletedNotification extends React.Component {
    sendResponse(rideId, response){
        let data = {
            RideId: rideId,
            Response: response
          };
          console.log(data);
      
          api.post(`http://localhost:5963/api/Passenger`, data).then(res => {
            console.log(res.data);
          });
    }

  render() {


      console.log(this.props.rides);
    return (
    <div>
<h1>Have you participated in these Rides ? </h1>

  <tbody>
                {
                    this.props.rides.map(ride =>
                        <tr key={ride.id}>
                            <td>Who: {ride.driverFirstName} {ride.driverLastName}</td>
                            <td>When: {ride.rideDate} </td>
                            <td>Where: {ride.Street} </td>

                <td>
                  <button
                    onClick={() => this.sendResponse(ride.id, true)}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => this.sendResponse(ride.id, false)}
                  >
                    No
                  </button>
                </td>

                        </tr>

                    )
                }
            </tbody>

    </div>
    );
  }
}export default RideCompletedNotification;
