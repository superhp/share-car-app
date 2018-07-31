import * as React from "react";

export class DriversRidesList extends React.Component {
    render() {
        return (
            <div>
                <tbody>
                    {
                        this.props.driversRides.map(req =>
                            <tr key={req.id}>
                                <td>{req.driverEmail}</td>
                                <td>{req.fromId}</td>
                                <td>{req.toId}</td>
                                <td>{req.passengers}</td>
                                <td>{req.rideDateTime}</td>
                            </tr>
                        )
                    }
                </tbody>
            </div>
        );
    }
}