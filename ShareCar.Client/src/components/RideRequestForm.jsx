import * as React from "react";

import axios from "axios";
import api from "../helpers/axiosHelper";

export class RideRequestForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    let request = {
      RideId: e.target.rideId.value,
      City: e.target.city.value,
      Street: e.target.street.value,
      HouseNumber: e.target.houseNumber.value    };
      console.log(request);

/*    const address = {
        City: e.target.city.value,
        Street: e.target.street.value,
        Number: e.target.number.value
    };

    console.log(address);

    api.post(`http://localhost:5963/api/Location`, address).then(res => {
      console.log(res);
      console.log("============");
      if(res.status == 200)
{
request.AddressId = res.data;*/

      api.post(`http://localhost:5963/api/RideRequest`, request).then(res => {
        console.log(res);
        
      });

}

  render() {
    return (
      <div>

        <form className="ride-requests" onSubmit={this.handleSubmit.bind(this)}>
          <span className="ride-requests-text">City:</span>
          <input
            className="ride-requests"
            type="text"
            name="city"
            defaultValue={""}
          />
          <br />

  <span className="ride-requests-text">Street :</span>
          <input
            className="ride-requests"
            type="text"
            name="street"
            defaultValue={""}
          />
          <br />

  <span className="ride-requests-text">House number:</span>
          <input
            className="ride-requests"
            type="text"
            name="houseNumber"
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


      </div>
    );
  }
}
