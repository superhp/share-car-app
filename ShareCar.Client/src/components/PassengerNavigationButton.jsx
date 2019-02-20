import * as React from "react";
import Button from "@material-ui/core/Button";

import "../styles/genericStyles.css";

export const PassengerNavigationButton = (props) => (
    <Button
        variant="contained"
        color="primary"
        style={{ "backgroundColor": "#007bff" }}
        className="next-button"
        onClick={() => props.onClick()}
    >
        {props.text}
    </Button>
);