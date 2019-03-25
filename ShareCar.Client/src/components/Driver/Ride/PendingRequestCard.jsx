import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MapComponent from "../../Maps/MapComponent";

import "../../../styles/riderequests.css";
import "../../../styles/genericStyles.css";

export class PendingRequestCard extends React.Component {
    state = {
        show: false
    }
    render() {
        return (
            <div>
                <Card className="rides-card generic-card">
                    <Grid container justify="center">
                        <Grid item xs={12} zeroMinWidth>
                            <Grid container justify="center">
                                {!this.props.req.seenByDriver ? (
                                    <Badge
                                        className="new-badge"
                                        badgeContent={"new"}
                                        color="primary"
                                    />
                                ) : null}
                                <Typography className="name-para" component="p">
                                    #{this.props.index + 1} {this.props.req.passengerFirstName}{" "}
                                    {this.props.req.passengerLastName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} zeroMinWidth>
                            <CardActions>
                                <Button
                                    onClick={() => { this.setState({ show: !this.state.show }) }}
                                >
                                    Show on map
                    </Button>
                                {this.props.req.status !== 4 ?
                                    <div>
                                        <Button
                                            color="primary"
                                            onClick={() => this.props.onAcceptClick()}
                                        >
                                            Accept
                    </Button>
                                        <Button
                                            color="secondary"
                                            onClick={() => this.props.onDenyClick()}
                                        >
                                            Deny
                    </Button>
                                    </div>
                                    : <p>
                                        Request was canceled
                    </p>
                                }
                            </CardActions>

                        </Grid>
                    </Grid>
                </Card>
                {this.state.show ?
                    <Card className="requestMap rides-card generic-card">
                        <Grid container justify="center">
                            <Grid item xs={12} zeroMinWidth>
                                <MapComponent
                                    pickUpPoint={{ longitude: this.props.req.longitude, latitude: this.props.req.latitude }}
                                    route={this.props.req.route}
                                    index={this.props.index}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                    : <div></div>
                }
            </div>
        );
    }
}