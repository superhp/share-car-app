import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { OfficeSelectionRadiobutton } from "./OfficeSelectionRadiobutton";

import "../../../styles/testmap.css";

export class OfficeSelection extends React.Component {
    render() {
        return (
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
                        <OfficeSelectionRadiobutton 
                            office="Savanoriu pr. 16"
                            checked={props.isChecked}
                            onRadioButtonClick={() => props.onRadioButtonClick()}
                            onChange={() => props.onSelectionChange()}
                        />
                        <OfficeSelectionRadiobutton 
                            office="Savanoriu pr. 28"
                            checked={!props.isChecked}
                            onRadioButtonClick={() => props.onRadioButtonClick()}
                            onChange={() => props.onSelectionChange()}
                        />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}