import * as React from "react";
import { RideRequestForm } from "./RideRequestForm";
import axios from "axios";
import api from "../helpers/axiosHelper";
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import Icon from "ol/style/Icon";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Polyline from "ol/format/Polyline";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import geom from "ol/geom";
import { fromLonLat } from "ol/proj";
import { OfficeAddresses } from "./AddressData";
import RidesOfDriver from "./RidesOfDriver";

export class test extends React.Component {

  state = {
    points: 0,
    coordinates: {
      firstPoint: [],
      lastPoint: []
    },
    selectedRouteStyle: {
      route: new Style({
        stroke: new Stroke({
          width: 6, color: [0, 200, 0, 0.8]
        })
      })
    },
    passengersSelectedOffice: "",
    passengerPickUpPointFeature: null,
    selectedRoute: "",
    filteredRoute: {
      toOffice: false,
      office: OfficeAddresses[0],
      dateTimeFrom: "",
      dateTimeTo: ""
    },// route object containing filttering information acocrding to which passenger will get route suggestions
    driversOfRoute: [],
    driversInfo: {
      firstName: "",
      lastName: "",
      rides: []
    },
    passengerStylesCouter: 0,
    pickUpPoint: [],
    route: "",
    utils: "",
    map: "",
    accessToken: "ad45b0b60450a4", // required for reverse geocoding api
    vectorSource: "",
    startPointInput: false,// If marker on a map was added by writing an address, it should be known if it was From or To input field
    features: { // markers on a map
      startPointFeature: "",
      destinationFeature: ""
    },
    routeFeature: "",
    route: {
      fromAddress: "",
      toAddress: "",
      routeGeometry: ""
    },
    showDrivers: false,
    showRides: false,
    ridesOfRoute: [],
    passengerRoutes: [],
    passengerRouteFeatures: [],
    passengerRouteFeaturesCounter: 0,
    routeStyles: {
      route: new Style({
        stroke: new Stroke({
          width: 6, color: [40, 40, 40, 0.8]
        })
      }),
      icon: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png'
        })
      })
    },
    driverEmail: "",
    url_osrm_nearest: '//cts-maps.northeurope.cloudapp.azure.com/maps/nearest/v1/driving/',
    url_osrm_route: '//cts-maps.northeurope.cloudapp.azure.com/maps/route/v1/driving/',
    driver: false // will be passed by props
  }



  selectRoute() {
    console.log(this.state.passengerRouteFeatures);
if(this.state.passengerRouteFeatures.length != 0){
    this.state.showDrivers = true;
    this.state.showRoutes = false;
    this.state.showRides = false;
    var counter = this.state.passengerRouteFeaturesCounter;
    if (counter == 0) {
      this.state.passengerRouteFeatures[this.state.passengerRouteFeatures.length - 1].feature.setStyle(this.state.routeStyles.route);
    }
    else {
      this.state.passengerRouteFeatures[counter - 1].feature.setStyle(this.state.routeStyles.route);
    }

    this.state.passengerRouteFeatures[counter].feature.setStyle(this.state.selectedRouteStyle.route);
    this.setState({ selectedRoute: this.state.passengerRouteFeatures[counter].geometry });
    counter++;

    if (counter >= this.state.passengerRouteFeatures.length) {
      counter = 0;
    }
    console.log(counter);
    this.setState({ passengerRouteFeaturesCounter: counter });

    this.getRidesByRoute(this.state.selectedRoute);
  }
  }

  getRidesByRoute(routeGeometry) {

    var route = {
      Geometry: routeGeometry
    };
    api.get(`/Ride/ridesByRoute=` + routeGeometry).then(response => {

      this.setState({ ridesOfRoute: response.data, driversOfRoute: [] });

      var drivers = [];



      this.state.ridesOfRoute.forEach((ride) => {
        if (!drivers.includes(ride.driverFirstName + ride.driverLastName)) {
          drivers.push(ride.driverFirstName + ride.driverLastName);

          this.state.driversOfRoute.push({ firstName: ride.driverFirstName, lastName: ride.driverLastName, email: ride.driverEmail });
        }
      });

      if (drivers.length != 0) {
        this.setState({ showDriver: true });
      }
      else {
        this.setState({ showDriver: false });

      }

      console.log(this.state.driversOfRoute);


    });

  }


  handleOfficeSelection(e) {
    var index = e.target.value;

    this.state.filteredRoute.office = OfficeAddresses[index];
    console.log(this.state.filteredRoute.office);

    this.showRoutes();
  }

  handleToOfficeSelection() {
    if (!this.state.filteredRoute.toOffice) {
      if (this.state.passengerPickUpPointFeature) {

        this.state.vectorSource.removeFeature(this.state.passengerPickUpPointFeature)
        this.state.passengerPickUpPointFeature = null;

      }
    }
  }

  showRoutes() {
    this.state.showDrivers = true;
    this.state.showRoutes = false;
    console.log(this.state.filteredRoute);
    api.get(`https://localhost:44360/api/Ride/routes`).then(res => {
if(res.code == 200){
      console.log(res.data);
      this.setState({ passengerRoutes: res.data });
      this.state.passengerRoutes.forEach((element) => {
        console.log(element.geometry);
      });
      this.state.passengerRouteFeatures = []; // deletes old routes

      this.state.passengerRoutes.forEach((element) => {
        this.createPassengerRoute(element.geometry);
      });
    }
    });
  }

  saveRide() {
    var newRoute = {
      FromAddress: this.state.route.fromAddress,
      ToAddress: this.state.route.toAddress,
      RouteGeometry: this.state.route.routeGeometry
    }
    console.log(newRoute);
    // other stuff not implemented
  }

  getNearest(coord) {
    return new Promise((resolve, reject) => {
      //make sure the coord is on street
      fetch(this.state.url_osrm_nearest + coord.join()).then((response) => {
        return response.json();
      }).then(function (json) {
        if (json.code === 'Ok') {
          resolve(json.waypoints[0].location);
        }
        else reject();
      });
    });
  }

  createFeature(coord, fromFeature) { // fromFeature param indicates which feature is added - start point or destination
    var feature = new Feature({
      type: 'place',
      geometry: new Point(fromLonLat(coord)),
      onClick: console.log('clicked')
    });
    feature.setStyle(this.state.routeStyles.icon);

    this.state.vectorSource.addFeature(feature);
    console.log(fromFeature);
    if (fromFeature)
      this.setState({ features: { startPointFeature: feature, destinationFeature: this.state.features.destinationFeature } });
    else
      this.setState({ features: { startPointFeature: this.state.features.startPointFeature, destinationFeature: feature } });
    console.log(this.state.features);

  }

  setPassengersPickUpPoint(val) {
    this.CenterMap(val[0], val[1], this.state.map);
    var xy = [];
    xy = transform(val, 'EPSG:4326', 'EPSG:3857');
    console.log(xy);
    var vectorSource = this.state.Vector;

    var feature = new Feature(
      new Point(xy)
    );

    vectorSource.clear();
    vectorSource.addFeature(feature);

  }

  createDriverRoute(polyline) {
    this.state.route.routeGeometry = polyline;
    var route = new Polyline({
      factor: 1e5
    }).readGeometry(polyline, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    var feature = new Feature({
      type: 'route',
      geometry: route
    });
    if (this.state.routeFeature) {
      this.state.vectorSource.removeFeature(this.state.routeFeature) // removes old route from map
    }
    feature.setStyle(this.state.routeStyles.route);
    this.state.vectorSource.addFeature(feature);
    this.setState({ routeFeature: feature });
  }

  createPassengerRoute(polyline) {
    this.state.route.routeGeometry = polyline;
    var route = new Polyline({
      factor: 1e5
    }).readGeometry(polyline, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    var feature = new Feature({
      type: 'route',
      geometry: route
    });

    feature.setStyle(this.state.routeStyles.route);

    this.state.passengerRouteFeatures.push({ feature: feature, geometry: polyline });

    this.state.vectorSource.addFeature(feature);
  }

  to4326(coord) {
    return transform([
      parseFloat(coord[0]), parseFloat(coord[1])
    ], 'EPSG:3857', 'EPSG:4326');
  }

  coordinatesToLocation(latitude, longtitude) {
    return new Promise(function (resolve, reject) {
      fetch('//eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat=' + latitude + '&lon=' + longtitude + '&format=json'
      ).then(function (response) {
        return response.json();
      }).then(function (json) {

        resolve(json);
      });
    });
  }

  setInputFrom(value) {
    var inputField = document.querySelector("#driver-address-input-from");
    inputField.value = value;
    this.state.route.fromAddress = value;

  }

  setInputTo(value) {
    var inputField = document.querySelector("#driver-address-input-to");
    inputField.value = value;
    this.state.route.toAddress = value;
  }

  driverAddressInputSuggestion() {
    var places = require("places.js");


    var placesAutocompleteFrom = places({
      container: document.querySelector("#driver-address-input-from")
    });

    var placesAutocompleteTo = places({
      container: document.querySelector("#driver-address-input-to")
    });



    placesAutocompleteFrom.on("change", (e) => {
      this.setState({ startPointInput: true });
      this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
      this.addRoutePoint([e.suggestion.latlng.lng, e.suggestion.latlng.lat], false);
    });

    placesAutocompleteTo.on("change", (e) => {
      this.setState({ startPointInput: false });
      this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
      this.addRoutePoint([e.suggestion.latlng.lng, e.suggestion.latlng.lat], false);
    });


  }

  passengerAddressInputSuggestion() {
    var places = require("places.js");


    var placesAutocompletePassenger = places({
      container: document.querySelector("#passenger-address")
    });

    placesAutocompletePassenger.on("change", (e) => {
      this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
    });

  }

  CenterMap(long, lat, map) {

    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(19);
  }

  showRidesOfDriver(driver) {

    if (this.state.showRides) {
      if (driver == this.state.driver) {
        this.setState({ showRides: false, driverEmail: "" })
      }
      else {
        this.setState({ driverEmail: driver })
      }
    } else {
      this.setState({ showRides: true, driverEmail: driver });

    }


  }

  handlePassengerMapClick(evt) {
    var feature = new Feature(
      new Point(evt.coordinate)
    );
    var lonlat = [];
    lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

    this.setState({ pickUpPoint: lonlat });
    if (this.state.passengerPickUpPointFeature) {
      this.state.vectorSource.removeFeature(this.state.passengerPickUpPointFeature);
    }
    this.setState({ passengerPickUpPointFeature: feature });
    this.state.vectorSource.addFeature(feature);



  }

  handleDriverMapClick(markersOnMap, coordinates) {
    if (markersOnMap > 1) {
      if (this.state.features.destinationFeature) {
        this.state.vectorSource.removeFeature(this.state.features.destinationFeature);
      }

      this.setState({ coordinates: { firstPoint: this.state.coordinates.firstPoint, lastPoint: coordinates } });

      this.coordinatesToLocation(coordinates[1], coordinates[0]).then((e) => {
        this.setInputTo((e.address.house_number ? e.address.house_number + ", " : "") + e.address.road + ", " + e.address.city);
      });
      this.createFeature(coordinates, false);

    }
    else {

      this.setState({ coordinates: { firstPoint: coordinates, lastPoint: [] } });

      this.coordinatesToLocation(coordinates[1], coordinates[0]).then((e) => {
        this.setInputFrom((e.address.house_number ? e.address.house_number + ", " : "") + e.address.road + ", " + e.address.city);
      });

      this.createFeature(coordinates, true);

    }

  }

  handleAddressInput(coordinates) {
    if (this.state.startPointInput) {
      if (this.state.features.startPointFeature) {
        this.state.vectorSource.removeFeature(this.state.features.startPointFeature)
      }
      this.setState({ coordinates: { firstPoint: coordinates, lastPoint: this.state.coordinates.lastPoint } });


      this.createFeature(coordinates, true);
    }
    else {
      if (this.state.features.destinationFeature) {

        this.state.vectorSource.removeFeature(this.state.features.destinationFeature)
      }

      this.setState({ coordinates: { firstPoint: this.state.coordinates.firstPoint, lastPoint: coordinates } });

      this.createFeature(coordinates, false);

    }
  }

  addRoutePoint(evt, clickedOnMap) {

    this.getNearest(evt).then((coordinates) => {
      var markersOnMap = this.state.points;
      markersOnMap++;
      this.setState({ points: markersOnMap });

      if (clickedOnMap) { // Separates route point adding by clicking and by writing an address

        this.handleDriverMapClick(markersOnMap, coordinates);
      }
      else {
        this.handleAddressInput(coordinates)

      }

      if (markersOnMap < 2) { // only one point on a map, impossible to display route
        return;
      }


      var point1 = this.state.coordinates.firstPoint;
      var point2 = this.state.coordinates.lastPoint;

      console.log(this.state.vectorSource.getFeatures());
      console.log(this.state.features);

      fetch(this.state.url_osrm_route + point1 + ';' + point2).then((r) => {

        return r.json();
      }).then((json) => {
        if (json.code !== 'Ok') {
          return;
        }
        this.createDriverRoute(json.routes[0].geometry);
      });
    });
  }

  componentDidMount() {

    //var icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',

    var vectorSource = new SourceVector(),
      vectorLayer = new LayerVector({
        source: vectorSource
      });

    console.clear();

    var map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: [-5685003, -3504484],
        zoom: 11
      })
    });
    this.setState({ map, vectorSource });

    this.CenterMap(25.279652, 54.687157, map);

    map.on('click', (evt) => {
      if (this.state.driver) {
        var coord4326 = transform([
          parseFloat(evt.coordinate[0]), parseFloat(evt.coordinate[1])
        ], 'EPSG:3857', 'EPSG:4326');
        this.addRoutePoint(coord4326, true);
      }

      else {
        if (this.state.filteredRoute.toOffice) {
          this.handlePassengerMapClick(evt)
        }
      }

    });

    if (this.state.driver) {
      this.driverAddressInputSuggestion();
    }
    else {

      this.showRoutes();
      if( this.state.filteredRoute.toOffice){
      this.passengerAddressInputSuggestion();
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.state.driver

            ? <div>
              <div className="form-group">

                <label>From:</label>

                <input
                  type="search"
                  class="form-group"
                  id="driver-address-input-from"
                  placeholder="Select From Location..."
                />
              </div>

              <div className="form-group">
                <label>To:</label>
                <input
                  type="search"
                  class="form-group"
                  id="driver-address-input-to"
                  placeholder="Select To Location..."

                />
              </div>

              <button onClick={() => { this.saveRide() }}>Save</button>
            </div>
            : <div>
              <span>Show routes...</span>
              <form>
                <span>To office</span>
                <td><input type="radio" name="site_name"
                  value={"To office"}
                  checked={this.state.filteredRoute.toOffice === true}
                  onClick={() => {
                    this.state.filteredRoute.toOffice = true;

                  }}
                  onChange={() => this.showRoutes()}
                />
                </td>
                <span>From office</span>
                <td><input type="radio" name="address"
                  value={"From office"}
                  checked={this.state.filteredRoute.toOffice === false}
                  onClick={() => {
                    this.state.filteredRoute.toOffice = false;
                    this.handleToOfficeSelection();
                  }}

                  onChange={() => this.showRoutes()}
                />
                </td>
                <span>Select office</span>
                <select onChange={(e) => { this.handleOfficeSelection(e) }}>
                  <option value={0} >{OfficeAddresses[0].street + OfficeAddresses[0].number}</option>
                  <option value={1} >{OfficeAddresses[1].street + OfficeAddresses[1].number}</option>
                </select>
              </form>
              {
                this.state.filteredRoute.toOffice

                  ? <div className="form-group">
                    <label>Destination:</label>
                    <input
                      type="search"
                      class="form-group"
                      id="passenger-address"
                      placeholder="Select destination..."

                    />
                  </div>
                  : <div></div>
              }
              <button onClick={() => { this.selectRoute() }}>Next</button>
              {this.state.showDriver
                ? <tbody>
                  {
                    this.state.driversOfRoute.map(driver =>
                      <tr key={driver.id}>

                        <td><button onClick={() => { this.showRidesOfDriver(driver.email) }}>{driver.firstName} </button> </td>

                      </tr>

                    )
                  }
                  {

                    this.state.showRides
                      ? <RidesOfDriver rides={this.state.ridesOfRoute} driver={this.state.driverEmail} />
                      : <div></div>
                  }
                </tbody>

                : <div></div>

              }
            </div>

        }


        <div id="map"></div>



      </div>

    );

  }
}
export default test;


