// @flow
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import history from "../helpers/history";
import AuthenticationService from "../services/authenticationService";
import "../styles/login.css";
import logo from '../images/shareCarLogo.png';

class Login extends Component<{}> {

  constructor(props){
    super(props)
    this.facebookLogin = React.createRef()
    this.googleLogin = React.createRef()
  }

  authService: AuthenticationService = new AuthenticationService();
  
  email: string = "";

  responseFacebook = (response: any) => {
    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated,
      this.userNotAuthenticated
    );
  };
  responseGoogle = (response: any) => {

var profileObj = {email: response.profileObj.email, givenName : response.profileObj.givenName, familyName: response.profileObj.familyName, imageUrl : response.profileObj.imageUrl}

    this.authService.loginWithGoogle(
      profileObj,
      this.userAuthenticated
    );
  }
  userAuthenticated = () => {
    history.push("/");
  };
  userNotAuthenticated = () => {
    history.push("/");
  };

changeGoogleLoginSize =() => {
  //(this.facebookLogin.current.offsetWidth)

}
componentDidMount() {
}
  render() {
    return (
      <div className="login-container">
      <img className="login-image" src={logo} />
        <h1>ShareCar Login</h1>
        <FacebookLogin
          ref={this.facebookLogin}
          appId="599580833757975"
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
          <GoogleLogin

    clientId="875441727934-b39rfvblph43cr5u9blmp4cafbnqcr9k.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={this.responseGoogle}
 //   onFailure={ Generic error message }
  />
      </div>
    );
  }
}

export default Login;
