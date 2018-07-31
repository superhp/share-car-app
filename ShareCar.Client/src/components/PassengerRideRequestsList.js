import * as React from "react";
import {RideRequestForm} from "./RideRequestForm";

export class PassengerRideRequestsList extends React.Component {
    
    

    render(){
        
        return(
            <div>
<tbody>
{
this.props.requests.map(req =>
<tr key={req.id}>
<td>{req.seenByPassenger ? "" : "NEW"}</td> 
<td>{req.driverEmail}</td>
<td>Who: {req.driverFirstName} {req.driverLastName}</td>
<td>When: {req.dateTime} </td>
<td>Status: {req.status} </td>
</tr>

)
}

       <RideRequestForm/>


</tbody>
</div>
        );
    }
}