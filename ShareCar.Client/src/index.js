import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./helpers/history";
import Layout from "./components/common/Layout";
import Login from "./components/common/Login";
import RoleSelection from "./components/User/RoleSelection";
import Passenger from "./components/Passenger/Passenger";
import UserProfile from "./components/User/UserProfile";
import Rides from "./components/Driver/Ride/Rides";
import Manual from "./components/Manual";
import WinnerBoard from "./components/Winner/WinnerBoard";
import Map from "./components/Maps/Map";
import SnackBars from "./components/common/Snackbars";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        <Route exact path="/" component={RoleSelection} />
        <Route path="/passenger/Requests" component={Passenger} />
        <Route path="/snack" component={SnackBars} />

        <Route
          path="/:role(driver|passenger)/profile"
          component={UserProfile}
        />

        <Route path="/:role(driver|passenger)/Manual" component={Manual} />

        <Route path="/:role(driver|passenger)/Map" component={Map} />
        <Route path="/:role(driver|passenger)/rides" component={Rides} />
        <Route
          path="/:role(driver|passenger)/winnerBoard"
          component={WinnerBoard}
        />
      </Layout>
    </Switch>
  </Router>,
  document.getElementById("root")
);
