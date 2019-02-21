import * as React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Map from "@material-ui/icons/Map";
import NoteAdd from "@material-ui/icons/NoteAdd";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import Cached from "@material-ui/icons/Cached";

import "../../styles/navbar.css";

const NavBar = props => {
  const status = props.isDriver ? "/driver" : "/passenger";
  return (
    <div className="navBar">
      <Link className="navBar-button" role="button" to={status + "/profile"}>
        <div className="button-container">
          <AccountCircleIcon />
          <div className="button-container">Profile</div>
        </div>
      </Link>
      <Link className="navBar-button" role="button" to={status + "/Map"}>
        <div className="button-container">
          <Map />
          <div className="button-container">Routes map</div>
        </div>
      </Link>
      {!props.isDriver ? (
        <Link className="navBar-button" role="button" to={status + "/Requests"}>
          <div className="button-container">
            <NoteAdd />

            <div className="button-container">Requests</div>
          </div>
        </Link>
      ) : (
        <Link className="navBar-button" role="button" to={status + "/rides"}>
          <div className="button-container">
            <PlaylistAdd />

            <div className="button-container">Rides</div>
          </div>
        </Link>
      )}
      <Link className="navBar-button" role="button" to="/">
        <div className="button-container">
          <Cached />
          <div className="button-container">Change role</div>
        </div>
      </Link>
    </div>
  );
};
export default NavBar;
