import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { DriverRouteSuggestionsItem } from "./DriverRouteSuggestionsItem";

export const DriverRoutesSugestions = (props) => (
    <Grid container justify="center" item xs={10}>
        <Card>
            {props.rides.map((ride, i) => (
                <DriverRouteSuggestionsItem
                    key={i}
                    ride={ride}
                    onRegister={() => props.onRegister(ride)}
                />
            ))}
        </Card>
    </Grid>
);