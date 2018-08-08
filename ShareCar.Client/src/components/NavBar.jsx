import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import {RoleContext}  from "../helpers/roles";

export default class NavBar extends React.Component<{}> {
  render() {
    return (
      <div className="navBar">
      <Link className="navBar-button" role="button" to="/profile">Profile</Link>
    
        <Link className="navBar-button" role="button" to="/routes">Routes map</Link>
        <RoleContext.Consumer>
      {
        role => (
      role === "driver"
      ? <Link className="navBar-button" role="button" to="/riderequest">Requests</Link>
      : <Link className="navBar-button" role="button" to="/rides">Rides</Link>
      )}
    </RoleContext.Consumer>
        <Link className="navBar-button" role="button" to="/">Change role</Link>
      </div>
    );
  }
}
