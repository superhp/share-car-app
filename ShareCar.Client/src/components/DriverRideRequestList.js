import * as React from "react";
import api from "../helpers/axiosHelper";
import "../styles/riderequests.css";
import MapComponent from "./MapComponent";
import "../styles/genericStyles.css";
export class DriverRideRequestsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      show: true
    };
    this.child = React.createRef();
  }

  sendRequestResponse(response, requestId) {
    let data = {
      RequestId: requestId,
      Status: response
    };
    console.log(data);

    api.put(`http://localhost:5963/api/RideRequest`, data).then(res => {
      console.log(res.data);
    });
  }

  sendRequestResponse(response, requestId) {
    let data = {
      RequestId: requestId,
      Status: response
    };
    console.log(data);

    api.put(`http://localhost:5963/api/RideRequest`, data).then(res => {
      console.log(res.data);
    });
  }

  componentDidMount() {
    console.log(this.props.requests);

    //  this.child.current.setPassengersPickUpPoint([1,1]);
  }
  //this.setState({coordinates : [req.longtitude,req.latitude], show : true})}>Show on map</button>

  render() {
    var displayRequests = this.props.requests;
    if (this.props.selectedRide != null) {
      displayRequests = this.props.requests.filter(
        x => x.rideId == this.props.selectedRide && x.status == 0
      );
    }
    return (
      <div className="table-responsive requestListTable">
        <table className="table table-bordered">
          <thead className="bg-primary">
            <tr>
              <td className="generic-text">Hide Map</td>
              <td className="generic-text">Status</td>
              <td className="generic-text">Who</td>
              <td className="generic-text">When</td>
              <td className="generic-text">Where</td>
              <td className="generic-text">Action</td>
            </tr>
          </thead>
          <tbody>
            {displayRequests.map(req => (
              <tr key={req.id}>
                <td>
                  <button onClick={() => this.setState({ show: false })}>
                    Hide map
                  </button>
                </td>
                <td className="ride-request-text">
                  {req.seenByDriver ? "" : "NEW"}
                </td>
                <td>
                  {req.passengerFirstName} {req.passengerLastName}{" "}
                </td>
                <td>{req.rideDate} </td>
                <td>
                  {req.address}{" "}
                  <button
                    className="ride-request-button"
                    onClick={()=> {
                      this.child.current.setPassengersPickUpPoint([
                        req.longtitude,
                        req.latitude
                      ]);
                      this.setState({ show: true });
                    }}
                  >
                    Show on map
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="ride-request-button btn btn-success btn-sm"
                    onClick={() => this.sendRequestResponse(1, req.requestId)}
                  >
                    Accept
                  </button>
                  <button
                    className="ride-request-button btn btn-danger btn-sm"
                    onClick={() => this.sendRequestResponse(2, req.requestId)}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
            {this.state.show ? (
              <MapComponent ref={this.child} driver={true} />
            ) : (
              <div />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
