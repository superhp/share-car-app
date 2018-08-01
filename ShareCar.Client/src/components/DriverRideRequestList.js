import * as React from "react";
import api from '../helpers/axiosHelper';
import "../styles/riderequests.css";
export class DriverRideRequestsList extends React.Component {

    sendRequestResponse(response, requestId){
        let data = {
            RequestId:requestId,
            Status :response
        };
        console.log(data);   
      
        api.put(`http://localhost:5963/api/RideRequest`, data)
            .then(res => {
              console.log(res.data);
            })    };
        
        

    render(){

return(
<tbody>
{
this.props.requests.map(req =>
<tr key={req.id}>

<td className = "ride-request-text">{req.seenByDriver ? "" : "NEW"}</td> 
<td>Who: {req.passengerFirstName} {req.passengerLastName}  </td> 
<td>When: {req.rideDate}  </td>  
<td>Where: {req.address}  </td>  
<button className = "ride-request-button" onClick={() => this.sendRequestResponse(1,req.requestId)}>Accept</button>
<button className = "ride-request-button" onClick={() => this.sendRequestResponse(2,req.requestId)}>Deny</button>
</tr>
)
}

</tbody>
        );
    }
}