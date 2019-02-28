// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";
import history from "../../helpers/history";
import "../../styles/login.css";

class VerificationCode extends Component {

submitCode() {
  let code = document.getElementById("verification-code").value;
api.post("authentication/VerificationCode", 
{VerificationCode : code, 
  FacebookEmail: this.props.facebookEmail,
   GoogleEmail: this.props.googleEmail
  }).then((response) => {
if(response.status === 200){
  history.push("/");
}
  }).catch((error) => {
    if(error.response.status === 401){
      // incorrect code message
    }else{
    console.log(error);
    // error message
    }
  })
}

  render() {
    return (
      <div className="code-submit">
             <h1>Submit your verification code</h1>
             <div className="code-input">
     <input id="verification-code" placeholder="Your verification code..."></input>
     <button onClick={this.submitCode.bind(this)}> Submit code</button>
     </div>
     </div>
    );
  }
}

export default VerificationCode;
