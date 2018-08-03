import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import DateTimePicker from "react-datetime-picker";
import "../styles/newRideForm.css";
import addressParser from "../helpers/addressParser";
import "../styles/genericStyles.css";
import MapComponent from "./MapComponent";

var moment = require("moment");
export class NewRideForm extends React.Component {

    constructor(props) {
        super(props);

        this.child = React.createRef();

        this.state = {
            coordinates: [], // used to seelct exact point on a map
            toViewCoordinates: [25.279652, 54.687157]// used to center map on user choosen location
        }

    }
    updateCoordinates(value) {
        this.setState({
            coordinates: value
        });

    };
    state = {
        startDate: null,
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
            var d = new Date(this.props.drive.rideDateTime);
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
                    country: e.suggestion.country,
                }
            });
            this.child.current.centerMapParent(e.suggestion.latlng)

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
            this.child.current.centerMapParent(e.suggestion.latlng)
        });

    }

    handleChange(date) {
        this.setState({
            startDate: moment(date, "YYYY-MM-DD").toDate()
        });
    }
    updateCoordinates(value) {
        this.setState({
            coordinates: value
        });

    };
    handleSubmit(e) {
        // e.preventDefault();
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
                <MapComponent ref={this.child} onUpdate={this.updateCoordinates.bind(this)} />
            </div>
        );
    }
}
export default NewRideForm;
