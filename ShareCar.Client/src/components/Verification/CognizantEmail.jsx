// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";

class CognizantEmail extends Component {

  submitEmail() {
    let email = document.querySelector("#email");
    console.log(email);
  api.post("Cognizant/Cognizant", 
  { LoginEmail : this.props.email, 
    CognizantEmail: email,
    }).then((response) => {
  if(response.status === 200){
    // success message
    this.props.submitCode;
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
     <h1>Submit your cognizant email</h1>
     <input id="email" placeholder="Your email..."></input>
     <button onClick={this.submitEmail} > Submit</button>
     </div>
    );
  }
}

export default CognizantEmail;
