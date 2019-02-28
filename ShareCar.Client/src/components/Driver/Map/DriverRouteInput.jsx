import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { DriverInput } from "../DriverInput";

import "../../../styles/testmap.css";
import { OfficeSelection } from "./OfficeSelection";

export const DriverRouteInput = (props) => (
    props.direction === "from" 
        ?
        (<div className="map-input-selection">
            <DriverInput 
                inputId="driver-address-input-from"
                placeholder="Select From Location"
                handleOfficeSelection={(e, indexas, button) =>
                    props.handleOfficeSelection(e, indexas, button)
                }
                direction={props.direction}
            />
            <Button style={{ zIndex: 999999 }} size="large" color="primary">
                <ImportExport fontSize="large"/>
            </Button>
            <OfficeSelection 
                isChecked={props.isChecked}
            />
        </div>)
        :
        (<div className="map-input-selection">
            <OfficeSelection 
                isChecked={props.isChecked}
            />
            <Button style={{ zIndex: 999999 }} size="large" color="primary">
                <ImportExport fontSize="large"/>
            </Button>
            <DriverInput 
                inputId="driver-address-input-to"
                placeholder="Select To Location"
                handleOfficeSelection={(e, indexas, button) =>
                    props.handleOfficeSelection(e, indexas, button)
                }
                direction={props.direction}
            />
        </div>)
);