import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import { render } from "react-dom";
import InfiniteCalendar, {
  Calendar,
  withMultipleDates,
  defaultMultipleDateInterpolation
} from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import "./common/TimePickers";
import TimePickers from "./common/TimePickers";
import Switch from "@material-ui/core/Switch";
var moment = require("moment");

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

// Render the Calendar
var today = new Date();
var lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RidesScheduler extends React.Component {
  state = {
    open: true,
    selectedDates: [],
    time: "7:00"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSelect(e) {
    if (this.state.selectedDates.length > 0) {
      if (this.checkForDateDuplicate(e, this.state.selectedDates)) {
        var index = -1;
        for (var i = 0; i < this.state.selectedDates.length; i++) {
          if (this.state.selectedDates[i].getTime() === e.getTime()) {
            index = i;
            break;
          }
        }
        var clone = [...this.state.selectedDates];
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

  handleTime = value => {
    console.log(value);
    this.setState({ time: value });
  };

  checkForDateDuplicate = function(needle, haystack) {
    for (var i = 0; i < haystack.length; i++) {
      if (needle.getTime() === haystack[i].getTime()) {
        return true;
      }
    }
    return false;
  };

  returnUnique = function(duplicateArray) {
    var uniqueDates = [];
    for (var i = 0; i < duplicateArray.length; i++) {
      if (!this.checkForDateDuplicate(duplicateArray[i], uniqueDates)) {
        uniqueDates.push(duplicateArray[i]);
      }
    }
    return uniqueDates;
  };

  render() {
    // console.log(this.state.selectedDates);
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <Grid container justify="center">
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="p"
                  color="inherit"
                  className={classes.flex}
                >
                  Schedule Your Rides
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  Create Rides
                </Button>
              </Toolbar>
            </AppBar>
            <InfiniteCalendar
              onSelect={e => {
                this.handleSelect(e);
              }}
              Component={withMultipleDates(Calendar)}
              selected={[...this.state.selectedDates]}
              interpolateSelection={defaultMultipleDateInterpolation}
              width={375}
              height={380}
              disabledDays={[0, 6]}
              minDate={today}
            />
            <TimePickers onTimeSet={value => this.handleTime(value)} />
            {/* <Switch checked={true} value="checkedA" /> */}
          </Grid>
        </Dialog>
      </div>
    );
  }
}

RidesScheduler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RidesScheduler);
