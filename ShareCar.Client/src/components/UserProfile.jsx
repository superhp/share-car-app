// @flow
import React, { Component } from "react";
import UserService from "../services/userService";
import { Route, Link } from "react-router-dom";
import AuthenticationService from "../services/authenticationService";
import history from "../helpers/history";
import "../styles/userProfile.css";
import api from "../helpers/axiosHelper";
import { withAlert } from "react-alert";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "typeface-roboto";

type UserProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
class UserProfile extends Component<
  {},
  UserProfileState,
  LayoutProps,
  MyProfileState
> {
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
      firstName: this.state.user.user.firstName,
      lastName: this.state.user.user.lastName,
      profilePicture: this.state.user.user.pictureUrl,
      email: this.state.user.user.email,
      licensePlate: this.state.user.user.licensePlate,
      phone: this.state.user.user.phone
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
            <img className="thumbnail" src={this.state.user.user.pictureUrl} />

            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                disabled
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.user.user.email}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">
                First Name
              </label>
              <input
                onChange={e => {
                  var changedState = { ...this.state.user };
                  changedState.user.firstName = e.target.value;
                  this.setState({ user: changedState });
                }}
                type="text"
                name="firstname"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.user.firstName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.user.lastName}
                onChange={e => {
                  var changedState = { ...this.state.user };
                  changedState.user.lastName = e.target.value;
                  this.setState({ user: changedState });
                }}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.user.phone}
                onChange={e => {
                  var changedState = { ...this.state.user };
                  changedState.user.phone = e.target.value;
                  this.setState({ user: changedState });
                }}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-header">
                License Plate Number
              </label>
              <input
                type="text"
                name="licenseplate"
                className="form-control form-header"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                defaultValue={this.state.user.user.licensePlate}
                onChange={e => {
                  var changedState = { ...this.state.user };
                  changedState.user.licensePlate = e.target.value;
                  this.setState({ user: changedState });
                }}
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
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={12}>
                      <Typography variant="title">
                        Your points this month
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        justify="center"
                        content="h2"
                        color="textPrimary"
                      >
                        {this.state.user.pointCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Link to="/winnerBoard">
                    <Button variant="contained" color="primary">
                      Winner Board
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );

    return <div>{content}</div>;
  }
}

export default withAlert(UserProfile);
