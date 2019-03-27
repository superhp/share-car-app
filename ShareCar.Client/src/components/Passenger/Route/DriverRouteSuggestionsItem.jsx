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
    <ListItem className="drivers-list">
        <ListItemText
            primary={<span>{props.ride.driverFirstName} {props.ride.driverLastName}</span>}
            secondary={
                <React.Fragment>
                    {props.ride.rideDateTime !== null ? 
                        <div>
                            <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                                Time: &nbsp;
                            </Typography>
                            {props.ride.rideDateTime}
                            <br/>
                        </div>
                    : ""}
                    {props.ride.driverPhone !== null ? 
                        <div>
                            <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                                Phone: &nbsp;
                            </Typography>
                            {props.ride.driverPhone}
                        </div>
                    : ""}
                </React.Fragment>
            }
        />
        <Button
            color="primary"
            variant="outlined"
            onClick={() => props.onRegister()}
        >
            Register
        </Button>
    </ListItem>
);


