import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { DriverInput } from "../DriverInput";

import "../../../styles/testmap.css";
import { OfficeSelection } from "./OfficeSelection";

export const DriverRouteInput = (props) => (
    props.direction 
        ?
        (<div className="map-input-selection">
            <DriverInput 
                inputId="driver-address-input-from"
                placeholder="Select From Location"
                handleOfficeSelection={(e, indexas, button) =>
                    props.handleOfficeSelection(e, indexas, button)
                }
                direction="from"
            />
            <Button 
                style={{ zIndex: 999 }} 
                size="large" 
                color="primary"
                onClick={() => props.handleDirection()}
            >
                <ImportExport fontSize="large"/>
            </Button>
            <OfficeSelection 
                isChecked={props.isChecked}
                onRadioButtonClick={() => props.onRadioButtonClick()}
                onSelectionChange={() => props.onSelectionChange()}
            />
        </div>)
        :
        (<div className="map-input-selection">
            <OfficeSelection 
                isChecked={props.isChecked}
                onRadioButtonClick={() => props.onRadioButtonClick()}
                onSelectionChange={() => props.onSelectionChange()}
            />
            <Button
                style={{ zIndex: 999 }}
                size="large"
                color="primary"
                onClick={() => props.handleDirection()}
            >
                <ImportExport fontSize="large"/>
            </Button>
            <DriverInput 
                inputId="driver-address-input-to"
                placeholder="Select To Location"
                handleOfficeSelection={(e, indexas, button) =>
                    props.handleOfficeSelection(e, indexas, button)
                }
                direction="to"
            />
        </div>)
);