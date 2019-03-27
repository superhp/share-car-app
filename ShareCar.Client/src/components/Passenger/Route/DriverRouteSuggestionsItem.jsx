import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Phone from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
import Timer from "@material-ui/icons/Timer";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "../../../styles/genericStyles.css";
import "../../../styles/testmap.css";

export const DriverRouteSuggestionsItem = props => (
    <ListItem alignItems="flex-start">
        <ListItemText
            primary={<span>{props.ride.driverFirstName} {props.ride.driverLastName}</span>}
            secondary={
                <React.Fragment>
                    <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                        Time: 
                    </Typography>
                    {props.ride.rideDateTime}
                    <br/>
                    <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                        Phone: 
                    </Typography>
                    {props.ride.driverPhone}
                </React.Fragment>
            }
        />
        <Button
            color="primary"
            variant="contained"
            onClick={() => props.onRegister()}
        >
            Register
        </Button>
    </ListItem>
);


