import * as React from "react";
import api from '../helpers/axiosHelper';

export class DriverRideRequestsList extends React.Component {

    sendRequestResponse(response, requestId){
        let data = {
            RequestId:requestId,
            Status :response
        };
        console.log(data);
            api.put(`http://localhost:5963/api/Default/response`, data)
            .then(res => {
              console.log(res.data);
            })    };
        
        

    render(){

return(
<tbody>
{
this.props.requests.map(req =>
<tr key={req.id}>
<td>Who: {req.passengerEmail}</td>
<td>When: {/* todo*/}</td>
<td>Where: {req.AddressId}</td>
<button onClick={() => this.sendRequestResponse(1,req.requestId)}>Accept</button>
<button onClick={() => this.sendRequestResponse(2,req.requestId)}>Deny</button>
</tr>
)
}

</tbody>
        );
    }
}