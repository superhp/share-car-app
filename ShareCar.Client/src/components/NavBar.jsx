import * as React from "react";
import '../styles/navbar.css';

export class NavBar extends React.Component<{}>
{
    render() {
        return (
            <div className ="navBar">
                <button className="navBar-button"> Profile </button>
                <button className="navBar-button"> Routes map </button>
                <button className="navBar-button"> Rides </button>
                <button className="navBar-button"> Change role </button>
            </div>
        );
    }
}