// @flow
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import CognizantEmail from "../Verification/CognizantEmail";
import VerificationCode from "../Verification/VerificationCode";
import history from "../../helpers/history";
import AuthenticationService from "../../services/authenticationService";
import "../../styles/login.css";
import logo from '../../images/shareCarLogo.png';
import SnackBars from "../common/Snackbars";
import { SnackbarVariants } from "../common/SnackbarVariants";
import depcheck from 'depcheck';

class Login extends Component<{}> {
  authService: AuthenticationService = new AuthenticationService();
componentDidMount(){
 
const options = {
  withoutDev: false, // [DEPRECATED] check against devDependencies
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignoreDirs: [ // folder with these names will be ignored
    'sandbox',
    'dist',
    'bower_components'
  ],
  ignoreMatches: [ // ignore dependencies that matches these globs
    'grunt-*'
  ],
  parsers: { // the target parsers
    '*.js': depcheck.parser.es6,
    '*.jsx': depcheck.parser.jsx
  },
  detectors: [ // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration
  ],
  specials: [ // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack
  ],
};
 
depcheck('C:\Users\PC\Documents\share-car-app\ShareCar.Client', options, (unused) => {
  console.log(unused.dependencies); // an array containing the unused dependencies
  console.log(unused.devDependencies); // an array containing the unused devDependencies
  console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
  console.log(unused.using); // a lookup indicating each dependency is used by which files
  console.log(unused.invalidFiles); // files that cannot access or parse
  console.log(unused.invalidDirs); // directories that cannot access
});
}
  state: any = {
    unauthorized: false,
    verificationCodeSent: false,
    facebookEmail: null,
    googleEmail: null,
    snackBarClicked: false,
    snackBarMessage: null,
    snackBarVariant: null
  }

  responseFacebook = (response: any) => {

    this.setState({
      facebookEmail: response.email,
      googleEmail: null,

    });

    this.authService.loginWithFacebook(
      response.accessToken,
      this.userAuthenticated,
      this.userUnauthorized
    );
  };
  responseGoogle = (response: any) => {
    var profileObj = {
      email: response.profileObj.email,
      givenName: response.profileObj.givenName,
      familyName: response.profileObj.familyName,
      imageUrl: response.profileObj.imageUrl
    }
    this.setState({ googleEmail: response.profileObj.email, facebookEmail: null });

    this.authService.loginWithGoogle(
      profileObj,
      this.userAuthenticated,
      this.userUnauthorized);
  };

  displayVerificationCodeComponent = () => {
    this.setState({ submitCode: true });
  };

  userAuthenticated = () => {
    history.push("/");
  };

  userUnauthorized = () => {
    this.setState({ submitEmail: true, submitCode: false });
  };

  showSnackBar(message, variant) {
    this.setState({
      snackBarClicked: true,
      snackBarMessage: message,
      snackBarVariant: SnackbarVariants[variant]
    });
    setTimeout(
      function () {
        this.setState({ snackBarClicked: false });
      }.bind(this),
      3000
    );
  }

  render() {
    return (
      <div className="login-container">
        <img className="login-image" src={logo} alt="" />
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
          this.state.submitEmail ? (
            this.state.submitCode
              ? <VerificationCode
                facebookEmail={this.state.facebookEmail} googleEmail={this.state.googleEmail}
                showSnackBar={(message, variant) => { this.showSnackBar(message, variant) }}
              />

              : <CognizantEmail
                facebookEmail={this.state.facebookEmail}
                googleEmail={this.state.googleEmail}
                emailSubmited={this.displayVerificationCodeComponent}
                showSnackBar={(message, variant) => { this.showSnackBar(message, variant) }}
              />
          )
            :
            <div></div>
        }
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
          variant={this.state.snackBarVariant}
        />
      </div>
    );
  }
}

export default Login;