import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import MapComponent from "./MapComponent";
import SuggestedRides from "./SuggestedRides";
import "../styles/rideRequestForm.css";

export class RideRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.child = React.createRef();

    this.state = {
      coordinates: [], // used to seelct exact point on a map
      toViewCoordinates: [25.279652, 54.687157], // used to center map on user choosen location
      showForm: true,
      rideId: 0
    };
  }

  /*
    hideForm() {
      this.props.onHide();
    };*/

  updateCoordinates(value) {
    this.setState({
      coordinates: value
    });
  }

  componentDidMount() {
    var places = require("places.js");
    var placesAutocomplete = places({
      container: document.querySelector("#address")
    });
    placesAutocomplete.on("change", e =>
      this.child.current.centerMapParent(e.suggestion.latlng)
    );
  }

  getInput() {
    return document.querySelector("#rideId").value;
  }

  handleSubmit(e) {
    e.preventDefault();

    let request = {
      RideId: e.target.rideId.value,
      Longtitude: this.state.coordinates[0],
      Latitude: this.state.coordinates[1]
    };

    api.post(`https://localhost:44360/api/RideRequest`, request).then(res => {
      console.log(res);
      this.setState({ showForm: false });
    });
  }

  render() {
    return (
      <div>
        {this.state.showForm ? (
          <div className="container">
            <form
              className="ride-requests"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <div class="form-group">
                <label className="ride-requests-text">Address :</label>
                <input
                  id="address"
                  className="ride-requests form-control"
                  type="text"
                  name="street"
                  defaultValue={""}
                />
              </div>
              <div class="form-group">
                <label className="ride-requests-text">Ride Id:</label>
                <input
                  className="ride-requests form-control"
                  id="rideId"
                  type="text"
                  name="rideId"
                  defaultValue={""}
                />
              </div>

              <button className="btn btn-primary ride-requests-button">
                Save
              </button>
            </form>
            <MapComponent
              ref={this.child}
              driver={false}
              onUpdate={this.updateCoordinates.bind(this)}
            />
          </div>
        ) : (
          <SuggestedRides
            rideId={this.getInput()}
            coordinates={this.state.coordinates}
          />
        )}
      </div>
    );
  }
}
export default RideRequestForm;
