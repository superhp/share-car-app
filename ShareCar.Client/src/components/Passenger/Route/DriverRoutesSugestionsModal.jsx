import * as React from "react";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

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
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Show drivers
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">Drivers for this route</DialogTitle>
                    <div>
                        <List>
                        {emails.map(email => (
                            <ListItem button>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                        </List>
                    </div>
                </Dialog>
            </div>
      );
    }
  }
  
  export default DriverRoutesSugestionsModal;