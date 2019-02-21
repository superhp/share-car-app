import * as React from "react";
import { Status } from "../../../utils/status";
import "../../../styles/riderequests.css";
import Moment from "react-moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "../../../styles/genericStyles.css";
import { Typography } from "@material-ui/core";
import MapComponent from "../../Maps/MapComponent";
import Button from "@material-ui/core/Button";


export class PassengerRideRequestsList extends React.Component {
state={
    show:false,
    coordinates:[]
}
    render() {
        return (
            <div className="request-card-container"> 

                <Card className="request-card">
                    {this.props.requests.map(req =>
                        <tr  key={req.id}>
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
                              coordinates: [req.longtitude, req.latitude]
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