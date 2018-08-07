import * as React from "react";

 class RideCompletedNotification extends React.Component {

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
                        </tr>

                    )
                }
            </tbody>

    </div>
    );
  }
}export default RideCompletedNotification;
