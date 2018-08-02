import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import "../styles/newRideForm.css";
import addressParser from "../helpers/addressParser";
import "../styles/genericStyles.css";
import MapComponent from "./MapComponent";

export class NewRideForm extends React.Component {
    state = {
        startDate: new Date("2018-07-04"),
        addNewForm: false,
        addedStatus: false
    };
    componentWillMount() {
        this.props.drive == null
            ? this.setState({ addNewForm: true })
            : this.setState({ addNewForm: false });
    }

    componentDidMount() {
        if (!this.state.addNewForm) {
            var d = new Date(this.props.drive.rideDateTime);
        }
        var places = require("places.js");
        var placesAutocompleteFrom = places({
            container: document.querySelector("#address-input-from")
        });
        var placesAutocompleteTo = places({
            container: document.querySelector("#address-input-to")
        });
        placesAutocompleteFrom.on("change", e => console.log(e.suggestion.latlng.lat));
    }

    handleChange(date) {
        console.log(moment(date).format("YYYY-MM-DD hh:mm:ss"));
        this.setState({
            startDate: date
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let ride = {
            FromCountry: e.target.fromCountry.value,
            FromCity: e.target.fromCity.value,
            FromStreet: e.target.fromStreet.value,
            FromNumber: e.target.fromNumber.value,
            FromLatitude: e.target.suggestion.latlng.lat,
            ToCountry: e.target.toCountry.value,
            ToCity: e.target.toCity.value,
            ToStreet: e.target.toStreet.value,
            ToNumber: e.target.toNumber.value,
            RideDateTime: ""
        };
        api.post(`https://localhost:44360/api/Ride`, ride).then(res => {
            this.setState({ addedStatus: true });
        });
    }

    render() {
        return (
            <div className="container">
                {this.state.addedStatus ? (
                    <div className="alert alert-success added-label">Ride Added!</div>
                ) : (
                        ""
                    )}
                <form
                    className="newRideForm"
                    onSubmit={this.state.addNewForm ? this.handleSubmit.bind(this) : ""}
                >
                    <div className="form-group">
                        <label>From:</label>
                        <input
                            type="search"
                            class="form-group"
                            id="address-input-from"
                            placeholder="Select From Location..."
                        />
                    </div>
                    <div className="form-group">
                        <label>To:</label>
                        <input
                            type="search"
                            class="form-group"
                            id="address-input-to"
                            placeholder="Select To Location..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Date and Time:</label>
                        <DateTimePicker
                            calendarClassName="dateTimePicker"
                            onChange={date => this.handleChange(date)}
                            value={this.state.startDate}
                            className="form-group"
                        />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block save-new-ride">
                        Save
                    </button>
                </form>
                <MapComponent />
            </div>
        );
    }
}
export default NewRideForm;
