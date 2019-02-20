import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Phone from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";

import RidesOfDriver from "./RidesOfDriver";

import "../styles/genericStyles.css";

export const DriverRoutesSugestions = (props) => (
    <Grid container justify="center" item xs={10}>
        <Card>
            {props.driversOfRoute.map(driver => (
            <Grid
                className="driver-button-container"
                justify="center"
                item xs={12}
                key={driver.id}
            >
                <Grid 
                    container 
                    alignItems="center" 
                    justify="center" 
                    className="names-and-phones" 
                    item xs={12}
                >
                    <Grid container className="driver-name" item xs={12}>
                        <Typography variant="caption">Driver </Typography>
                        <Typography variant="body1">
                            {driver.firstName} {driver.lastName}
                        </Typography>
                    </Grid>
                    <Grid className="call" item xs={12}>
                        <Phone />
                        <Typography variant="body1">
                        {driver.driverPhone}
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ "background-color": "#007bff" }}
                    onClick={() => props.showRidesOfDriver(driver)}
                >
                    View Time
                </Button>{" "}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => props.handleCloseDriver()}
                >
                    Close
                </Button>{" "}
            </Grid>
            ))}
            {props.showRides ? (
                <RidesOfDriver
                    rides={props.ridesOfRoute}
                    driver={props.driverEmail}
                    pickUpPoints={props.pickUpPoints}
                    className="date-display"
                />
            ) : (
                <div />
            )}
            </Card>
    </Grid>
);