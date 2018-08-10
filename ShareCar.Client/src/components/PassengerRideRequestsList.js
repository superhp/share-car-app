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


export class PassengerRideRequestsList extends React.Component {
    render() {
        return (
            
            this.props.requests.map(req =>
                <Card className="request-card request-card-container">
                    <CardContent>
                        {/*  */}
                        <Typography variant="headline">
                            {req.seenByPassenger ? "" : "NEW  "}
                           {req.driverFirstName} {req.driverLastName}
                        </Typography>
                        <Typography color="textSecondary">
                            <Moment date={req.rideDate} format="MM-DD HH:mm"/>
                        </Typography>
                        <Typography component="p">
                            Status: {Status[parseInt(req.status)]}
                        </Typography>
                        <Typography component="p">
                            Address: {req.address}
                        </Typography>
                    </CardContent>
                </Card>     
                // <tr key={req.id}>
                //     <td ></td>
                //     <td>  </td>
                //     <td>  </td>
                // </tr>

            )
            
        //     <Table className="generic-table">
        //         <TableHead>
        //             <TableRow>
        //                 <th>Seen</th>
        //                 <th>Who </th>
        //                 <th>When </th>
        //                 <th>Where </th>
        //                 <th>Status </th>
        //                 </TableRow>
        // </TableHead>
                    
        //          <TableBody> 
        //             {this.props.requests.map(req =>
        //                 <tr key={req.id}>
        //                     <td >{req.seenByPassenger ? "" : "NEW  "}</td>
        //                     <td> {req.driverFirstName} {req.driverLastName}</td>
        //                     <td> <Moment date={req.rideDate} format="MM-DD HH:mm"/> </td>
        //                     <td> {req.address} </td>
        //                     <td> {Status[parseInt(req.status)]} </td>
        //                 </tr>

        //             )}
                    
        //         </TableBody>
        //     </Table>
        );
    }
}