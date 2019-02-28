import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { OfficeSelectionRadiobutton } from "./OfficeSelectionRadiobutton";

import "../../../styles/testmap.css";

export const OfficeSelection = (props) => (
    <Grid
        className="from-to-container"
        alignItems="flex-start"
        justify="center"
        container
        style={{ zIndex: 999999 }}
    >
        <Grid item xs={10}>
            <Card className="paper-background">
                <Grid container justify="center">
                <OfficeSelectionRadiobutton 
                    office="Savanoriu pr. 16"
                    checked={props.isChecked}
                    onRadioButtonClick={() => console.log("paspaude 1")}
                    onChange={() => console.log("pasikeite 1")}
                />
                <OfficeSelectionRadiobutton 
                    office="Savanoriu pr. 28"
                    checked={!props.isChecked}
                    onRadioButtonClick={() => console.log("paspaude 2")}
                    onChange={() => console.log("pasikeite 2")}
                />
                </Grid>
            </Card>
        </Grid>
    </Grid>
);