import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./helpers/history";
import Layout from "./components/common/Layout";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import RoleSelection from "./components/RoleSelection";
//import Driver from "./Driver/components/Driver";
import Passenger from "./components/Passenger/Passenger";
import UserProfile from "./components/UserProfile";
import Rides from "./components/Rides";
import WinnerBoard from "./components/WinnerBoard";
import Map from "./components/Maps/Map";
import SnackBars from "./components/common/Snackbars";
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
        <Route exact path="/" component={RoleSelection} />
        <Route path="/passenger/Requests" component={Passenger} />
        <Route path="/snack" component={SnackBars} />

        <Route
          path="/:role(driver|passenger)/profile"
          component={UserProfile}
        />
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
