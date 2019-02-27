// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";

class CognizantEmail extends Component {

  submitEmail() {
    let email = document.getElementById("email").value;
    console.log(email);
    console.log(this.props.loginEmail);
    api.post("authentication/cognizant",
      {
        FacebookEmail: this.props.facebookEmail,
        GoogleEmail: this.props.googleEmail,
        CognizantEmail: email,
      }).then((response) => {
        console.log("SSSSS");
        console.log(response.status)
        if (response.status === 200) {
          // success message
          this.props.emailSubmited();
        }
      }).catch((error) => {
        console.log("eeeeeee");
        if (error.response.status === 401) {
          // unauthorized message
        }
        // error message
      })
  }
  componentDidMount() {
    console.log("GFFFFFFF");
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <h1>Submit your cognizant email to receive verification code</h1>
        <input id="email" placeholder="Your email..."></input>
        <button onClick={this.submitEmail.bind(this)} > Get code</button>
        <button onClick={this.props.emailSubmited} > I already have code</button>

      </div>
    );
  }
}

export default CognizantEmail;
