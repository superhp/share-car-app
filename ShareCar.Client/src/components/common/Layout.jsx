// @flow
import * as React from "react";
import "../../styles/layout.css";
import UserService from "../../services/userService";
import AuthenticationService from "../../services/authenticationService";
import history from "../../helpers/history";
import NavBar from "../NavBar";

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
          {this.props.children}
          <NavBar />
          
        </div>
      </div>
    );
  }
}

export default Layout;
