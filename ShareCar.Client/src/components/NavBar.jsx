import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import {RoleContext}  from "../helpers/roles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Map from "@material-ui/icons/Map";
import NoteAdd from "@material-ui/icons/NoteAdd";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import Cached from "@material-ui/icons/Cached";

export default class NavBar extends React.Component<{}> {
  render() {
    return (
      <div className="navBar">
        <Link className="navBar-button" role="button" to="/profile">
          <div className="button-container">
            <  AccountCircleIcon/>   
              < div className="button-container">Profile</div>  
          </div>  
        </Link> 
      <Link className="navBar-button" role="button" to="/routes">
        <Map/>
          <div>Routes map</div>   
      </Link>
        <RoleContext.Consumer>
      {
        ({role}) => (
      role === "driver"
      ? <Link className="navBar-button" role="button" to="/riderequest">
          <NoteAdd/>
          
        <div>Requests</div>   
        </Link>
      : <Link className="navBar-button" role="button" to="/rides">
          <PlaylistAdd/>
          
        <div>Rides</div>   
        </Link>
      )}
      </RoleContext.Consumer>
        <Link className="navBar-button" role="button" to="/">
          <Cached/>
        <div>Change role</div>   
        </Link>
      </div>
    );
  }
}
