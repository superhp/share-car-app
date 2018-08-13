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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { WinnersList } from "./WinnersList";
import 'typeface-roboto';
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
            .catch(function (error) {
                console.error(error);
            });
    }
    render() {
        return (
            <div>
                <Link role="button" to={"/driver/profile"}>Profile</Link>
                <Grid container>
                     <Grid item xs={12}>
                         <AppBar position="static" color="primary" >
                         </AppBar>
                         <Typography variant="title" color="inherit" className="winner-container">
                                     TOP 5
                        </Typography>
                     </Grid>
                 </Grid>
                <WinnersList winnersList={this.state.winners}
                    pointsList={this.state.points} />
            </div>
        )
    }
} export default WinnerBoard;