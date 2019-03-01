import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { OfficeSelectionRadiobutton } from "./OfficeSelectionRadiobutton";
import { OfficeAddresses, toReadableName } from "../../../utils/AddressData";

import "../../../styles/testmap.css";

export const OfficeSelection = (props) => (
    <Grid
        className="from-to-container"
        alignItems="flex-start"
        justify="center"
        container
        style={{ zIndex: 999 }}
    >
        <Grid item xs={10}>
            <Card className="paper-background">
                <Grid container justify="center">
                    {
                        OfficeAddresses.map((address,i) =>
                            <OfficeSelectionRadiobutton
                                office={toReadableName(address)}
                                checked={props.checkedOffice === address}
                                onChange={() => props.onChange(address)}
                                key={i}
                            />
                        )
                    }
                </Grid>
            </Card>
        </Grid>
    </Grid>
);