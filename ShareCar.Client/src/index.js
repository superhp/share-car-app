import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./helpers/history";
import Layout from "./components/common/Layout";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import RoleSelection from "./components/RoleSelection";
import Driver from "./components/Driver";
import Passenger from "./components/Passenger";
import UserProfile from "./components/UserProfile";
import MapComponent from "./components/MapComponent";
import Rides from "./components/Rides";
import NewRideForm from "./components/NewRideForm";
import RideRequestForm from "./components/RideRequestForm";
import WinnerBoard from "./components/WinnerBoard";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import test from "./components/TestMap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const options = {
  position: "bottom center",
  timeout: 3000,
  offset: "30px",
  transition: "fade",
  type: "success"
};

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />

      <Layout>
        <AlertProvider template={AlertTemplate} {...options}>
          <Route exact path="/" component={RoleSelection} />
          <Route path="/driver" component={Driver} />
          <Route path="/passenger" component={Passenger} />
          <Route path="/map" component={MapComponent} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/rides" component={Rides} />
          <Route path="/test" component={test} />
          <Route path="/winnerBoard" component={WinnerBoard} />
          <Route path="/newRideForm" component={NewRideForm} />
          <Route path="/rideRequest" component={RideRequestForm} />
        </AlertProvider>
      </Layout>
    </Switch>
  </Router>,
  document.getElementById("root")
);
