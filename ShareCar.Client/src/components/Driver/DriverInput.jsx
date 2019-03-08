import * as React from "react";
import SimpleMenu from "../common/SimpleMenu";
import AlgoliaPlaces from "algolia-places-react";
import Close from "@material-ui/icons/Close";

import "../../styles/genericStyles.css";

export const DriverInput = React.forwardRef((props, ref) => (
    <div className="form-group">
        <AlgoliaPlaces
            placeholder={props.placeholder}
            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => props.onChange(suggestion)}
            onClear={() => props.onChange(null)}
            ref={ref}
        />
<Close/>
    </div>
));