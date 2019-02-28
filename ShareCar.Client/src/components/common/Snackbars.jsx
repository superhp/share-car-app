import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

import SnackbarsContent from "./SnackbarContent";
import { snackbarMargin } from "../../utils/snackbarStyles";

class Snackbars extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.snackBarClicked}
          autoHideDuration={6000}
          onClose={(e, r) => this.handleClose(e, r)}
        >
          <SnackbarsContent
            onClose={(e, r) => this.handleClose(e, r)}
            variant="success"
            message={this.props.message}
          />
        </Snackbar>
      </div>
    );
  }
}

Snackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(snackbarMargin)(Snackbars);
