// @flow
import React, { Component } from "react";
import UserService from "../services/userService";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import "../styles/userProfile.css";
import api from "../helpers/axiosHelper";
import { withAlert } from "react-alert";

type UserProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
class UserProfile extends Component<{}, UserProfileState, LayoutProps, MyProfileState> {
  state: MyProfileState = { loading: true, user: null };
  userService = new UserService();
  authService = new AuthenticationService();

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateUserProfile);
  }

  updateUserProfile = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
  };
  logout = () => {
    this.authService.logout(this.userLoggedOut);
  };

  userLoggedOut = () => {
    history.push("/login");
  };

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      firstName: e.target.parentNode.firstname.value,
      lastName: e.target.parentNode.lastname.value,
      profilePicture: this.state.user.pictureUrl,
      email: e.target.parentNode.email.value,
      licensePlate: e.target.parentNode.licenseplate.value,
      phone: e.target.parentNode.phone.value
    };
    api.post(`https://localhost:44360/api/user`, data).then(res => {
      if (res.status == 200) this.props.alert.show("Profile updated");
    });
  }

  render() {
    
    const content = this.state.loading ? (
      <p>
        <em>Loading.......</em>
      </p>
    ) : this.state.user === null ? (
      <p>The user failed to load</p>
    ) : (
      
      <div className="container-fluid">
        <div className="container profile-container">
        <button
            className="logout-button logout-text"
            onClick={() => {
              this.logout();
            }}
          > 
          Logout
          </button>
          <form className="profile-form col-sm-6">
            <img className="thumbnail" src={this.state.user.pictureUrl} />

            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">Your Email</label>
              <input
                type="email"
                name="email"
                disabled
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.user.email}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.firstName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.lastName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.phone}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">License Plate Number</label>
              <input
                type="text"
                name="licenseplate"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.licensePlate}
              />
            </div>
            <button
              onClick={e => {
                this.handleSubmit(e);
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );

    return <div>{content}</div>;
  }
}

export default withAlert(UserProfile);
