// @flow
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import CognizantEmail from "../components/Verification/CognizantEmail";
import VerificationCode from "../components/Verification/VerificationCode";
import history from "../helpers/history";
import AuthenticationService from "../services/authenticationService";
import "../styles/login.css";
import logo from '../images/shareCarLogo.png';

class Login extends Component<{}> {
  authService: AuthenticationService = new AuthenticationService();

  state: any = {unauthorized : false, verificationCodeSent : false, facebookEmail: null, googleEmail: null}

  responseFacebook = (response: any) => {

    this.setState({facebookEmail: response.email, googleEmail: null});

    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated,
      this.userUnauthorized
    );
  };
  responseGoogle = (response: any) => {
var profileObj = {email: response.profileObj.email, givenName : response.profileObj.givenName, familyName: response.profileObj.familyName, imageUrl : response.profileObj.imageUrl}
this.setState({googleEmail: response.profileObj.email, facebookEmail : null});

    this.authService.loginWithGoogle(
      profileObj,
      this.userAuthenticated,
      this.userUnauthorized    );
  };

  loginCallback = (response: any) => {
    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated
    );
  };
  displayVerificationCodeComponent = () => {
    this.setState({submitCode: true});
    };

  userAuthenticated = () => {
    history.push("/");
  };

  userUnauthorized = () => {
    this.setState({submitEmail : true, submitCode: false});
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
    this.state.submitEmail ?(
this.state.submitCode 
?<VerificationCode facebookEmail = {this.state.facebookEmail} googleEmail = {this.state.googleEmail}/>
:<CognizantEmail facebookEmail = {this.state.facebookEmail} googleEmail ={this.state.googleEmail} emailSubmited = {this.displayVerificationCodeComponent}/>  
    )
:
<div></div>
  }
      </div>
    );
  }
}

export default Login;
