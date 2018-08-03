import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import DateTimePicker from "react-datetime-picker";
import "../styles/newRideForm.css";
import addressParser from "../helpers/addressParser";
import "../styles/genericStyles.css";
var moment = require("moment");
export class NewRideForm extends React.Component {
  state = {
    startDate: moment("2018-07-25", "YYYY-MM-DD").toDate(),
    addNewForm: false,
    addedStatus: false,
    fromAddress: null,
    toAddress: null
  };
  componentWillMount() {
    this.props.drive == null
      ? this.setState({ addNewForm: true })
      : this.setState({ addNewForm: false });
  }

  componentDidMount() {
    if (!this.state.addNewForm) {
      this.setState({
        fromAddress: {
          number: this.props.drive.fromNumber,
          street: this.props.drive.fromStreet,
          city: this.props.drive.fromCity,
          country: this.props.drive.fromCountry
        }
      });

      this.setState({
        toAddress: {
          number: this.props.drive.toNumber,
          street: this.props.drive.toStreet,
          city: this.props.drive.toCity,
          country: this.props.drive.toCountry
        }
      });
    }
    var places = require("places.js");
    var placesAutocompleteFrom = places({
      container: document.querySelector("#address-input-from")
    });
    var placesAutocompleteTo = places({
      container: document.querySelector("#address-input-to")
    });
    placesAutocompleteFrom.on("change", e => {
      this.setState({
        fromAddress: {
          number: addressParser(e.suggestion.name).number,
          street: addressParser(e.suggestion.name).name,
          city: e.suggestion.city,
          country: e.suggestion.country
        }
      });
    });
    placesAutocompleteTo.on("change", e => {
      this.setState({
        toAddress: {
          number: addressParser(e.suggestion.name).number,
          street: addressParser(e.suggestion.name).name,
          city: e.suggestion.city,
          country: e.suggestion.country
        }
      });
    });
  }

  handleChange(date) {
    this.setState({
      startDate: moment(date, "YYYY-MM-DD").toDate()
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let ride = {
      FromCountry: this.state.fromAddress.country,
      FromCity: this.state.fromAddress.city,
      FromStreet: this.state.fromAddress.street,
      FromNumber: this.state.fromAddress.number,
      ToCountry: this.state.toAddress.country,
      ToCity: this.state.toAddress.city,
      ToStreet: this.state.toAddress.street,
      ToNumber: this.state.toAddress.number,
      RideDateTime: this.state.startDate
    };
    if (this.state.addNewForm) {
      api.post(`https://localhost:44360/api/Ride`, ride).then(res => {
        console.log(ride);
        this.setState({ addedStatus: true });
      });
    } else {
      ride["RideId"] = this.props.drive.rideId;
      ride["DriverEmail"] = this.props.drive.driverEmail;
      console.log(ride);
      api.put(`https://localhost:44360/api/Ride`, ride).then(res => {
        this.setState({ addedStatus: true });
      });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.addedStatus ? (
          <div className="alert alert-success added-label">Ride Added!</div>
        ) : (
          ""
        )}
        <form className="newRideForm" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>From:</label>
            <input
              type="search"
              class="form-group"
              id="address-input-from"
              placeholder="Select From Location..."
              defaultValue={
                !this.state.addNewForm
                  ? this.props.drive.fromNumber +
                    ", " +
                    this.props.drive.fromStreet +
                    ", " +
                    this.props.drive.fromCity +
                    ", " +
                    this.props.drive.fromCountry
                  : ""
              }
            />
          </div>
          <div className="form-group">
            <label>To:</label>
            <input
              type="search"
              class="form-group"
              id="address-input-to"
              placeholder="Select To Location..."
              defaultValue={
                !this.state.addNewForm
                  ? this.props.drive.toNumber +
                    ", " +
                    this.props.drive.toStreet +
                    ", " +
                    this.props.drive.toCity +
                    ", " +
                    this.props.drive.toCountry
                  : ""
              }
            />
          </div>
          <div className="form-group">
            <label>Date and Time:</label>
            <DateTimePicker
              showLeadingZeros={true}
              calendarClassName="dateTimePicker"
              onChange={date => this.handleChange(date)}
              value={this.state.startDate}
              className="form-group"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block save-new-ride"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
export default NewRideForm;
