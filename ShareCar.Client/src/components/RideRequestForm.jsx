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
    placesAutocomplete.on('change', e => this.child.current.centerMapParent(e.suggestion.latlng));

}


  handleSubmit(e) {
    e.preventDefault();
    let request = {
      RideId: e.target.rideId.value,
      Longtitude : this.state.coordinates[0],
      Latitude : this.state.coordinates[1]
    };

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
