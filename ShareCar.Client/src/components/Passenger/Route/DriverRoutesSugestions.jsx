import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { DriverRouteSuggestionsItem } from "./DriverRouteSuggestionsItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

import "../../../styles/driversRidesList.css";

export const DriverRoutesSugestions = (props) => (
    <div className="drivers-list-root">
        <List 
            className="drivers-list"
            subheader={<ListSubheader component="div">Drivers for this route</ListSubheader>}
        >
            {props.rides.map((ride, i) => (
                <DriverRouteSuggestionsItem
                    key={i}
                    ride={ride}
                    onRegister={() => props.onRegister(ride)}
                />
            ))}
        </List>
    </div>
);