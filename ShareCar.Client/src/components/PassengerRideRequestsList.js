import * as React from "react";

export class PassengerRideRequestsList extends React.Component {
    

    render(){
        
        return(
            <div>
<tbody>
{
this.props.requests.map(req =>
<tr key={req.id}>
<td>{req.driverEmail}</td>
<td>Who: {req.driverFirstName} {req.driverLastName}</td>
<td>When: {req.dateTime} </td>
<td>Status: {req.status} </td>
</tr>

)
}
</tbody>
</div>
        );
    }
}