const URL_OSRM_NEAREST = "//cts-maps.northeurope.cloudapp.azure.com/nearest/v1/driving/";
const BEARINGS = "?number=3&bearings=0,20";

export const getNearest = (coordinates) => {
    return new Promise((resolve, reject) => {
        //make sure the coord is on street
        fetch(URL_OSRM_NEAREST + coordinates.join() + BEARINGS)
        .then(response => {
            return response.json();
        })
        .then(function(json) {
            if (json.code === "Ok") {
            resolve(json.waypoints[0].location);
            } else reject();
        });
    });
}