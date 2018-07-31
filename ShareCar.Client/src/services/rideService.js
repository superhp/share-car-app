// @flow
import api from "../helpers/axiosHelper";

class RideService {
    getUsersRides = (callback: RideData => void) => {
        api
            .get("/Ride")
            .then(response => {
                callback((response.data: RideData));
    })
      .catch(function(error) {
        console.error(error);
    });
}
}
export default RideService;