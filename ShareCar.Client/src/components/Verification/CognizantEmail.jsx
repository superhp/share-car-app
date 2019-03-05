// @flow
import React, { Component } from "react";
import api from "../../helpers/axiosHelper";
import "../../styles/login.css";

class CognizantEmail extends Component {

  submitEmail() {
    const email = document.getElementById("email").value;

    const objectToSend = {
      FacebookEmail: this.props.facebookEmail,
      GoogleEmail: this.props.googleEmail,
      CognizantEmail: email,
    };

    api.post("authentication/CognizantEmailSubmit", objectToSend)
      .then((response) => {
        if (response.status === 200) {
          this.props.emailSubmited();
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          // unauthorized message
        } else {
          // error message
        }
      })
  }

  render() {
    return (
      <div className="email-submit">
        <h1>Submit your cognizant email to receive verification code</h1>
        <div className="email-input">
          <input id="email" placeholder="Your email..."></input>
          <button onClick={this.submitEmail.bind(this)} > Get code</button>
        </div>
      </div>
    );
  }
}

export default CognizantEmail;
