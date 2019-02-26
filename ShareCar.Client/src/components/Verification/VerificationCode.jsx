// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";

class VerificationCode extends Component {


submitCode() {
  let code = document.querySelector("#verification-code");
  console.log(code);
api.post("Cognizant/VerificationCode", 
{VerificationCode : code, 
  FacebookEmail: this.props.FacebookEmail,
   GoogleEmail: this.props.GoogleEmail
  }).then((response) => {
if(response.status === 200){
  // success message
}else if(response.status === 401){
  // unauthorized message
}
  }).catch(() => {
    // error message
  })
}

  render() {
    return (
      <div>
             <h1>Submit your verification code</h1>
     <input id="verification-code" placeholder="Your verification code..."></input>
     <button onC> Submit</button>
     </div>
    );
  }
}

export default VerificationCode;
