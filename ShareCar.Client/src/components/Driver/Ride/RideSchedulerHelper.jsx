import * as React from "react";
import InfiniteCalendar, {
    Calendar,
    withMultipleDates,
    defaultMultipleDateInterpolation
} from "react-infinite-calendar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

import TimePickers from "../../common/TimePickers";

const today = new Date();

export const RideSchedulerHelper = (props) => (
    <Grid container justify="center">
        <AppBar className={props.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={() => props.handleClose()}
                    aria-label="Close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    variant="subheading"
                    color="inherit"
                    className={props.flex}
                >
                    Schedule Your Rides
                </Typography>
                <Button
                    disabled={props.selectedDates.length === 0 ? true : false}
                    variant="contained"
                    color="inherit"
                    onClick={() => props.handleCreate()}
                >
                    Create Rides
                </Button>
            </Toolbar>
        </AppBar>
        <InfiniteCalendar
            onSelect={e => props.handleSelect(e)}
            Component={withMultipleDates(Calendar)}
            selected={props.selectedDates}
            interpolateSelection={defaultMultipleDateInterpolation}
            width={375}
            height={380}
            disabledDays={[0, 6]}
            minDate={today}
        />
        <TimePickers onTimeSet={value => props.handleTime(value)} />
    </Grid>
);