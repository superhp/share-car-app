import * as React from "react";

 class RideCompletedNotification extends React.Component {

  render() {
      console.log(this.props.rides);
    return (
    <div>
<h1>Have you participated in these Rides ? </h1>

  <tbody>
                {
                    this.props.rides.map(req =>
                        <tr key={req.id}>
                            <td>Who: {req.driverFirstName} {req.driverLastName}</td>
                            <td>When: {req.rideDate} </td>
                            <td>Where: {req.address} </td>
                        </tr>

                    )
                }
            </tbody>

    </div>
    );
  }
}export default RideCompletedNotification;
