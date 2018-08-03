import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { PassengerRideRequestsList } from "./PassengerRideRequestsList";
import { DriverRideRequestsList } from "./DriverRideRequestList";
export class ViewRideRequests extends React.Component {
  state = {
    driverRequests: [],
    passengerRequests: []
  };

  componentWillMount() {
    this.props.driver
      ? this.showDriverRequests()
      : this.showPassengerRequests();
  }

  /*
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
        console.log((response.data: User));
        const d = response.data;

        this.setState({ passengerRequests: d });
      })
      .then(() => {
        const unseenRequests = [];

        console.log(this.state.passengerRequests.length);

        for (var i = 0; i < this.state.passengerRequests.length; i++) {
          if (!this.state.passengerRequests[i].seenByPassenger) {
            unseenRequests.push(this.state.passengerRequests[i].requestId);
          }
        }

        console.log(unseenRequests);
        if (unseenRequests.length != 0) {
          api.post("RideRequest/seenPassenger", unseenRequests).then(res => {
            console.log(res);
          });
        }
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

        this.setState({ driverRequests: d });

        console.log(this.state.driverRequests);
      })
      .then(() => {
        const unseenRequests = [];

        for (var i = 0; i < this.state.driverRequests.length; i++) {
          if (!this.state.driverRequests[i].seenByDriver) {
            unseenRequests.push(this.state.driverRequests[i].requestId);
          }
        }

        console.log(unseenRequests);
        if (unseenRequests.length != 0) {
          api.post("RideRequest/seenDriver", unseenRequests).then(res => {
            console.log(res);
          });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.driver ? (
          <DriverRideRequestsList
            selectedRide={this.props.selectedRide}
            requests={this.state.driverRequests}
          />
        ) : (
          <PassengerRideRequestsList requests={this.state.passengerRequests} />
        )}
      </div>
    );
  }
}
