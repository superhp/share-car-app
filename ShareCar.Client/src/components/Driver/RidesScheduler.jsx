import React from "react";
import PropTypes from "prop-types";
import api from "../../helpers/axiosHelper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import InfiniteCalendar, {
  Calendar,
  withMultipleDates,
  defaultMultipleDateInterpolation
} from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once
import "../common/TimePickers";
import TimePickers from "../common/TimePickers";
import addressParser from "../../helpers/addressParser";
import SnackBars from "../common/Snackbars";

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

  componentDidMount() {
      addressParser.parseCustomAddress(this.props.routeInfo.fromAddress)
    );
  }

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

  handleCreate = () => {
    var ridesToPost = [];
    var fromAddressParsed = addressParser.parseCustomAddress(
      this.props.routeInfo.fromAddress
    );
    var toAddressParsed = addressParser.parseCustomAddress(
      this.props.routeInfo.toAddress
    );
    this.state.selectedDates.forEach(element => {
      var month = element.getMonth() + 1;

      ridesToPost.push({
        fromNumber: fromAddressParsed.number,
        fromStreet: fromAddressParsed.street,
        fromCity: fromAddressParsed.city,
        fromCountry: "Lithuania",
        toNumber: toAddressParsed.number,
        toStreet: toAddressParsed.street,
        toCity: toAddressParsed.city,
        toCountry: "Lithuania",
        routeGeometry: this.props.routeInfo.routeGeometry,
        rideDateTime:
          element.getFullYear() +
          "-" +
          month +
          "-" +
          element.getDate() +
          "T" +
          this.state.time
      });
    });
    api.post("Ride", ridesToPost).then(res => {

      if (res.status === 200) {
        this.setState({
          open: false,
          snackBarClicked: true,
          snackBarMessage: "Rides successfully created!"
        });
        setTimeout(
          function() {
            this.setState({ snackBarClicked: false });
          }.bind(this),
          3000
        );
      }
    });
  };

  handleTime = value => {
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
                  variant="subheading"
                  color="inherit"
                  className={classes.flex}
                >
                  Schedule Your Rides
                </Typography>
                <Button
                  disabled={this.state.selectedDates.length === 0 ? true : false}
                  variant="contained"
                  color="inherit"
                  onClick={this.handleCreate}
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
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
        />
      </div>
    );
  }
}

RidesScheduler.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RidesScheduler);
