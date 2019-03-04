import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";

import "../../../styles/genericStyles.css";

export const OfficeSelectionRadiobutton = (props) => (
    <Grid 
        container 
        alignItems="center" 
        justify="center"
        item xs={6}
        style={{ zIndex: 999999 }}
    >
        <Grid container item xs={6} justify="center">
            <Typography variant="body1">{props.office}</Typography>
        </Grid>
        <Grid container item xs={6} justify="center">
            <Radio
                color="primary"
                checked={props.checked}
                onChange={() => props.onChange()}
                // value={props.office}
                aria-label="A"
            />
        </Grid>
    </Grid>
);