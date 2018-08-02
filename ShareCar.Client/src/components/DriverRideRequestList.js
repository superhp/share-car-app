import * as React from "react";
import api from '../helpers/axiosHelper';
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
export class DriverRideRequestsList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            coordinates: []
        }
        this.child = React.createRef();

      }
    
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
        
    componentDidMount(){
    console.log(this.props.requests);

  //  this.child.current.setPassengersPickUpPoint([1,1]);
    };
//this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>



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
<button className = "ride-request-button" onClick={() => this.child.current.setPassengersPickUpPoint([req.longtitude,req.latitude])    }>Show on map</button>
<button className = "ride-request-button" onClick={() => this.sendRequestResponse(1,req.requestId)}>Accept</button>
<button className = "ride-request-button" onClick={() => this.sendRequestResponse(2,req.requestId)}>Deny</button>
</tr>
)
}
{
<MapComponent ref={this.child} driver = {true}/>
}
</tbody>
        );
    }
}