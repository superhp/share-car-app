import * as React from "react";
import api from "../helpers/axiosHelper";
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
import "../styles/genericStyles.css";
export class DriverRideRequestsList extends React.Component {
  // constructor(props) {
  //   super(props);

  state = {
    coordinates: [],
    show: false
  };
  // this.child = React.createRef();
  // }

  sendRequestResponse(response, requestId, rideId, driverEmail) {
    let data = {
      RequestId: requestId,
      Status: response,
      RideId: rideId,
      DriverEmail: driverEmail
    };
    api.put("https://localhost:44360/api/RideRequest", data).then(res => {});
  }

  componentDidMount() {
    console.log(this.props.rideRequests);
    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>

  render() {
    return (
      <div>
        {this.state.show ? (
          <MapComponent
            id="map"
            coords={this.state.coordinates}
            ref={this.child}
            driver={true}
          />
        ) : (
          ""
        )}
        <div className="table-responsive requestListTable">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Pending Requests</td>
              </tr>
            </thead>
            <tbody>
              {this.props.rideRequests.map((req, index) => (
                <tr key={req.id}>
                  <td>
                    <span className="badge-numbers badge badge-warning">
                      #{index + 1} {req.passengerFirstName}{" "}
                      {req.passengerLastName}
                    </span>
                  </td>
                  <td>
                    {req.address}{" "}
                    <button
                      className="ride-request-button btn btn-primary"
                      onClick={() => {
                        this.setState({ show: true });
                        this.setState({
                          coordinates: [req.longtitude, req.latitude]
                        });

                        window.scrollTo(0, 0);
                      }}
                    >
                      Show on map
                    </button>{" "}
                    <button
                      className="ride-request-button btn btn-success btn-sm"
                      onClick={() => {
                        this.sendRequestResponse(
                          1,
                          req.requestId,
                          req.rideId,
                          req.driverEmail
                        );
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="ride-request-button btn btn-danger btn-sm"
                      onClick={() => {
                        this.sendRequestResponse(2, req.requestId, req.rideId);
                        window.location.reload();
                      }}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
