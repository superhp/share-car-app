import * as React from "react";
import InfiniteCalendar, {
    Calendar,
    withMultipleDates,
    defaultMultipleDateInterpolation
} from "react-infinite-calendar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";

import TimePickers from "../../common/TimePickers";

import "../../../styles/newRideForm.css";

const today = new Date();

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RideSchedulerHelper extends React.Component {
    state = {
        open: true
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <Dialog
                open={this.state.open}
                onClose={() => this.handleClose()}
                TransitionComponent={Transition}
            >
                <DialogTitle >Schedule Your Rides</DialogTitle>
                <Grid container>
                    <Grid item xs={12} className="calendar-container">
                        <InfiniteCalendar
                            onSelect={e => this.props.handleSelect(e)}
                            Component={withMultipleDates(Calendar)}
                            selected={this.props.selectedDates}
                            interpolateSelection={defaultMultipleDateInterpolation}
                            width={375}
                            height={380}
                            disabledDays={[0, 6]}
                            minDate={today}
                            className="calendar"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TimePickers onTimeSet={value => this.props.handleTime(value)} />
                    </Grid>
                    <Grid item xs={12} className="create-rides-button">
                        <Button
                            disabled={this.props.selectedDates.length === 0 ? true : false}
                            variant="outlined"
                            color="primary"
                            onClick={() => this.props.handleCreate()}
                        >
                            Create Rides
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}

export default RideSchedulerHelper;