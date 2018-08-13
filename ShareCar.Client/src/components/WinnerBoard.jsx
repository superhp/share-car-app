import UserService from "../services/userService";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import axios from "axios";
import api from "../helpers/axiosHelper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { WinnersList } from "./WinnersList";
import "typeface-roboto";
import "../styles/genericStyles.css";
import "../styles/winnerBoard.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export class WinnerBoard extends React.Component {
  state = {
    winners: [],
    points: []
  };
  componentDidMount() {
    this.showWinnersBoard();
  }
  showWinnersBoard() {
    api
      .get("user/WinnerBoard")
      .then(response => {
        if (response.status == 200) {
          const d = response.data;
          console.log(response.data);
          this.setState({ winners: d.users });
          this.setState({ points: d.points });
        }
      })
      .catch(function(error) {
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
