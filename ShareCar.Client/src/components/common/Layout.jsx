// @flow
import * as React from "react";
import "../../styles/layout.css";
import "../../styles/genericStyles.css";
import UserService from "../../services/userService";
import AuthenticationService from "../../services/authenticationService";
import NavBar from "./NavBar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { LinksToHeadings } from "../LinkDictionary";

type LayoutProps = {
  children?: React.Node
};

class Layout extends React.Component<LayoutProps, MyProfileState> {
  state: MyProfileState = { loading: true, user: null };
  userService = new UserService();
  authService = new AuthenticationService();

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateLoggedInUser);
  }

  updateLoggedInUser = (user: UserProfileData) => {
    this.setState({ user: user });
  };

  render() {
    return (
      <div className="app">
        <div className="content">
          <Grid container justify="center">
            <Grid item xs={12}>
              <AppBar
                position="static"
                color="primary"
                className="generic-container-color"
              >
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    {LinksToHeadings[this.props.location.pathname]}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
          </Grid>
          {this.props.children}
          {this.props.location.pathname.includes("driver") ? (
            <NavBar isDriver={true} />
          ) : this.props.location.pathname.includes("passenger") ? (
            <NavBar isDriver={false} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Layout;
