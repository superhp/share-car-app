import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from "../../../helpers/axiosHelper";

class RideCompletedNotification extends React.Component {
    state = {
      open: true
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    sendResponse(response, rideId) {
        const passengerResponse = {
            Response: response,
            RideId: rideId
        }
        api.post(`https://localhost:44347/api/Ride/passengerResponse`, passengerResponse);
    }
  
    render() {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Have you participated in these rides?"}</DialogTitle>
            {this.props.rides.map((ride, i) => 
               <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Driver: {ride.driverFirstName} {ride.driverLastName}
                        <br/>
                        Ride time: {ride.rideDateTime}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => {
                                this.handleClose();
                                if(this.props.rides.length === i+1) this.sendResponse(true, ride.rideId);
                            }} 
                            color="primary"
                            autoFocus
                        >
                            Yes
                        </Button>
                        <Button onClick={() => {
                                this.handleClose();
                                if(this.props.rides.length === i+1) this.sendResponse(false, ride.rideId);
                            }} 
                            color="primary"
                        >
                            No
                        </Button>
                    </DialogActions>
                </DialogContent> 
            )}
          </Dialog>
        </div>
      );
    }
  }
  
export default RideCompletedNotification;