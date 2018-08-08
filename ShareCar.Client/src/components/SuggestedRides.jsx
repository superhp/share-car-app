import * as React from "react";
import { RideRequestForm } from "./RideRequestForm";
import api from "../helpers/axiosHelper";

export class SuggestedRides extends React.Component {
  state={
    suggestions :[],
    showRides:true
  };

  componentWillMount(){
  api.get(`http://localhost:5963/api/Ride/simillarRides=` + this.props.rideId).then(response => {
      console.log((response.data: User));
      const d = response.data;

      this.setState({ suggestions: d });
    });
}

requestNow(rideId, coordinates){
  let request = {
    RideId: rideId,
    Longtitude: coordinates[0],
    Latitude: coordinates[1]
  };
console.log("======" + request);
  api.post(`http://localhost:5963/api/RideRequest`, request).then(res => {
    console.log(res);

  });
}
  
  render() {
    return (
<div>
      <h1> Request sent</h1>
      <h1> Selected driver has same route on other days too:</h1>
{
  this.state.showRides
  ?
      <tbody>
      {
          this.state.suggestions.map(req =>
              <tr key={req.id}>
                  <td>When: {req.rideDateTime} </td>
                  <button onClick = {() => {this.requestNow(req.rideId, this.props.coordinates)}} >Request now</button>
                  <button onClick = {() => {this.setState({showRides:false})}}>Request with new location</button>
              </tr>

          )
      }



  </tbody>
  :<RideRequestForm/>
}
 </div>
    );
  }
}
export default SuggestedRides;

