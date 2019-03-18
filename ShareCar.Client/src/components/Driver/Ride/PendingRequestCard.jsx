import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import "../../../styles/riderequests.css";

export const PendingRequestCard = (props) => (
    
    <Card className="rides-card">
                 {console.log("-------------------------")}
                    {console.log(props)}
                    {console.log(props.req)}
        <Grid container justify="center">
            <Grid item xs={12} zeroMinWidth>
                <Grid container justify="center">
                    {!props.req.seenByDriver ? (
                    <Badge
                        className="new-badge"
                        badgeContent={"new"}
                        color="primary"
                    />
                    ) : null}
                    <Typography className="name-para" component="p">
                        #{props.index + 1} {props.req.passengerFirstName}{" "}
                        {props.req.passengerLastName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} zeroMinWidth>
                <CardActions>
                    <Button
                        onClick={() => props.onShowClick()}
                    >
                        Show on map
                    </Button>
                    {props.req.status !== 4 ? 
                    <div>
                    <Button
                        color="primary"
                        onClick={() => props.onAcceptClick()}
                    >
                        Accept
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => props.onDenyClick()}
                    >
                        Deny
                    </Button>
                    </div>
                    :<p>
                    Request was canceled
                    </p>
                }
                </CardActions>
            </Grid>
        </Grid>
    </Card>
);