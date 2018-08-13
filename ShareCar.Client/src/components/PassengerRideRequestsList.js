import * as React from "react";
import { Status } from "./status";
import "../styles/riderequests.css";
import Moment from "react-moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import "../styles/genericStyles.css";
import { Typography } from "../../node_modules/@material-ui/core";
import MapComponent from "./MapComponent";
import Button from "@material-ui/core/Button";


export class PassengerRideRequestsList extends React.Component {
state={
    show:false
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

                            window.scrollTo(0, 0);
                          }}
                        >
                          Show on map
                        </Button>
                        {this.state.show ? (
          <MapComponent
            id="map"
            className="requestMap"
            coordinates={[req.longtitude,req.latitude]}
            show={this.state.show}
          />
        ) : (
          ""
        )}
                             {   /*<Typography component="p">
                                    Address: {      }
                    </Typography>*/}
                            </CardContent>
                        </tr>
                    )}
                </Card> 
            </div>
                

        )
    }
}