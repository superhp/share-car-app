import * as React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";

import "../../styles/driversRidesList.css";
import "../../styles/genericStyles.css";
import "../../styles/driversRidesList.css";

export class WinnersList extends React.Component {
  render() {
    return (
      <Grid container>
        {this.props.winnersList.map((winner, index) => (
          <Grid item xs={12}>
            <Card className="rides-card">
              <CardActions>
                <Grid container>
                  <CardContent className="winner-mapping">
                    <Typography component="p">
                      {winner.firstName} {winner.lastName}
                    </Typography>
                    <Typography variant="display1">
                      {this.props.pointsList[index]} pts
                    </Typography>
                  </CardContent>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
