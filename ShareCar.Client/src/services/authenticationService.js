// @flow
import api from '../helpers/axiosHelper';

class AuthenticationService {

    loginWithFacebook = (accessToken: AccessToken, callback: () => void) => {
        api.post('authentication/facebook', {
            accessToken: accessToken
        })
        .then((response) => {
            if (response.status === 200)
                callback();
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    logout = (callback: () => void) => {
        api.post('authentication/logout')
        .then((response) => {
            if (response.status === 200)
                callback();
        })
        .catch(function (error) {
            console.error(error);
        });
    }
}

export default AuthenticationService;