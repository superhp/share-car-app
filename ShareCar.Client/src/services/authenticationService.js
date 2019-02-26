// @flow
import api from '../helpers/axiosHelper';

class AuthenticationService {

    loginWithFacebook = (accessToken: AccessToken, success: () => void, unauthorized: () => void) => {
        api.post('authentication/facebook', {
            accessToken: accessToken
        })
        .then((response) => {
            if (response.status === 200)
            success();
        })
        .catch((error) => {
            if(error.response.status === 401){
                unauthorized();
            } else{
                console.error(error);
            }
        });
    }

    loginWithGoogle = (profileObj: ProfileObj, success: () => void, unauthorized: () => void) => {
        api.post('authentication/google', profileObj)
        .then((response) => {
            if (response.status === 200)
            success();
        })
        .catch((error) => {
        if(error.response.status === 401){
            unauthorized();
        } else{
            console.error(error);
        }
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