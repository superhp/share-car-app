import UserService from "../services/userService";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { DriversRidesList } from "./DriversRidesList";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import 'typeface-roboto';
import "../styles/genericStyles.css";

export class Rides extends React.Component {
  state = {
    driversRides: [],
    clicked: false,
    selectedRideId: null
  };
  componentDidMount() {
    this.showDriversRides();
  }

  handleClick(id) {
    this.setState({
      clicked: !this.state.clicked,
      selectedRideId: id
        });
  }

  showDriversRides() {
    api
      .get("Ride")
      .then(response => {
        if (response.status == 200)
        {
          const d = response.data;
          console.log(response.data);
          this.setState({ driversRides: d });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
          <AppBar position="static" color="primary" className="generic-container-color">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Your rides (Driver)
          </Typography>
        </Toolbar>
      </AppBar>
          </Grid>
        </Grid>
        <DriversRidesList
          selectedRide={this.state.selectedRideId}
          rideClicked={this.state.clicked}
          onRideClick={this.handleClick.bind(this)}
          driversRides={this.state.clicked ? this.state.driversRides.filter(x=>x.rideId == this.state.selectedRideId) : this.state.driversRides }
          />
        </div>
      );
    }
}
export default Rides;
