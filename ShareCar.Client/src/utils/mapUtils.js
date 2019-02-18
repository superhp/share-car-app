const URL_OSRM_NEAREST = "//cts-maps.northeurope.cloudapp.azure.com/nearest/v1/driving/";
const BEARINGS = "?number=3&bearings=0,20";
const LOCATION_IQ = "//eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat=";

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

export const coordinatesToLocation = (latitude, longtitude) => {
    return new Promise(function(resolve, reject) {
      fetch(
        LOCATION_IQ +
          latitude +
          "&lon=" +
          longtitude +
          "&format=json"
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          resolve(json);
        });
    });
  }