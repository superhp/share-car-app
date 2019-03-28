import * as React from "react";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

import { DriverRouteSuggestionsItem } from "./DriverRouteSuggestionsItem";

import "../../../styles/driversRidesList.css";

export const DriverRoutesSugestions = (props) => (
    <div className="drivers-list-root">
        <List 
            subheader={<ListSubheader component="div" className="drivers-list-header">Drivers for this route</ListSubheader>}
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