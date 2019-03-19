import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import api from "../../../helpers/axiosHelper";
import "../../common/TimePickers";
import addressParser from "../../../helpers/addressParser";
import SnackBars from "../../common/Snackbars";
import {SnackbarVariants} from "../../common/SnackbarVariants";
import { RideSchedulerHelper } from "./RideSchedulerHelper";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RidesScheduler extends React.Component {
  state = {
    open: true,
    selectedDates: [],
    time: "07:00",
    snackBarClicked: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSelect(e) {
    if (this.state.selectedDates.length > 0) {
      if (this.checkForDateDuplicate(e, this.state.selectedDates)) {
        let index = -1;
        for (let i = 0; i < this.state.selectedDates.length; i++) {
          if (this.state.selectedDates[i].getTime() === e.getTime()) {
            index = i;
            break;
          }
        }
        let clone = [...this.state.selectedDates];
        clone.splice(index, 1);
        this.setState(prevState => ({
          selectedDates: clone
        }));
      } else {
        this.setState(prevState => ({
          selectedDates: [...prevState.selectedDates, e]
        }));
      }
    } else {
      this.setState(prevState => ({
        selectedDates: [...prevState.selectedDates, e]
      }));
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleCreate = () => {
    let ridesToPost = [];
    const {fromAddress, toAddress} = this.props.routeInfo;
    this.state.selectedDates.forEach(element => {
      ridesToPost.push(this.createRide(fromAddress, toAddress, element));
    });
    
    this.postRides(ridesToPost);
  };

  createRide(from, to, element) {

    const ride = {
      fromNumber: from.number,
      fromStreet: from.street,
      fromCity: from.city,
      fromCountry: "Lithuania",
      toNumber: to.number,
      toStreet: to.street,
      toCity: to.city,
      toCountry: "Lithuania",
      routeGeometry: this.props.routeInfo.routeGeometry,
      fromLongitude:from.longitude,
      fromLatitude:from.latitude,
      toLongitude:to.longitude,
      toLatitude:to.latitude,
      rideDateTime:
        element.getFullYear() +
        "-" +
        (element.getMonth() + 1) + 
        "-" +
        element.getDate() +
        "  " +
        this.state.time
    };
    return ride;
  }

  postRides(ridesToPost) {
    api.post("Ride", ridesToPost).then(res => {
      if (res.status === 200) {
        this.setState({
          open: false,
          snackBarClicked: true,
          snackBarMessage: "Rides successfully created!",
          snackBarVariant: SnackbarVariants[0]
        });
        setTimeout(
          function() {
            this.setState({ snackBarClicked: false });
          }.bind(this),
          3000
        );
      }
    });
  }

  handleTime = value => {
    this.setState({ time: value });
  };

  checkForDateDuplicate = function(needle, haystack) {
    for (let i = 0; i < haystack.length; i++) {
      if (needle.getTime() === haystack[i].getTime()) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={() => this.handleClose()}
          TransitionComponent={Transition}
        >
          <RideSchedulerHelper 
            appBar={this.props.appBar}
            handleClose={() => this.handleClose()}
            flex={this.props.flex}
            selectedDates={this.state.selectedDates}
            handleCreate={() => this.handleCreate()}
            handleSelect={e => this.handleSelect(e)}
            handleTime={value => this.handleTime(value)}
          />
        </Dialog>
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
          variant={this.state.snackBarVariant}

        />
      </div>
    );
  }
}

RidesScheduler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RidesScheduler);
