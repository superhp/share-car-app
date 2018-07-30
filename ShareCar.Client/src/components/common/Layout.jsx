// @flow
import * as React from 'react';
import '../../styles/layout.css';
import UserService from '../../services/userService';
import AuthenticationService from '../../services/authenticationService';
import history from '../../helpers/history';

type LayoutProps = {
    children?: React.Node
};

class Layout extends React.Component<LayoutProps, MyProfileState> {

state: MyProfileState = { loading: true, user: null };
userService = new UserService();
authService = new AuthenticationService();

componentDidMount() {
    this.userService.getLoggedInUser(this.updateLoggedInUser)
}

updateLoggedInUser = (user: User) => {
    this.setState({ user: user });
}

logout = () => {
    this.authService.logout(this.userLoggedOut);
}

userLoggedOut = () => {
    history.push('/login');
}


    render() {
        return (
            <div className="app">
                <div className="content">
                    { this.props.children } 
                    <button className="btn btn-light logout-button" onClick={()=>{this.logout()}}>Logout</button>
                </div>
            </div>
        );
    }
}

export default Layout;
