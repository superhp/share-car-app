import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";

import "../styles/genericStyles.css";

export const PassengerRouteRadioButton = (props) => (
    <Grid 
        container 
        alignItems="center" 
        justify="center"
        item xs={6}
    >
        <Grid container item xs={6} justify="center">
            <Typography variant="body1">{props.direction}</Typography>
        </Grid>
        <Grid container item xs={6} justify="center">
            <Radio
                color="primary"
                checked={props.filteredRouteToOffice === props.toOffice}
                onClick={() => props.onRadioButtonClick()}
                onChange={() => props.showRoutes()}
                value={props.direction}
                name="radio-button-demo"
                aria-label="A"
            />
        </Grid>
    </Grid>
);