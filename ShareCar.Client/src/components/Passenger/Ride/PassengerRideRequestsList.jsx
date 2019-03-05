import * as React from "react";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import MapComponent from "../../Maps/MapComponent";
import { Status } from "../../../utils/status";

import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";


export class PassengerRideRequestsList extends React.Component {
state={
    show:false,
    coordinates:[]
}
    render() {
        return (
            <div className="request-card-container"> 
                <Card className="request-card">
                    {this.props.requests.map((req, i) =>
                        <tr key={i}>
                            <CardContent >
                                <Typography variant="headline">
                                    {req.seenByPassenger ? "" : "NEW  "}
                                    Name: {req.driverFirstName} {req.driverLastName}
                                </Typography>
                                <Typography color="textSecondary">
                                    Date: <Moment date={req.rideDate} format="MM-DD HH:mm"/>
                                </Typography>
                                <Typography component="p">
                                    Status: {Status[parseInt(req.status)]}
                                </Typography>
                                <Button
                          onClick={() => {
                            this.setState({ show: !this.state.show });
                            this.setState({
                              coordinates: [req.longitude, req.latitude]
                            });

                          }}
                        >
                          Show on map
                        </Button>
                            </CardContent>
                        </tr>
                    )}
                </Card>
                {this.state.show ? (

          <MapComponent
          id="map"
          className="requestMap"
          coordinates={this.state.coordinates}
          show={this.state.show}
        />
      ) : (
        <div></div>
      )} 
            </div>
                

        )
    }
}