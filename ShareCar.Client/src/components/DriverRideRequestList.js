import * as React from "react";
import api from '../helpers/axiosHelper';

export class DriverRideRequestsList extends React.Component {
state = {
    name: [],
    lastName: [],
    address: [],
    dateTime: []
}
componentDidMount(){

    console.log('hhhhhhhhhhhhhhhhhhh');

console.log(this.props.requests);

    this.props.requests.map((req, i) => {     
        console.log("&&&&&&&&&&&&&&&&&&Entered-------------------");                 
        // Return the element. Also pass key     
        //return (<Answer key={i} answer={answer} />) 
    });
 //   api.get('Perosn/' + )
  //  .then((response) => {
   //     console.log((response.data : User));
    //    const d = response.data;
//console.log(d);
  /*     
this.setState({driverRequests : d});

console.log(this.state.driverRequests);

    })
    .catch(function (error) {
        console.error(error);
    });
*/
}
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
<td>Who: {req.passengerFirstName} {req.passengerLastName}</td> 
<td>When: {req.dateTime}</td>  
<td>Where: {req.address}</td>  
<button onClick={() => this.sendRequestResponse(1,req.requestId)}>Accept</button>
<button onClick={() => this.sendRequestResponse(2,req.requestId)}>Deny</button>
</tr>
)
}

</tbody>
        );
    }
}