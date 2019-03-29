import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import "typeface-roboto";

import { WinnersList } from "./WinnersList";
import api from "../../helpers/axiosHelper";

import "../../styles/genericStyles.css";
import "../../styles/winnerBoard.css";

export class WinnerBoard extends React.Component {
  state = {
    winners: [],
    points: []
  };
  componentDidMount() {
    this.showWinnersBoard();
  }

  componentWillReceiveProps(nextProps){
    this.showWinnersBoard();
  }

  showWinnersBoard() {
    api.get("user/WinnerBoard")
      .then(response => {
        if (response.status === 200) {
          this.setState({ winners:  response.data.users, points:  response.data.points });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <Paper>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <AppBar position="static" color="primary" />
              <Typography
                variant="display1"
                color="inherit"
                className="winner-container"
              >
                TOP 5
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <WinnersList
          winnersList={this.state.winners}
          pointsList={this.state.points}
        />
      </Paper>
    );
  }
}
export default WinnerBoard;
