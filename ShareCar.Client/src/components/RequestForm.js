import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
import axios from 'axios';
import api from '../helpers/axiosHelper';
import {RideRequest} from './RideRequest';
import {RideRequestsList} from './RideRequestsList';
 export class RequestForm extends React.Component{
   // constructor(){
  //      super();
  //      this.state = {requests: []};
   // }
    state = {
        requests: []
      }



  showDriverRequests(){
    
    axios.get('http://localhost:5963/api/Default')
    .then(res => {
      const requests = res.data;
this.forceUpdate();
    })
};

componentWillMount(){

    api.get('Default')
    .then((response) => {
        console.log((response.data : User));
        const d = response.data;
console.log(d);
       
this.setState({requests : d});

console.log(this.state.requests);

    })
    .catch(function (error) {
        console.error(error);
    });

};



    handleSubmit(e) {
        e.preventDefault();
        let data = {
            RideId: e.target.rideId.value,
            AddressId: e.target.address.value,    
        }
          api.post(`http://localhost:5963/api/Default`, data)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })    };
        



    render(){

        return(
           
            <div>

<RideRequestsList driver = {false} requests ={this.state.requests}/>
            <form onSubmit={this.handleSubmit.bind(this)}>
                AddressId: <input type="text" name="address" defaultValue={""}/>
                <br/>
                Ride Id: <input type="text" name="rideId" defaultValue={""}/>
                <br/>

                <button>Save</button>       
            </form>

<button>Driver requests</button>       

<button onClick={this.showPassengerRequests}>Passenger requests</button>


</div>

        );
    }
 }
export default RequestForm;