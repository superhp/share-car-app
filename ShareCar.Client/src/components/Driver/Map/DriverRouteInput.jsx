import * as React from "react";
import Button from "@material-ui/core/Button";
import ImportExport from "@material-ui/icons/ImportExport";

import { AddressInput } from "../../common/AddressInput";
import { fromAlgoliaAddress } from "../../../utils/addressUtils";

import "../../../styles/testmap.css";
import SimpleMenu from "../../common/SimpleMenu";

export class DriverRouteInput extends React.Component {

    render() {
        return (
            <div className="map-input-selection">
                {this.props.routePoints.map((element, index) => (
                    <AddressInput
                        className="driver-route-input"
                        key={index}
                        index={index}
                        deletable={index !== this.props.routePoints.length - 1}
                        removeRoutePoint={id => { this.props.removeRoutePoint(id) }}
                        placeholder={this.props.isRouteToOffice ? "From location" : "To location"}
                        onChange={(suggestion, index) => this.props.changeRoutePoint(fromAlgoliaAddress(suggestion), index)}
                          displayName={(index + 1) < this.props.routePoints.length
                            ? this.props.routePoints[index + 1].displayName
                            : ""
                        }
                    />
                ))}
                <div className="route-creation-input-buttons">
                    <Button
                        variant="contained"
                        className="select-office-menu"
                        onClick={() => {
                            this.props.changeDirection();
                        }}
                        aria-haspopup="true"
                    >
                        <ImportExport fontSize="default" />
                    </Button>
                    <SimpleMenu
                        handleSelection={office => {
                            this.props.changeRoutePoint(office, -1);
                        }}
                    />
                </div>
            </div>
        );
    }
}
