import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import {RoleContext}  from "../helpers/roles";
import userLogo from "../images/user.png";
import routesMapLogo from "../images/routesmap.png";
import changeRoleLogo from "../images/changerole.png";
import addLogo from "../images/add.png";

export default class NavBar extends React.Component<{}> {
  render() {
    return (
      <div className="navBar">
      <Link className="navBar-button" role="button" to="/profile">
        <img src={userLogo}/>
      </Link>
    
      <Link className="navBar-button" role="button" to="/routes">
      <img src={routesMapLogo}/>
      </Link>
        <RoleContext.Consumer>
      {
        role => (
      role === "driver"
      ? <Link className="navBar-button" role="button" to="/riderequest">
          <img src={addLogo}/>
        </Link>
      : <Link className="navBar-button" role="button" to="/rides">
          <img src={addLogo}/>
        </Link>
      )}
    </RoleContext.Consumer>
        <Link className="navBar-button" role="button" to="/">
          <img src={changeRoleLogo}/>
        </Link>
      </div>
    );
  }
}
