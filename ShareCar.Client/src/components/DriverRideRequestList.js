import * as React from "react";

export class DriverRideRequestsList extends React.Component {

    render(){
        return(
<tbody>
{
this.props.requests.map(req =>
<tr key={req.id}>
<td>Who: {req.passengerEmail}</td>
<td>When: {/* todo*/}</td>
<td>Where: {req.AddressId}</td>
<button>Accept</button>
<button>Deny</button>
</tr>
)
}

</tbody>
        );
    }
}