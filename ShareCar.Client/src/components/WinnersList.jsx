import * as React from "react";
import axios from "axios";
import api from "../helpers/axiosHelper";
import "../styles/driversRidesList.css";
import { Route, Link } from "react-router-dom";
import NewRideForm from "./NewRideForm";
import PassengersList from "./PassengersList";
import "../styles/genericStyles.css";
import "../styles/driversRidesList.css";
import { ViewRideRequests } from "../components/ViewRideRequests";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import 'typeface-roboto'

export class WinnersList extends React.Component {
    render() {
        return (
            <Grid container>
                <td className="rides-card name-container"> 
                    {this.props.winnersList.map((winner, index) => (
                        <Grid item xs={12}>
                            <Card className="rides-card">
                                <CardActions>
                                    <CardContent >
                                        <Typography component="p">
                                            {winner.firstName} {winner.lastName}
                                        </Typography>
                                    </CardContent>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </td>
                <td className="point-container">
                    {this.props.pointsList.map((point, index) => (
                        <Grid item xs={12}>
                            <Card className="rides-card ">
                                <CardActions>
                                    <CardContent>
                                        <Typography component="p">
                                            {point}
                                        </Typography>
                                    </CardContent>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </td>
            </Grid>
        )
    }
}