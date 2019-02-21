// @flow
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import history from "../helpers/history";
import AuthenticationService from "../services/authenticationService";
import "../styles/login.css";
import logo from '../images/shareCarLogo.png';

class Login extends Component<{}> {
  authService: AuthenticationService = new AuthenticationService();

  responseFacebook = (response: any) => {
    console.log(response);

    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated
    );
  };
  responseGoogle = (response: any) => {
    console.log(response);
    this.authService.loginWithGoogle(
      response.accessToken,
      this.userAuthenticated
    );
  }
  userAuthenticated = () => {
    history.push("/");
  };

  render() {
    return (
      <div className="login-container">
      <img className="login-image" src={logo} />
        <h1>ShareCar Login</h1>
        <FacebookLogin
          appId="599580833757975"
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
          <GoogleLogin
    clientId="875441727934-b39rfvblph43cr5u9blmp4cafbnqcr9k.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  />
      </div>
    );
  }
}

export default Login;
