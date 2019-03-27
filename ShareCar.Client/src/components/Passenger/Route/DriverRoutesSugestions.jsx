import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { DriverRouteSuggestionsItem } from "./DriverRouteSuggestionsItem";
import { GridList } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTile from "@material-ui/core/GridListTile";

import "../../../styles/driversRidesList.css";

export const DriverRoutesSugestions = (props) => (
    <div className="drivers-list-root">
        <GridList  className="drivers-list">
            <GridListTile key="Subheader" cols={1} style={{width: "auto"}}>
                <ListSubheader>Drivers for this route</ListSubheader>
            </GridListTile>
            {props.rides.map((ride, i) => (
                <DriverRouteSuggestionsItem
                    key={i}
                    ride={ride}
                    onRegister={() => props.onRegister(ride)}
                />
            ))}
        </GridList>
    </div>
);