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
import addressParser from "../helpers/addressParser";
import RidesOfDriver from "./RidesOfDriver";
import SimpleMenu from "./common/SimpleMenu";
import Button from "@material-ui/core/Button";
import RidesScheduler from "./RidesScheduler";
import map from "./Maps/Map";
import "../styles/testmap.css";

export class DriverMap extends React.Component {
  state = {
    points: 0,
    coordinates: {
      firstPoint: [],
      lastPoint: []
    },
    selectedRouteStyle: {
      route: new Style({
        stroke: new Stroke({
          width: 6,
          color: [0, 200, 0, 0.8]
        }),
        zIndex: 10
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
    }, // route object containing filttering information acocrding to which passenger will get route suggestions
    driversOfRoute: [],
    driversInfo: {
      firstName: "",
      lastName: "",
      rides: []
    },
    isContinueClicked: false,
    passengerStylesCouter: 0,
    pickUpPoint: [],
    route: "",
    utils: "",
    map: "",
    accessToken: "ad45b0b60450a4", // required for reverse geocoding api
    vectorSource: "",
    startPointInput: false, // If marker on a map was added by writing an address, it should be known if it was From or To input field
    features: {
      // markers on a map
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
          width: 6,
          color: [40, 40, 40, 0.8]
        })
      }),
      icon: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png"
        })
      })
    },
    driverEmail: "",
    url_osrm_nearest:
      "//cts-maps.northeurope.cloudapp.azure.com/maps/nearest/v1/driving/",
    url_osrm_route:
      "//cts-maps.northeurope.cloudapp.azure.com/maps/route/v1/driving/"
  };

  handleOfficeSelection(e, indexas, button) {
    var index = e.target.value;

    var getState = this.state.filteredRoute;

    getState.office = OfficeAddresses[index];

    this.setState({ filteredRoute: getState });

    var getState = this.state.filteredRoute;
    getState.office = OfficeAddresses[indexas];
    this.setState({ filteredRoute: getState });
    var address =
      this.state.filteredRoute.office.number +
      ", " +
      this.state.filteredRoute.office.street +
      ", " +
      this.state.filteredRoute.office.city;

    var route = this.state.route;

    if (button == "from") {
      this.setState({ startPointInput: true });

      route.addressFrom = address;
      this.setState({ route: route });

      this.setInputFrom(address);

      this.addRoutePoint(
        [
          this.state.filteredRoute.office.longtitude,
          this.state.filteredRoute.office.latitude
        ],
        false
      );
    } else {
      this.setState({ startPointInput: false });

      route.addressTo = address;
      this.setState({ route: route });

      this.setInputTo(address);
      this.addRoutePoint(
        [
          this.state.filteredRoute.office.longtitude,
          this.state.filteredRoute.office.latitude
        ],
        false
      );
    }
  }

  getNearest(coordinates) {
    return new Promise((resolve, reject) => {
      //make sure the coord is on street
      fetch(this.state.url_osrm_nearest + coordinates.join())
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

  createFeature(coordinates, fromFeature) {
    // fromFeature param indicates which feature is added - start point or destination
    var feature = new Feature({
      type: "place",
      geometry: new Point(fromLonLat(coordinates))
    });
    feature.setStyle(this.state.routeStyles.icon);

    this.state.vectorSource.addFeature(feature);
    console.log(fromFeature);
    if (fromFeature) {
      console.log("creating from feature");
      this.setState({
        features: {
          startPointFeature: feature,
          destinationFeature: this.state.features.destinationFeature
        }
      });
    } else {
      this.setState({
        features: {
          startPointFeature: this.state.features.startPointFeature,
          destinationFeature: feature
        }
      });
    }
    console.log(this.state.features);
  }

  createDriverRoute(polyline) {
    this.state.route.routeGeometry = polyline;
    var route = new Polyline({
      factor: 1e5
    }).readGeometry(polyline, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });
    var feature = new Feature({
      type: "route",
      geometry: route
    });
    if (this.state.routeFeature) {
      this.state.vectorSource.removeFeature(this.state.routeFeature); // removes old route from map
    }
    feature.setStyle(this.state.routeStyles.route);
    this.state.vectorSource.addFeature(feature);
    this.setState({ routeFeature: feature });
  }

  createPassengerRoute(polyline) {
    this.state.route.routeGeometry = polyline.geometry;
    var route = new Polyline({
      factor: 1e5
    }).readGeometry(polyline.geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });
    var feature = new Feature({
      type: "route",
      geometry: route
    });

    feature.setStyle(this.state.routeStyles.route);

    this.state.passengerRouteFeatures.push({
      feature: feature,
      geometry: polyline.geometry,
      route: polyline
    });

    this.state.vectorSource.addFeature(feature);
  }

  to4326(coordinates) {
    return transform(
      [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
      "EPSG:3857",
      "EPSG:4326"
    );
  }

  coordinatesToLocation(latitude, longtitude) {
    return new Promise(function(resolve, reject) {
      fetch(
        "//eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat=" +
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

    placesAutocompleteFrom.on("change", e => {
      this.setState({ startPointInput: true });
      var address = addressParser.parseAlgolioAddress(e.suggestion.name);
      var city = e.suggestion.city;

      var route = this.state.route;
      route.fromAddress = address.number + ", " + address.name + ", " + city;
      this.setState({ route });

      this.CenterMap(
        e.suggestion.latlng.lng,
        e.suggestion.latlng.lat,
        this.state.map
      );
      this.addRoutePoint(
        [e.suggestion.latlng.lng, e.suggestion.latlng.lat],
        false
      );
    });

    placesAutocompleteTo.on("change", e => {
      this.setState({ startPointInput: false });
      var address = addressParser.parseAlgolioAddress(e.suggestion.name);
      var city = e.suggestion.city;

      var route = this.state.route;
      route.toAddress = address.number + ", " + address.name + ", " + city;
      this.setState({ route });
      this.CenterMap(
        e.suggestion.latlng.lng,
        e.suggestion.latlng.lat,
        this.state.map
      );
      this.addRoutePoint(
        [e.suggestion.latlng.lng, e.suggestion.latlng.lat],
        false
      );
    });
  }

  CenterMap(long, lat, map) {
    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  }

  handleDriverMapClick(markersOnMap, coordinates) {
    if (markersOnMap > 1) {
      if (this.state.features.destinationFeature) {
        this.state.vectorSource.removeFeature(
          this.state.features.destinationFeature
        );
      }

      this.setState({
        coordinates: {
          firstPoint: this.state.coordinates.firstPoint,
          lastPoint: coordinates
        }
      });

      this.coordinatesToLocation(coordinates[1], coordinates[0]).then(e => {
        this.setInputTo(
          (e.address.house_number ? e.address.house_number + ", " : "") +
            e.address.road +
            ", " +
            e.address.city
        );
      });
      this.createFeature(coordinates, false);
    } else {
      this.setState({
        coordinates: { firstPoint: coordinates, lastPoint: [] }
      });

      this.coordinatesToLocation(coordinates[1], coordinates[0]).then(e => {
        this.setInputFrom(
          (e.address.house_number ? e.address.house_number + ", " : "") +
            e.address.road +
            ", " +
            e.address.city
        );
      });

      this.createFeature(coordinates, true);
    }
  }

  handleAddressInput(coordinates) {
    if (this.state.startPointInput) {
      if (this.state.features.startPointFeature) {
        this.state.vectorSource.removeFeature(
          this.state.features.startPointFeature
        );
      }
      this.setState({
        coordinates: {
          firstPoint: coordinates,
          lastPoint: this.state.coordinates.lastPoint
        }
      });

      this.createFeature(coordinates, true);
    } else {
      if (this.state.features.destinationFeature) {
        this.state.vectorSource.removeFeature(
          this.state.features.destinationFeature
        );
      }

      this.setState({
        coordinates: {
          firstPoint: this.state.coordinates.firstPoint,
          lastPoint: coordinates
        }
      });

      this.createFeature(coordinates, false);
    }
  }

  addRoutePoint(evt, clickedOnMap) {
    console.log(evt);
    this.getNearest(evt).then(coordinates => {
      var markersOnMap = this.state.points;
      markersOnMap++;
      this.setState({ points: markersOnMap });

      if (clickedOnMap) {
        // Separates route point adding by clicking and by writing an address

        this.handleDriverMapClick(markersOnMap, coordinates);
      } else {
        this.handleAddressInput(coordinates);
      }

      if (markersOnMap < 2) {
        // only one point on a map, impossible to display route
        return;
      }

      var point1 = this.state.coordinates.firstPoint;
      var point2 = this.state.coordinates.lastPoint;

      console.log(this.state.vectorSource.getFeatures());
      console.log(this.state.features);

      fetch(this.state.url_osrm_route + point1 + ";" + point2)
        .then(r => {
          return r.json();
        })
        .then(json => {
          if (json.code !== "Ok") {
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
      target: "map",
      controls: [],
      layers: [
        new Tile({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: [-5685003, -3504484],
        zoom: 11,
        minZoom: 9
      })
    });

    this.setState({ map, vectorSource }, function() {
      this.CenterMap(25.279652, 54.687157, this.state.map);

      this.driverAddressInputSuggestion();
    });

    map.on("click", evt => {
      var coord4326 = transform(
        [parseFloat(evt.coordinate[0]), parseFloat(evt.coordinate[1])],
        "EPSG:3857",
        "EPSG:4326"
      );
      this.addRoutePoint(coord4326, true);
    });
  }

  render() {
    return (
      <div>
        <div className="displayRoutes">
          <div>
            <div className="map-input-selection">
              <div className="form-group">
                <input
                  type="search"
                  className="form-group location-select"
                  id="driver-address-input-from"
                  placeholder="Select From Location..."
                />
                <SimpleMenu
                  handleSelection={(e, indexas, button) =>
                    this.handleOfficeSelection(e, indexas, button)
                  }
                  whichButton="from"
                />
              </div>

              <div className="form-group">
                <input
                  type="search"
                  className="form-group location-select"
                  id="driver-address-input-to"
                  placeholder="Select To Location..."
                />
                <SimpleMenu
                  handleSelection={(e, indexas, button) =>
                    this.handleOfficeSelection(e, indexas, button)
                  }
                  whichButton="to"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="map" />
        {this.state.isContinueClicked ? (
          <RidesScheduler routeInfo={this.state.route} />
        ) : null}
        <Button
          disabled={this.state.route.routeGeometry == "" ? true : false}
          className="continue-button"
          variant="contained"
          color="primary"
          onClick={() => {
            console.log(this.state.route);
            this.setState({ isContinueClicked: !this.state.isContinueClicked });
          }}
        >
          Continue
        </Button>
      </div>
    );
  }
}
export default DriverMap;