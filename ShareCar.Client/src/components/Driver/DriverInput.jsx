import * as React from "react";
import SimpleMenu from "../common/SimpleMenu";

import "../../styles/genericStyles.css";

export const DriverInput = (props) => (
    <div className="form-group">
        <input
            type="search"
            className="form-group location-select"
            id={props.inputId}
            placeholder={props.placeholder}
        />
        {/* <SimpleMenu
            handleSelection={(e, indexas, button) =>
                props.handleOfficeSelection(e, indexas, button)
            }
            whichButton={props.direction}
        /> */}
    </div>
);