import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { RoleContext } from "../helpers/roles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Map from "@material-ui/icons/Map";
import NoteAdd from "@material-ui/icons/NoteAdd";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import Cached from "@material-ui/icons/Cached";

const NavBar = props => {
  var status = props.isDriver ? "/driver" : "/passenger";
  return (
    <div className="navBar">
      <Link className="navBar-button" role="button" to={status + "/profile"}>
        <div className="button-container">
          <AccountCircleIcon />
          <div className="button-container">Profile</div>
        </div>
      </Link>
      <Link className="navBar-button" role="button" to={status + "/routes"}>
        <Map />
        <div>Routes map</div>
      </Link>
      {!props.isDriver ? (
        <Link
          className="navBar-button"
          role="button"
          to={status + "/riderequest"}
        >
          <NoteAdd />

          <div>Requests</div>
        </Link>
      ) : (
        <Link className="navBar-button" role="button" to={status + "/rides"}>
          <PlaylistAdd />

          <div>Rides</div>
        </Link>
      )}
      <Link className="navBar-button" role="button" to="/">
        <Cached />
        <div>Change role</div>
      </Link>
    </div>
  );
};
export default NavBar;
