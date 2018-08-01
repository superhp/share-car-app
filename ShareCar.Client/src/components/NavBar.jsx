import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default class NavBar extends React.Component<{}> {
  render() {
    return (
      <div className="navBar">
        <Link className="navBar-button" to="/profile">
          <button className="btn btn-primary">Profile</button>
        </Link>
        <Link className="navBar-button" to="/routes">
          <button className="btn btn-primary">Routes map</button>
        </Link>
        <Link className="navBar-button" to="/rides">
          <button className="btn btn-primary">Rides</button>
        </Link>
        <Link className="navBar-button" to="/">
          <button className="btn btn-primary">Change role</button>
        </Link>
      </div>
    );
  }
}
