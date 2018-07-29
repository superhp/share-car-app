import * as React from "react";

export class RideRequest extends React.Component {
    render(){
        return(
            <div>
            <span>{this.props.DateTime}</span>
            <span>{this.props.PickUpPoint}</span>
            <span>{this.props.Driver}</span>
            <span>{this.props.Status}</span>
</div>
        );
    }
}