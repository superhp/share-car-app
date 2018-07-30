import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
import axios from 'axios';
import api from '../helpers/axiosHelper';
import {PassengerRideRequestsList} from './PassengerRideRequestsList';
import {DriverRideRequestsList} from './DriverRideRequestList';
 export class RideRequests extends React.Component{

        state = {
            driverRequests: [],
            passengerRequests: [],
names:[],
addresses:[],
dateTimes:[]
          }
            

componentWillMount(){
    console.log(this.props.driver);
    this.props.driver
    ? this.showDriverRequests()
    : this.showPassengerRequests();
};
/*
componentDidMount(){
    api.get('Default')
    .then((response) => {
        console.log((response.data : User));
        const d = response.data;
console.log(d);
       
this.setState({passengerRequests : d});

console.log(this.state.passengerRequests);

    })
    .catch(function (error) {
        console.error(error);
    });

}*/
getNames(email){
    api.get('Person/'+ email)
    .then((response) => {
let data = {
    FirstName: response.FirstName,
    LastName: response.LastName
};

const namesArray = this.state.names;

namesArray.push(data);
this.setState({names : namesArray});

console.log(this.state.names);

    })
    .catch(function (error) {
        console.error(error);
    });
};

getAddresses(){
    
}

      showPassengerRequests(){
        api.get('Default/false')
        .then((response) => {
            console.log('ooooooooooooo');

            console.log((response.data : User));
            const d = response.data;
    console.log(d);
           
    this.setState({passengerRequests : d});
    
    console.log(this.state.passengerRequests);
    
        })
        .catch(function (error) {
            console.error(error);
        });
    
      };

  showDriverRequests(){
    api.get('Default/true')
    .then((response) => {
        console.log((response.data : User));
        const d = response.data;
console.log(d);
       
this.setState({driverRequests : d});

this.state.driverRequests.map((req, i) => {     
    console.log("&&&&&&&&&&&&&&&&&&Entered-------------------");                 
    // Return the element. Also pass key     
    //return (<Answer key={i} answer={answer} />) 
});

console.log(this.state.driverRequests);

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
            {this.props.driver 
            ?            
            <DriverRideRequestsList   requests ={this.state.driverRequests}/>
            : <PassengerRideRequestsList  requests ={this.state.passengerRequests}/>
            
            }

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
    };
}
