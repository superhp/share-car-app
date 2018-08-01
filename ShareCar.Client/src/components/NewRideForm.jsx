import * as React from "react";

import axios from "axios";
import api from "../helpers/axiosHelper";

export class NewRideForm extends React.Component {

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
            RideDateTime: e.target.rideDateTime.value
        };
        console.log(ride);
        api.post(`http://localhost:44360/api/Ride`, ride).then(res => {
            console.log(res);

        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <span>From Street:</span>
                    <input
                        type="text"
                        name="fromStreet"
                        defaultValue={""}
                    />
                    <br />

                    <span>From Number :</span>
                    <input
                        type="text"
                        name="fromNumber"
                        defaultValue={""}
                    />
                    <br />

                    <span>From City:</span>
                    <input
                        type="text"
                        name="fromCity"
                        defaultValue={""}
                    />
                    <br />
                    <span>From Country:</span>
                    <input
                        type="text"
                        name="fromCountry"
                        defaultValue={""}
                    />
                    <br />
                    <span>To Street:</span>
                    <input
                        type="text"
                        name="toStreet"
                        defaultValue={""}
                    />
                    <br />

                    <span>To Number :</span>
                    <input
                        type="text"
                        name="toNumber"
                        defaultValue={""}
                    />
                    <br />

                    <span>To City:</span>
                    <input
                        type="text"
                        name="toCity"
                        defaultValue={""}
                    />
                    <br />
                    <span>To Country:</span>
                    <input
                        type="text"
                        name="toCountry"
                        defaultValue={""}
                    />
                    <br />
                    <span>Date and time:</span>
                    <input
                        type="text"
                        name="rideDateTime"
                        defaultValue={""}
                    />
                    <br />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
export default NewRideForm;