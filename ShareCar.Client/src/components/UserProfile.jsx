// @flow
import React, { Component } from "react";
import UserService from "../services/userService";
import history from "../helpers/history";
import "../styles/userProfile.css";

type UserProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
class UserProfile extends Component<{}, UserProfileState> {
  userService = new UserService();
  state: UserProfileState = { loading: true, user: null };

  componentDidMount() {
    this.userService.getUserProfile(this.updateUserProfile);
  }

  updateUserProfile = (user: UserProfileData) => {
    this.setState({ loading: false, user: user });
  };

  render() {
    const content = this.state.loading ? (
      <p>
        <em>Loading.......</em>
      </p>
    ) : this.state.user === null ? (
      <p>The user failed to load</p>
    ) : (
      <div className="container profileContainer">
        <form className="profileForm col-sm-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Your Email</label>
            <input
              type="email"
              class="form-control editInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.user.email}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              type="email"
              class="form-control editInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.user.firstName}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input
              type="email"
              class="form-control editInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.user.lastName}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Phone Number</label>
            <input
              type="email"
              class="form-control editInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.user.phone}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">License Plate Number</label>
            <input
              type="email"
              class="form-control editInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.user.licensePlate}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );

    return (
      <div>
        <h1>User Profile</h1>
        {content}
      </div>
    );
  }
}

export default UserProfile;
