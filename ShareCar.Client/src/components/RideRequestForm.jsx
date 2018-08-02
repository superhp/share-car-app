import * as React from "react";

import axios from "axios";
import api from "../helpers/axiosHelper";
import MapComponent from "./MapComponent";

export class RideRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.child = React.createRef();

    this.state = {
      coordinates: [], // used to seelct exact point on a map
      toViewCoordinates:[25.279652, 54.687157]// used to center map on user choosen location
    }

  }

  updateCoordinates(value){
    this.setState({
      coordinates: value
    });

  };
componentDidMount(){
  var places = require("places.js");
  var placesAutocomplete = places({
      container: document.querySelector('#address')
    });
    placesAutocomplete.on('change', e => console.log(e.suggestion));

  //  placesAutocomplete.on('change', function(e){
    //  console.log(e.suggestion.latlng);

    //  this.child.current.CenterMap(e.suggestion.latlng[0], e.suggestion.latlng[1]);
//console.log(e.suggestion.);
  //  });

}

caaall(e){
  console.log(e.suggestion.latlng);
  this.child.current.centerMapParent([1,44]);

}

componentDidMount(){
  var places = require("places.js");
  var placesAutocomplete = places({
      container: document.querySelector('#address')
    });
    placesAutocomplete.on('change', e => this.child.current.centerMapParent(e.suggestion.latlng));

  //this.child.current.CenterMap(this.state.toViewCoordinates[0], this.state.toViewCoordinates[1]);
}
/*
getAddressInput(){
  var places = require("places.js");
  var placesAutocomplete = places({
      container: document.querySelector('#address')
    });
    placesAutocomplete.on('change', e => this.child.current.centerMapParent(e.suggestion.latlng[0], e.suggestion.latlng[1]));

}*/

  handleSubmit(e) {
    e.preventDefault();
    let request = {
      RideId: e.target.rideId.value,
      Longtitude : this.state.coordinates[0],
      Latitude : this.state.coordinates[1]
    /*  City: e.target.city.value,
      Street: e.target.street.value,
      HouseNumber: e.target.houseNumber.value*/
    };

  console.log(request);
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

          <span className="ride-requests-text">Address :</span>
          <input
          id="address"
            className="ride-requests"
            type="text"
            name="street"
            onBlur ={this.getAddressInput}
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

<MapComponent  ref={this.child}  driver={false} onUpdate={this.updateCoordinates.bind(this)}/>

      </div>
    );
  }
}
