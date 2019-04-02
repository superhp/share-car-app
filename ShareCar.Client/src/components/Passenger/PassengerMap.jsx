import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Grid from "@material-ui/core/Grid";

import { centerMap } from "./../../utils/mapUtils";
import { DriverRoutesSugestions } from "./Route/DriverRoutesSugestions";
import { PassengerRouteSelection } from "./Route/PassengerRouteSelection";
import { PassengerNavigationButton } from "./PassengerNavigationButton";
import api from "./../../helpers/axiosHelper";
import {
  fromLonLatToMapCoords, fromMapCoordsToLonLat,
  getNearest, coordinatesToLocation, createPointFeature,
  createRouteFeature
} from "../../utils/mapUtils";
import { fromLocationIqResponse, addressToString } from "../../utils/addressUtils";
import { OfficeAddresses } from "../../utils/AddressData";
import "./../../styles/genericStyles.css";
import "../../styles/testmap.css";
import SnackBars from "../common/Snackbars";
import { SnackbarVariants } from "../common/SnackbarVariants";
import DriverRoutesSugestionsModal from "./Route/DriverRoutesSugestionsModal";

const polylineDecoder = require('@mapbox/polyline');


export class PassengerMap extends React.Component {
  state = {
    passengerAddress: null,
    direction: "from",
    routes: [],
    pickUpPointFeature: null,
    currentRoute: { routeFeature: null, fromFeature: null, toFeature: null },
    currentRouteIndex: 0,
    showDriver: false,
    snackBarMessage: "",
    snackBarClick: false,
    snackBarVariant: null,
  }

  componentDidMount() {
    const { map, vectorSource } = this.initializeMap();
    this.map = map;
    this.vectorSource = vectorSource;
    this.getAllRoutes(OfficeAddresses[0], this.state.direction);
  }

  componentWillReceiveProps(nextProps) {
    this.vectorSource.clear();
    this.setState({
      passengerAddress: null,
      direction: "from",
      routes: [],
      pickUpPointFeature: null,
      currentRoute: { routeFeature: null, fromFeature: null, toFeature: null },
      currentRouteIndex: 0,
      showDriver: false,
      snackBarMessage: "",
      snackBarClick: false,
      snackBarVariant: null,
    });
    this.getAllRoutes(OfficeAddresses[0], this.state.direction);
  }

  initializeMap() {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({ source: vectorSource });
    const map = new Map({
      target: "map",
      controls: [],
      layers: [
        new Tile({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLatToMapCoords(25.279652, 54.687157),
        zoom: 13
      })
    });
    map.on("click", e => {
      const [longitude, latitude] = fromMapCoordsToLonLat(e.coordinate);
      this.handleMapClick(longitude, latitude);
    });
    return { map, vectorSource };
  }

  removeRoute(routeFeature, fromFeature, toFeature) {
    if (routeFeature)
      this.vectorSource.removeFeature(routeFeature);
    if (fromFeature)
      this.vectorSource.removeFeature(fromFeature);
    if (toFeature)
      this.vectorSource.removeFeature(toFeature);
  }

  displayRoute() {
    this.setState({ showDriver: true });
    const { routeFeature, fromFeature, toFeature } = this.state.currentRoute;
    this.removeRoute(routeFeature, fromFeature, toFeature);
    const { passengerAddress } = this.state;

    if (this.state.routes.length > 0) {
      const route = this.state.routes[this.state.currentRouteIndex];
   

      const routeFeature = createRouteFeature(route.geometry);
      const fromFeature = createPointFeature(route.addressFrom.longitude, route.addressFrom.latitude);
      const toFeature = createPointFeature(route.addressTo.longitude, route.addressTo.latitude);

      this.setState({ currentRoute: { ...this.state.currentRoute, routeFeature: routeFeature, fromFeature: fromFeature, toFeature: toFeature } });
      this.vectorSource.addFeature(routeFeature);
      this.vectorSource.addFeature(fromFeature);
      this.vectorSource.addFeature(toFeature);
    }
  }

  changePickUpPoint() {
    if (this.state.pickUpPointFeature) {
      this.vectorSource.removeFeature(this.state.pickUpPointFeature);
    }
    const { passengerAddress } = this.state;
    if (passengerAddress) {
      const { longitude, latitude } = passengerAddress;
      var feature = createPointFeature(longitude, latitude);
      this.setState({ pickUpPointFeature: feature })
      this.vectorSource.addFeature(feature);
    }
  }

  handleMapClick(longitude, latitude) {
    getNearest(longitude, latitude)
      .then(([long, lat]) => coordinatesToLocation(lat, long))
      .then(response => {
        const address = fromLocationIqResponse(response);
        address.longitude = longitude;
        address.latitude = latitude;
   
        var pts = this.decodeRoutes([this.state.routes[0].geometry]);
        var d = this.calculateDisntances(pts, address);
        
   
        this.setState({ passengerAddress: address }, this.changePickUpPoint);
      }).catch();
  }

  sortRoutes() {

  }

  decodeRoutes(routes) {

    var points = [];
    for (var i = 0; i < routes.length; i++) {
      points.push(polylineDecoder.decode(routes[i]));
    }
    return points;
  }

  calculateDisntances(routePoints, pickUpPoint) {

    const { longitude, latitude } = pickUpPoint;

    var shortestDistances = [];

console.log(routePoints);
console.log(longitude);
console.log(latitude);

var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;


    for (var i = 0; i < routePoints.length; i++) {
      var shortestDistance = 999999;
      for (var j = 0; j < routePoints[i].length-1; j++) {
        var x1 =routePoints[i][j][1];
        var y1 =routePoints[i][j][0];
        var x2 =routePoints[i][j+1][1];
        var y2 =routePoints[i][j+1][0];

//var distance = Math.abs(((y2 - y1)*longitude - (x2 - x1)*latitude + x2*y1 - y2*x1)/Math.sqrt(Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2)));
var distance = this.distToSegment({x : longitude, y: latitude}, {x : x1, y: y1}, {x : x2, y: y2})
console.log(distance)
if(distance < shortestDistance){
  shortestDistance = distance;
  t1 = x1;
  t2 = y1;
  t3 = x2;
  t4 = y2; 
}

}

shortestDistances.push(shortestDistance);
    }
    console.log(shortestDistances);
    console.log(t1);
    console.log(t2);
    console.log(t3);
    console.log(t4);
  var k = createPointFeature(t1,t2);
  var l = createPointFeature(t3,t4);

  this.vectorSource.addFeature(k);
  this.vectorSource.addFeature(l);

}

 distanceBetweenPoints(point1, point2) { return Math.pow(point1.x - point2.x,2) + Math.pow(point1.y - point2.y,2) }
 distToSegmentSquared(pivot, point1, point2) {
  var l2 = this.distanceBetweenPoints(point1, point2);
  if (l2 == 0) return this.distanceBetweenPoints(pivot, point1);
  var t = ((pivot.x - point1.x) * (point2.x - point1.x) + (pivot.y - point1.y) * (point2.y - point1.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return this.distanceBetweenPoints(pivot, { x: point1.x + t * (point2.x - point1.x),
                    y: point1.y + t * (point2.y - point1.y) });
}
 distToSegment(pivot, point1, point2) { return Math.sqrt(this.distToSegmentSquared(pivot, point1, point2)); }

  onMeetupAddressChange(newAddress) {
    if (newAddress) {
      var address = addressToString(newAddress);
      if (address) {
        this.setState({ passengerAddress: newAddress }, this.changePickUpPoint);
        if (newAddress) {
          centerMap(newAddress.longitude, newAddress.latitude, this.map);
        }
      }
    }
  }

  getAllRoutes(address, direction) {
    if (address) {
      let routeDto;
      this.setState({ direction: direction });
      if (direction === "to")
        routeDto = { AddressTo: address };
      else
        routeDto = { AddressFrom: address };
      api.post("https://localhost:44347/api/Ride/routes", routeDto).then(res => {
        if (res.status === 200 && res.data !== "") {
          const { routeFeature, fromFeature, toFeature } = this.state.currentRoute;
          this.removeRoute(routeFeature, fromFeature, toFeature);
          this.setState({ routes: res.data, currentRoute: { ...this.state.currentRoute, routeFeature: null, fromFeature: null, toFeature: null } }, this.displayRoute);
        }
      }).catch((error) => {
        this.showSnackBar("Failed to load routes", 2)
      });
    }
  }

  handleRegister(ride) {
    if (!this.state.passengerAddress) {

      this.showSnackBar("Choose your pick up point", 2)

    }
    else {
      const request = {
        RideId: ride.rideId,
        DriverEmail: ride.driverEmail,
        Longitude: this.state.passengerAddress.longitude,
        Latitude: this.state.passengerAddress.latitude
      };

      api.post(`https://localhost:44347/api/RideRequest`, request).then(response => {

        this.showSnackBar("Ride requested!", 0)

      })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.showSnackBar(error.response.data, 2)
          } else {
            this.showSnackBar("Failed to request ride", 2)
          }
        });
    }
  }

  showSnackBar(message, variant) {
    this.setState({
      snackBarClicked: true,
      snackBarMessage: message,
      snackBarVariant: SnackbarVariants[variant]
    });
    setTimeout(
      function () {
        this.setState({ snackBarClicked: false });
      }.bind(this),
      3000
    );
  }

  render() {
    return (
      <div>
        <div id="map"></div>
        <div className="passengerForm">
          <PassengerRouteSelection
            direction={this.state.direction}
            initialAddress={OfficeAddresses[0]}
            displayName={addressToString(this.state.passengerAddress)}
            onChange={(address, direction) => this.getAllRoutes(address, direction)}
            onMeetupAddressChange={address => this.onMeetupAddressChange(address)}
          />
          {this.state.showDriver && this.state.routes.length > 0 ? (
            <DriverRoutesSugestionsModal
              rides={this.state.routes[this.state.currentRouteIndex].rides}
              onRegister={ride => this.handleRegister(ride)}
            />
          ) : (
              <div></div>
            )}
        </div>
        {this.state.routes.length > 1
          ? <Grid>
            <PassengerNavigationButton
              onClick={() => this.setState({
                currentRouteIndex: (this.state.currentRouteIndex - 1 + this.state.routes.length) % this.state.routes.length
              },
                this.displayRoute
              )}
              text="View Previous Route"
            />
            <PassengerNavigationButton
              onClick={() => this.setState({
                currentRouteIndex: (this.state.currentRouteIndex + 1) % this.state.routes.length
              },
                this.displayRoute
              )}
              text="View Next Route"
            />

          </Grid>
          : <div />
        }
        <SnackBars
          message={this.state.snackBarMessage}
          snackBarClicked={this.state.snackBarClicked}
          variant={this.state.snackBarVariant}
        />
      </div>
    );
  }
}
export default PassengerMap;