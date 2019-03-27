import * as React from "react";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { DriverRoutesSugestions } from "./DriverRoutesSugestions";

import "../../../styles/driversRidesList.css";

class DriverRoutesSugestionsModal extends React.Component {
    state = {
      open: false
    };
  
    handleClickOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = value => {
      this.setState({open: false });
    };
  
    render() {
      return (
            <div className="drivers-sugestion-modal">
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Show drivers
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">Drivers for this route</DialogTitle>
                    <div>
                        <List>
                          <DriverRoutesSugestions
                            rides={this.props.rides}
                            onRegister={ride => this.props.onRegister(ride)}
                          />
                        </List>
                    </div>
                </Dialog>
            </div>
      );
    }
  }
  
  export default DriverRoutesSugestionsModal;