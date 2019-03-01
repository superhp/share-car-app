import * as React from "react";
import SimpleMenu from "../common/SimpleMenu";
import AlgoliaPlaces from "algolia-places-react";

import "../../styles/genericStyles.css";

export const DriverInput = (props) => (
    <div className="form-group">
        <AlgoliaPlaces
            // className="form-group location-select"
            //id={props.inputId}
            placeholder={props.placeholder}
            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => props.onChange(suggestion)}
            onClear={() => props.onChange(null)}
        />
    </div>
);