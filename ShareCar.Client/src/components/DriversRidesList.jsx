import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";

export class DriversRidesList extends React.Component<{}>{
    render() {
        return (
            <div>
                <tbody>
                    {
                        this.props.driversRides.map(req =>
                            <tr key={req.id}>
                                <td>{req.fromCountry} </td>
                                <td>{req.fromCity} </td>
                                <td>{req.fromStreet} </td>
                                <td>{req.fromNumber} </td>
                                <td>{req.toCountry} </td>
                                <td>{req.toCity} </td>
                                <td>{req.toStreet} </td>
                                <td>{req.toNumber} </td>
                                <td>{req.passengers} </td>
                                <td>{req.rideDateTime} </td>
                            </tr>
                        )
                    }
                </tbody>
            </div>
        );
    }
}