import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../../styles/genericStyles.css";
import RidePassengerCard from "./RidePassengerCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export class RidePassengersList extends React.Component {
  render() {
    return (
      this.props.passengers != null ? (
        <List>
          {this.props.passengers.length !== 0
            ? this.props.passengers.map((passenger, index) => (
              <ListItem>
                <RidePassengerCard
                  passenger={passenger}
                  index={index}
                />
              </ListItem>
            ))
            : "Ride doesn't have any passengers"}
        </List>
      ) : null
    );
  }
}