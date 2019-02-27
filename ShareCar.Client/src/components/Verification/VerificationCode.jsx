// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";
import history from "../../helpers/history";

class VerificationCode extends Component {


submitCode() {
  let code = document.getElementById("verification-code").value;
  console.log(code);
api.post("authentication/VerificationCode", 
{VerificationCode : code, 
  FacebookEmail: this.props.facebookEmail,
   GoogleEmail: this.props.googleEmail
  }).then((response) => {
    console.log(response.status)
if(response.status === 200){
  console.log("IIIIIII");
  history.push("/");
}
  }).catch((error) => {
    console.log(error);
    // error message
  })
}

  render() {
    return (
      <div>
             <h1>Submit your verification code</h1>
     <input id="verification-code" placeholder="Your verification code..."></input>
     <button onClick={this.submitCode.bind(this)}> Submit code</button>
     </div>
    );
  }
}

export default VerificationCode;
