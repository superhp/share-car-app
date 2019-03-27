import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Phone from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
import Timer from "@material-ui/icons/Timer";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import "../../../styles/genericStyles.css";
import "../../../styles/testmap.css";

export const DriverRouteSuggestionsItem = props => (
    // <Grid
    //     className="driver-button-container"
    //     item xs={12}
    // >
    //     <Grid 
    //         container 
    //         alignItems="center" 
    //         justify="center" 
    //         className="names-and-phones" 
    //         item xs={12}
    //     >
    //         <Grid container className="driver-name" item xs={12}>
    //             <Typography variant="caption">Driver </Typography>
    //             <Typography variant="body1">
    //                 {props.ride.driverFirstName} {props.ride.driverLastName}
    //             </Typography>
    //         </Grid>
    //         <Grid className="call" item xs={12}>
    //             <Phone />
    //             <Typography variant="body1">
    //             {props.ride.driverPhone}
    //             </Typography>
    //         </Grid>
    //         <Grid item xs={12}>
    //             <Timer />
    //             <Typography>{props.ride.rideDateTime}</Typography>
    //         </Grid>
    //     </Grid>
    //     <Button
    //         color="primary"
    //         variant="contained"
    //         onClick={() => props.onRegister()}
    //     >
    //         Register
    //     </Button>
    // </Grid>
    <GridListTile>
        <span>{props.ride.driverFirstName} {props.ride.driverLastName}</span>
        <span>Time: {props.ride.rideDateTime}  Phone: {props.ride.driverPhone}</span>
        <Button
            color="primary"
            variant="contained"
            onClick={() => props.onRegister()}
        >
            Register
        </Button>
    </GridListTile>
);


