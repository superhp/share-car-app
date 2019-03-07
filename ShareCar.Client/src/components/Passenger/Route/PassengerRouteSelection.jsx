import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";

import SimpleMenu from "../../common/SimpleMenu";
import { PassengerRouteRadioButton } from "./PassengerRouteRadioButton";

import "./../../../styles/genericStyles.css";
import { DriverInput } from "../../Driver/DriverInput";

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
                    <Grid 
                        container 
                        alignItems="center" 
                        justify="center"
                        item xs={6}
                    >
                        <Grid container item xs={6} justify="center">
                            <Typography variant="body1">To office</Typography>
                        </Grid>
                        <Grid container item xs={6} justify="center">
                            <Radio
                                color="primary"
                                checked={props.direction === "from"}
                                onClick={() => props.onDirectionChanged("from")}
                                value="to"
                                name="radio-button-demo"
                                aria-label="A"
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        alignItems="center" 
                        justify="center"
                        item xs={6}
                    >
                        <Grid container item xs={6} justify="center">
                            <Typography variant="body1">From office</Typography>
                        </Grid>
                        <Grid container item xs={6} justify="center">
                            <Radio
                                color="primary"
                                checked={props.direction === "to"}
                                onClick={() => props.onDirectionChanged("to")}
                                value="from"
                                name="radio-button-demo"
                                aria-label="A"
                            />
                        </Grid>
                    </Grid>
                    <SimpleMenu
                        buttonText="Select Office"
                        handleSelection={indexas => props.handleOfficeSelection(indexas)}
                    />
                </Grid>
            </Card>
            <Grid
                container
                alignItems="center"
                justify="center"
                item xs={10}
            >
                <DriverInput 
                    placeholder="Type in pickup point or touch location on the map"
                    onChange={(suggestion) => this.props.onPickupAddressChange(fromAlgoliaAddress(suggestion))}
                    ref={this.props.innerRef}
                />
            </Grid>
        </Grid>
    </Grid>
);