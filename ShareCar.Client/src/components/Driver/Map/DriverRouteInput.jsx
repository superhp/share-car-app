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
        this.autocompleteInputs = [];
    }
    state = {
        direction: true,
        checkedOffice: OfficeAddresses[0],
        r: this.props.routePoints
    }
    componentDidMount() {
        this.props.onRef(this)
        this.autocompleteInputs = [];
        console.log("mou-------------------nt");

    }
    setAutocomplete(value) {
        console.log(this.autocompleteInputs);
        this.autocompleteInputs[this.autocompleteInputs.length - 1].value = value
    }

    assignNamesToInputs (){
   //     console.log(this.autocompleteInputs);
   //     console.log(this.props.routePoints);
        for (var i = 0; i < this.autocompleteInputs.length - 2; i++) {
            this.autocompleteInputs[i].value = this.props.routePoints[i].displayName;
        }
        this.autocompleteInputs[this.autocompleteInputs.length - 1].value = "";
    }

    render() {
        return (

            this.state.direction
                ?
                (<div className="map-input-selection">
                    {this.autocompleteInputs = []}
                    {this.state.r.map((element, index) => (
                        <AddressInput
                            key={index}
                            id={element.id}
                            r={element}
                            i={index}
                            undeletable={element.id === this.props.initialId}
                            removeRoutePoint={id => {this.props.removeRoutePoint(id); this.setState({r: this.props.routePoints})}}
                            placeholder="Select From Location"
                            // onChange={(suggestion) => this.props.onFromAddressChange(fromAlgoliaAddress(suggestion))}
                            //   ref={this.props.innerRef}
                            ref={e => {
                                if (e) {

                                    this.autocompleteInputs.push(e.autocompleteElem);
                                }
                            }}
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