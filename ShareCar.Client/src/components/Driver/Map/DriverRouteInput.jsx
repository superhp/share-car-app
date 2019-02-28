import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImportExport from "@material-ui/icons/ImportExport";
import Card from "@material-ui/core/Card";

import { DriverInput } from "../DriverInput";
import { OfficeSelectionRadiobutton } from "../OfficeSelectionRadiobutton";

import "../../../styles/testmap.css";

export const DriverRouteInput = (props) => (
    <div className="map-input-selection">
        <DriverInput 
            inputId="driver-address-input-from"
            placeholder="Select Location..."
            handleOfficeSelection={(e, indexas, button) =>
                props.handleOfficeSelection(e, indexas, button)
            }
            direction="from"
        />
        <Button style={{ zIndex: 999999 }} size="large" color="primary">
            <ImportExport fontSize="large"/>
        </Button>
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
    </div>
);