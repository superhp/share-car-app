import * as React from "react";
import SimpleMenu from "./SimpleMenu";
import AlgoliaPlaces from "algolia-places-react";
import Close from "@material-ui/icons/Close";

import "../../styles/genericStyles.css";

export class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.algoliaRef = React.createRef();

    }

    componentDidMount() {
        var places = require('../../../node_modules/places.js');
        this.placesAutocomplete = places({
            container: this.algoliaRef.current.autocomplete.autocomplete[0],
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && this.algoliaRef.current && this.placesAutocomplete) {
            this.placesAutocomplete.setVal(nextProps.displayName ? nextProps.displayName : "");
        }
    }

    render() {

        return (
            <div className="form-group">
                <AlgoliaPlaces
                    onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => this.props.onChange(suggestion, this.props.index)}
                    onClear={() => this.props.onChange(null)}
                    ref={this.algoliaRef}
                />
                {
                    this.props.deletable ?
                        <Close
                            className="remove-route-point"

                            onClick={() => { this.props.removeRoutePoint(this.props.index) }}
                        />
                        :
                        <div></div>
                }
            </div>
        );
    }
}