import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import CognizantEmail from '../Verification/CognizantEmail';
import VerificationCode from '../Verification/VerificationCode';
import history from "../helpers/history";
import AuthenticationService from "../services/authenticationService";
import "../styles/login.css";
import logo from '../images/shareCarLogo.png';

class Login extends Component<{}> {
  authService: AuthenticationService = new AuthenticationService();

 state = {
   submitEmail: false,
   submitCode: false,
   loginEmail: null
 };

  responseFacebook = (response: any) => {
    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated.bind(this),
      this.unauthorizedUser.bind(this)
    );
  };

  responseGoogle = (response: any) => {
var profileObj = {email: response.profileObj.email, givenName : response.profileObj.givenName, familyName: response.profileObj.familyName, imageUrl : response.profileObj.imageUrl}

    this.authService.loginWithGoogle(
      profileObj,
      this.userAuthenticated,
      this.unauthorizedUser
    );
  }

 unauthorizedUser = () => {
   console.log("im hereeeeeee");
  this.setState({submitEmail : true});
 };

displayVerificationCodeComponent = () => {
this.setState({submitCode: true});
};

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
 //   onFailure={ Generic error message }
  />
  {
    this.state.submitEmail ?
this.state.submitCode ?
<VerificationCode/>
:<CognizantEmail emailSubmited = {this.displayVerificationCodeComponent}/>  
:
<div></div>
  }
      </div>
    );
  }
}

export default Login;
