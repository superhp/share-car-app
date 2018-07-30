import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { PassengerRideRequestsList } from "./PassengerRideRequestsList";
import { DriverRideRequestsList } from "./DriverRideRequestList";

export class RideRequests extends React.Component {
  state = {
    driverRequests: [],
    passengerRequests: []
  };


  componentWillMount() {
    console.log(this.props.driver);
    this.props.driver
      ? this.showDriverRequests()
      : this.showPassengerRequests();
  }
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

 }*//*
getNames(email){
    api.get('Person/'+ email)
    .then((response) => {
        console.log("==========================");
        console.log(response);

let data = {
    FirstName: response.data.firstName,
    LastName: response.data.lastName
};

const namesArray = this.state.names;

namesArray.push(data);
this.setState({names : namesArray});
console.log('stststst');
console.log(this.state.names);

    })
    .catch(function (error) {
        console.error(error);
    });
};

getAddresses(){

}*/
  showPassengerRequests() {
    api
      .get("RideRequest/false")
      .then(response => {
        console.log("ooooooooooooo");

        console.log((response.data: User));
        const d = response.data;
        console.log(d);

        this.setState({ passengerRequests: d });

        console.log(this.state.passengerRequests);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  showDriverRequests() {
    api
      .get("RideRequest/true")
      .then(response => {
        console.log((response.data: User));
        const d = response.data;
        console.log(d);

        this.setState({ driverRequests: d });

        console.log(this.state.driverRequests);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      RideId: e.target.rideId.value,
      AddressId: e.target.address.value
    };
    api.post(`http://localhost:5963/api/RideRequest`, data).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        {this.props.driver ? 
          <DriverRideRequestsList requests={this.state.driverRequests} />
         : 
          <PassengerRideRequestsList requests={this.state.passengerRequests} />
        }

        <form className="ride-requests" onSubmit={this.handleSubmit.bind(this)}>
          <span className="ride-requests-text">AddressId:</span>
          <input
            className="ride-requests"
            type="text"
            name="address"
            defaultValue={""}
          />
          <br />
          <span className="ride-requests-text">Ride Id:</span>
          <input
            className="ride-requests"
            type="text"
            name="rideId"
            defaultValue={""}
          />
          <br />

          <button className="ride-requests-button">Save</button>
        </form>

        <button>Driver requests</button>

        <button
          className="ride-requests-button"
          onClick={this.showPassengerRequests}
        >
          Passenger requests
        </button>
      </div>
    );
  }
}
