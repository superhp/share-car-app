// @flow
import api from '../helpers/axiosHelper';

class UserService {

    getLoggedInUser = (callback: User => void) => {
        api.get('user')
        .then((response) => {
            callback((response.data: User));
        })
        .catch(function (error) {
            console.error(error);
        });
    }
}

export default UserService;