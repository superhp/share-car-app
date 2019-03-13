import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { AddressInput } from "../../common/AddressInput";
import { OfficeAddresses } from "../../../utils/AddressData";
import { fromAlgoliaAddress } from "../../../utils/addressUtils";

import "../../../styles/testmap.css";
import SimpleMenu from "../../common/SimpleMenu";

class DriverRouteInputInner extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        direction: true,
        checkedOffice: OfficeAddresses[0],
    }
componentDidMount(){
    console.log("FFFFF")
}
    render() {
        return (

            this.state.direction
                ?
                (<div className="map-input-selection">
                    {this.props.routePoints.map((element, index) => (
                        <AddressInput
                            key={index}
                            index={index}
                            deletable={index !== this.props.routePoints.length - 1}
                            removeRoutePoint={id => { this.props.removeRoutePoint(id); this.setState({ r: this.props.routePoints }) }}
                            placeholder="Select From Location"
                            onChange={(suggestion) => this.props.onFromAddressChange(fromAlgoliaAddress(suggestion))}
                            ref={this.props.innerRef}
                        />
                    ))}

                    <Button
                        size="large"
                        color="primary"
                        onClick={() => {
                            this.setState({ direction: !this.state.direction });
                            this.props.clearVectorSource();
                            this.props.clearRoutePoints(this.checkedOffice);
                            this.props.setInitialFromAddress(this.checkedOffice);
                            this.props.onFromAddressChange(this.state.checkedOffice);
                            this.props.onToAddressChange(null);
                        }}
                    >
                        <ImportExport fontSize="large" />
                    </Button>
                    <SimpleMenu
                        buttonText="Select Office"
                        handleSelection={office => {
                            console.log(office);
                            this.props.onToAddressChange(office);
                            this.setState({ checkedOffice: office });
                        }}
                    />
                    {() => {
                        console.log("llllllll");
                        console.log(this.autocompleteInputs);
                        console.log(this.props.routePoints);
                        for (var i = 0; i < this.autocompleteInputs.length - 1; i++) {
                            this.autocompleteInputs[i].value = this.props.routePoints[i].displayName;
                        }
                        this.autocompleteInputs[this.autocompleteInputs.length - 1].value = "";
                    }}
                </div>)
                :
                (<div className="map-input-selection">
                    <SimpleMenu
                        buttonText="Select Office"
                        handleSelection={office => {
                            this.props.onFromAddressChange(office);
                            this.setState({ checkedOffice: office });
                        }
                        }
                    />
                    <Button
                        size="large"
                        color="primary"
                        onClick={() => {
                            this.setState({ direction: !this.state.direction });
                            this.props.clearVectorSource();
                            this.props.clearRoutePoints(this.checkedOffice);
                            this.props.setInitialToAddress(this.checkedOffice);
                            this.props.onFromAddressChange(null);
                            this.props.onToAddressChange(this.state.checkedOffice);
                        }}
                    >
                        <ImportExport fontSize="large" />
                    </Button>
                    <AddressInput

                        placeholder="Select To Location"
                        onChange={(suggestion) => this.props.onToAddressChange(fromAlgoliaAddress(suggestion))}
                        ref={this.props.innerRef}
                    />
                </div>)
        );
    }
}

export const DriverRouteInput = React.forwardRef((props, ref) => <DriverRouteInputInner {...props} innerRef={ref} />);