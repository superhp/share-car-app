import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { DriverInput } from "../DriverInput";

import "../../../styles/testmap.css";
import { OfficeSelection } from "./OfficeSelection";

export class DriverRouteInput extends React.Component {
    state = {
        direction: true
    }
    render() {
        return (
            this.state.direction 
            ?
            (<div className="map-input-selection">
                <DriverInput 
                    placeholder="Select From Location"
                    onChange={(suggestion) => console.log(suggestion)}
                />
                <Button 
                    size="large" 
                    color="primary"
                    onClick={() => this.setState({direction: !this.state.direction})}
                >
                    <ImportExport fontSize="large"/>
                </Button>
                <OfficeSelection 
                    isChecked={this.props.isChecked}
                    onRadioButtonClick={() => this.props.onRadioButtonClick()}
                    onSelectionChange={() => this.props.onSelectionChange()}
                />
            </div>)
            :
            (<div className="map-input-selection">
                <OfficeSelection 
                    isChecked={this.props.isChecked}
                    onRadioButtonClick={() => this.props.onRadioButtonClick()}
                    onSelectionChange={() => this.props.onSelectionChange()}
                />
                <Button
                    size="large"
                    color="primary"
                    onClick={() => this.setState({direction: !this.state.direction})}
                >
                    <ImportExport fontSize="large"/>
                </Button>
                <DriverInput 
                    placeholder="Select To Location"
                    onChange={(suggestion) => console.log(suggestion)}
                />
            </div>)
        );
    }
}