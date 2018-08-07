// @flow
import React, { Component } from "react";
import UserService from "../services/userService";
import history from "../helpers/history";
import "../styles/userProfile.css";
import api from "../helpers/axiosHelper";
import { withAlert } from "react-alert";

type UserProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
class UserProfile extends Component<{}, UserProfileState> {
  userService = new UserService();
  state: UserProfileState = { loading: true, user: null };

  componentDidMount() {
    this.userService.getLoggedInUser(this.updateUserProfile);
  }

  updateUserProfile = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
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
          <form className="profile-form col-sm-6">
            <img className="thumbnail" src={this.state.user.pictureUrl} />

            <div className="form-group">
              <label for="exampleInputEmail1">Your Email</label>
              <input
                type="email"
                name="email"
                disabled
                className="form-control edit-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.user.email}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control edit-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.firstName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control edit-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.lastName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control edit-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.phone}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">License Plate Number</label>
              <input
                type="text"
                name="licenseplate"
                className="form-control edit-input"
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
