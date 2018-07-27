// @flow
import React, { Component }  from 'react';
import { Route, Link } from 'react-router-dom';
import { Router, Switch} from 'react-router';
import UserService from '../services/userService';
import AuthenticationService from '../services/authenticationService';
import history from '../helpers/history';
import driverLogo from '../images/driver.png';
import passengerLogo from '../images/passenger.png';
import '../styles/roleSelection.css';
import Driver from './Driver';

class RoleSelection extends Component<{}, MyProfileState> {
    userService = new UserService();
    authService = new AuthenticationService();
    state: MyProfileState = { loading: true, user: null };

    componentDidMount() {
        this.userService.getLoggedInUser(this.updateLoggedInUser)
    }

    updateLoggedInUser = (user: User) => {
        this.setState({ loading: false, user: user });
    }

    logout = () => {
        this.authService.logout(this.userLoggedOut);
    }

    userLoggedOut = () => {
        history.push('/login');
    }

    render() {
        const content = this.state.loading ?
        <p><em>Loading..</em></p> : this.state.user == null ?
        <p>Failed</p> :
        <div className="roleContainer">
               <Link to="/driver"> <img className="roleImage" src={driverLogo} /></Link>
               <Link to="/passenger"> <img className="roleImage" src={passengerLogo} /></Link>
        </div>
        return(
        <div>
            {content}
        </div>
        )
    }
}
export default RoleSelection