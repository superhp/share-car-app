import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import SimpleMenu from "../../common/SimpleMenu";

import { PassengerRouteRadioButton } from "./PassengerRouteRadioButton";

import "./../../../styles/genericStyles.css";

export const PassengerRouteSelection = (props) => (
    <Grid
        className="from-to-container"
        alignItems="flex-start"
        justify="center"
        container
    >
        <Grid item xs={10}>
            <Card className="paper-background">
                <Grid container justify="center">
                    <PassengerRouteRadioButton 
                        direction="To office"
                        toOffice={true}
                        filteredRouteToOffice={props.filteredRouteToOffice}
                        showRoutes={() => props.showRoutes()}
                        onRadioButtonClick={() => props.directionToOffice()}
                    />
                    <PassengerRouteRadioButton 
                        direction="From office"
                        toOffice={false}
                        filteredRouteToOffice={props.filteredRouteToOffice}
                        showRoutes={() => props.showRoutes()}
                        onRadioButtonClick={() => {
                            props.directionToOffice();
                            props.handleFromOfficeSelection();
                        }}
                    />
                    <SimpleMenu
                        buttonText="Select Office"
                        handleSelection={(e, indexas, button) =>
                            props.handleOfficeSelection(e, indexas, button)
                        }
                    />
                </Grid>
            </Card>
        </Grid>
    </Grid>
);