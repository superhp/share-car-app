import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { DriverInput } from "../DriverInput";
import { OfficeAddresses } from "../../../utils/AddressData";

import "../../../styles/testmap.css";
import SimpleMenu from "../../common/SimpleMenu";

const fromAlgoliaAddress = address => {
    console.log("Original address", address);
    if(!address) return null;
    let streetNumber = "";
    let street = address.name;
    const firstDigit = address.name.match(/\d/);
    if (firstDigit !== null) {
        const indexOfFirstDigit = address.name.indexOf(firstDigit);
        const indexOfFirstSpace = address.name.indexOf(" ");
        streetNumber = address.name.substring(indexOfFirstDigit, indexOfFirstSpace);
        street = address.name.substring(indexOfFirstSpace + 1);
    }
    return {
        number: streetNumber,
        street: street,
        city: address.city,
        country: address.country,
        latitude: address.latlng.lat,
        longitude: address.latlng.lng
    };
};

class DriverRouteInputInner extends React.Component {
    state = {
        direction: true,
        checkedOffice: OfficeAddresses[0]
    }
    render() {
        return (
            this.state.direction 
            ?
            (<div className="map-input-selection">
                <DriverInput 
                    placeholder="Select From Location"
                    onChange={(suggestion) => this.props.onFromAddressChange(fromAlgoliaAddress(suggestion))}
                    ref={this.props.innerRef}
                />
                <Button 
                    size="large" 
                    color="primary"
                    onClick={() => {
                        this.setState({direction: !this.state.direction});
                        this.props.onFromAddressChange(this.state.checkedOffice);
                        this.props.onToAddressChange(null);
                    }}
                >
                    <ImportExport fontSize="large"/>
                </Button>
                <SimpleMenu
                    buttonText="Select Office"
                    handleSelection={office => {
                        console.log(office);
                        this.props.onToAddressChange(office);
                    }}
                />
            </div>)
            :
            (<div className="map-input-selection">
                <SimpleMenu
                    buttonText="Select Office"
                    handleSelection={office =>
                        this.props.onFromAddressChange(office)
                    }
                />
                <Button
                    size="large"
                    color="primary"
                    onClick={() => {
                        this.setState({direction: !this.state.direction});
                        this.props.onFromAddressChange(null);
                        this.props.onToAddressChange(this.state.checkedOffice);
                    }}
                >
                    <ImportExport fontSize="large"/>
                </Button>
                <DriverInput 
                    placeholder="Select To Location"
                    onChange={(suggestion) => this.props.onToAddressChange(fromAlgoliaAddress(suggestion))}
                    ref={this.props.innerRef}
                />
            </div>)
        );
    }
}

export const DriverRouteInput = React.forwardRef((props, ref) => <DriverRouteInputInner {...props} innerRef={ref} />);