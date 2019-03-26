import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";

import "../../styles/secondaryHeader.css";

export const SecondaryHeader = props => (
    <Grid className="secondary-header" container justify="flex-end">
        <Button
            className="header-button"
            size="large"
        >
            <RefreshIcon fontSize="large" />
        </Button>
        <Button 
            className="header-button"
            size="large"
            onClick={() => props.onClick()}
        >
            Logout
        </Button>
    </Grid>
);