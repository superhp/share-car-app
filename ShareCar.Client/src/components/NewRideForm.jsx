import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../styles/newRideForm.css";
import "react-datepicker/dist/react-datepicker.css";

export class NewRideForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      addNewForm: false,
      addedStatus: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.drive == null
      ? this.setState({ addNewForm: true })
      : this.setState({ addNewForm: false });
  }

  componentDidMount() {
    if (!this.state.addNewForm) {
      var d = new Date(this.props.drive.rideDateTime);
      this.setState({ startDate: moment(d) });
    }
  }

  handleChange(date) {
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
      ToCountry: e.target.toCountry.value,
      ToCity: e.target.toCity.value,
      ToStreet: e.target.toStreet.value,
      ToNumber: e.target.toNumber.value,
      RideDateTime: this.state.startDate.format("YYYY-MM-DD")
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
            <label>From Street:</label>
            <input
              type="text"
              className="form-control"
              name="fromStreet"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.fromStreet
              }
            />
          </div>
          <div className="form-group">
            <label>From Number:</label>
            <input
              type="text"
              className="form-control"
              name="fromNumber"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.fromNumber
              }
            />
          </div>

          <div className="form-group">
            <label>From City:</label>
            <input
              type="text"
              className="form-control"
              name="fromCity"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.fromCity
              }
            />
          </div>
          <div className="form-group">
            <label>From Country:</label>
            <input
              type="text"
              className="form-control"
              name="fromCountry"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.fromCountry
              }
            />
          </div>
          <div className="form-group">
            <label>To Street:</label>
            <input
              type="text"
              className="form-control"
              name="toStreet"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.toStreet
              }
            />
          </div>
          <div className="form-group">
            <label>To Number:</label>
            <input
              type="text"
              className="form-control"
              name="toNumber"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.toNumber
              }
            />
          </div>
          <div className="form-group">
            <label>To City:</label>
            <input
              type="text"
              className="form-control"
              name="toCity"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.toCity
              }
            />
          </div>
          <div className="form-group">
            <label>To Country:</label>
            <input
              type="text"
              className="form-control"
              name="toCountry"
              defaultValue={
                this.state.addNewForm ? "" : this.props.drive.toCountry
              }
            />
          </div>
          <div className="form-group">
            <label>Date and Time:</label>
            <DatePicker
              className="form-control datepicker-element"
              popperClassName="addNewRidePopper"
              selected={this.state.startDate}
              onChange={this.handleChange}
              showTimeSelect
            />
          </div>
          <button className="btn btn-primary btn-lg btn-block save-new-ride">
            Save
          </button>
        </form>
      </div>
    );
  }
}
export default NewRideForm;
