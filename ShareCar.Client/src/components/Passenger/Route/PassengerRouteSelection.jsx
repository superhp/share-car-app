import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";

import SimpleMenu from "../../common/SimpleMenu";
import { AddressInput } from "../../common/AddressInput";
import { fromAlgoliaAddress } from "../../../utils/addressUtils";

import "./../../../styles/genericStyles.css";

class PassengerRouteSelectionInner extends React.Component {
    render() {
        return (
            <Grid
                className="from-to-container"
                alignItems="flex-start"
                justify="center"
                container
            >
                <Grid item xs={10}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <AddressInput 
                            placeholder="Type in meetup point or click on the map"
                            onChange={(suggestion) => this.props.onMeetupAddressChange(fromAlgoliaAddress(suggestion))}
                            ref={this.props.innerRef}
                        />
                    </Grid>
                    <Card className="paper-background">
                        <Grid container justify="center">
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
                                        checked={this.props.direction === "from"}
                                        onClick={() => this.props.onDirectionChanged("from")}
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
                                    <Typography variant="body1">To office</Typography>
                                </Grid>
                                <Grid container item xs={6} justify="center">
                                    <Radio
                                        color="primary"
                                        checked={this.props.direction === "to"}
                                        onClick={() => this.props.onDirectionChanged("to")}
                                        value="from"
                                        name="radio-button-demo"
                                        aria-label="A"
                                    />
                                </Grid>
                            </Grid>
                            <SimpleMenu
                                buttonText="Select Office"
                                handleSelection={indexas => this.props.handleOfficeSelection(indexas)}
                            />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export const PassengerRouteSelection = React.forwardRef((props, ref) => <PassengerRouteSelectionInner {...props} innerRef={ref} />);