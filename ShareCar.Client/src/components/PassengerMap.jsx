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
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Phone from "@material-ui/icons/Phone";
import map from "./Maps/Map";
import "../styles/testmap.css";

export class PassengerMap extends React.Component {
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
    viewNext: false,
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

  selectRoute() {
    if (this.state.passengerRouteFeatures.length != 0) {
      // checks if there are any routes displayed
      this.state.showDrivers = true;
      this.state.showRoutes = false;
      this.state.showRides = false;
      var counter = this.state.passengerRouteFeaturesCounter;
      if (counter == 0) {
        this.state.passengerRouteFeatures[
          this.state.passengerRouteFeatures.length - 1
        ].feature.setStyle(this.state.routeStyles.route);
      } else {
        this.state.passengerRouteFeatures[counter - 1].feature.setStyle(
          this.state.routeStyles.route
        );
      }

      this.state.passengerRouteFeatures[counter].feature.setStyle(
        this.state.selectedRouteStyle.route
      );
      this.setState(
        {
          selectedRoute: this.state.passengerRouteFeatures[counter]
        },
        () => {
          console.log(counter);
          console.log(this.state.passengerRouteFeatures);
          console.log(this.state.selectedRoute);
          console.log("=======================");

          counter++;

          if (counter >= this.state.passengerRouteFeatures.length) {
            counter = 0;
          }
          console.log(counter);
          this.setState({ passengerRouteFeaturesCounter: counter });
          console.log(this.state.selectedRoute);
          this.getRidesByRoute(this.state.selectedRoute.route);
        }
      );
    } else {
      this.setState({ showDrivers: false });
    }
  }

  handleCloseDriver() {
    this.setState({ showDriver: false });
  }
  getRidesByRoute(route) {
    console.log(route);
    //    var route = {
    //    Geometry: route.geometry
    //  };
    // api.get(`/Ride/ridesByRoute=` + route).then(response => {
    this.setState({ ridesOfRoute: route.rides, driversOfRoute: [] }, () => {
      var drivers = [];
      console.log(this.state.ridesOfRoute);

      this.state.ridesOfRoute.forEach(ride => {
        console.log("ride:   " + ride);
        if (!drivers.includes(ride.driverFirstName + ride.driverLastName)) {
          drivers.push(ride.driverFirstName + ride.driverLastName);
          console.log("driver:   " + ride.driverFirstName);

          var driversArray = this.state.driversOfRoute;
          driversArray.push({
            firstName: ride.driverFirstName,
            lastName: ride.driverLastName,
            email: ride.driverEmail,
            driverPhone: ride.driverPhone
          });

          this.setState({ driversOfRoute: driversArray });
        }
      });

      console.log("state drivers: ====   " + this.state.driversOfRoute);

      if (drivers.length != 0) {
        this.setState({ showDriver: true });
      } else {
        this.setState({ showDriver: false });
      }

      console.log(this.state.driversOfRoute);
    });
  }

  handleOfficeSelection(e, indexas, button) {
    var index = e.target.value;

    var getState = this.state.filteredRoute;

    getState.office = OfficeAddresses[index];

    this.setState({ filteredRoute: getState });

    this.showRoutes();
  }

  //removes passenger pick up point marker from map and clears states related with it
  handleFromOfficeSelection() {
    if (!this.state.filteredRoute.toOffice) {
      if (this.state.passengerPickUpPointFeature) {
        this.state.vectorSource.removeFeature(
          this.state.passengerPickUpPointFeature
        );
        this.state.passengerPickUpPointFeature = null;
      }
      this.setState(
        {
          pickUpPoint: [
            this.state.filteredRoute.office.longtitude,
            this.state.filteredRoute.office.latitude
          ]
        },
        () => {
          console.log(this.state.pickUpPoint);
        }
      );
    }
  }

  showRoutes() {
    this.state.vectorSource.clear();
    this.CenterMap(
      this.state.filteredRoute.office.longtitude,
      this.state.filteredRoute.office.latitude,
      this.state.map,
      13
    );
    this.setState({
      showDriver: true,
      showRoutes: false,
      driversOfRoute: [],
      driverEmail: "",
      showRides: false,
      passengerRouteFeaturesCounter: 0
    });
    //  this.state.showDrivers = true;
    //  this.state.showRoutes = false;
    //   this.state.driversOfRoute
    //  this.state.driverEmail
    //  this.state.showRides
    console.log(this.state.filteredRoute);
    var routeDto;
    this.state.filteredRoute.toOffice
      ? (routeDto = {
          AddressTo: {
            City: this.state.filteredRoute.office.city,
            Street: this.state.filteredRoute.office.street,
            Number: this.state.filteredRoute.office.number
          }
        })
      : (routeDto = {
          AddressFrom: {
            City: this.state.filteredRoute.office.city,
            Street: this.state.filteredRoute.office.street,
            Number: this.state.filteredRoute.office.number
          }
        });
    console.log(routeDto);
    api.post("https://localhost:44360/api/Ride/routes", routeDto).then(res => {
      console.log(res.data);

      console.log(res);
      console.log(res.status);
      if (res.status == 200 && res.data != "") {
        console.log(res.data);
        this.setState({ passengerRoutes: res.data });
        this.state.passengerRoutes.forEach(element => {
          console.log(element.geometry);
        });
        this.state.passengerRouteFeatures = []; // deletes old routes

        this.state.passengerRoutes.forEach(element => {
          this.createPassengerRoute(element);
        });
      }
    });
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

  passengerAddressInputSuggestion() {
    var places = require("places.js");

    var placesAutocompletePassenger = places({
      container: document.querySelector("#passenger-address")
    });
    placesAutocompletePassenger.on("change", e => {
      this.CenterMap(
        e.suggestion.latlng.lng,
        e.suggestion.latlng.lat,
        this.state.map,
        19
      );
    });
  }

  CenterMap(long, lat, map, zoom) {
    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(zoom);
  }

  showRidesOfDriver(driver) {
    if (this.state.showRides) {
      if (driver == this.state.driver) {
        this.setState({ showRides: false, driverEmail: "" });
      } else {
        this.setState({ driverEmail: driver });
      }
    } else {
      this.setState({ showRides: true, driverEmail: driver });
    }
  }

  handlePassengerMapClick(evt) {
    var feature = new Feature(new Point(evt.coordinate));
    var lonlat = [];
    lonlat = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

    this.setState({ pickUpPoint: lonlat });
    if (this.state.passengerPickUpPointFeature) {
      this.state.vectorSource.removeFeature(
        this.state.passengerPickUpPointFeature
      );
    }
    this.setState({ passengerPickUpPointFeature: feature });
    this.state.vectorSource.addFeature(feature);
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

      this.showRoutes();
      this.passengerAddressInputSuggestion();

      if (this.state.filteredRoute.toOffice) {
      } else {
        this.handleFromOfficeSelection();
      }
    });

    map.on("click", evt => {
      if (this.state.filteredRoute.toOffice) {
        this.handlePassengerMapClick(evt);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="passengerForm">
          <Grid
            className="from-to-container"
            alignItems="flex-start"
            container
            justify="center"
          >
            <Grid item xs={10}>
              <Card className="paper-background">
                <Grid container justify="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center" justify="center">
                      <Grid item xs={6}>
                        <Grid container justify="center">
                          <Typography variant="body1">To office</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container justify="center">
                          <Radio
                            color="primary"
                            name="site_name"
                            checked={this.state.filteredRoute.toOffice === true}
                            onClick={() => {
                              this.state.filteredRoute.toOffice = true;
                            }}
                            onChange={() => this.showRoutes()}
                            value={"To office"}
                            name="radio-button-demo"
                            aria-label="A"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container alignItems="center" justify="center">
                      <Grid item xs={6}>
                        <Grid container justify="center">
                          <Typography variant="body1">From office</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container justify="center">
                          <Radio
                            color="primary"
                            name="address"
                            checked={
                              this.state.filteredRoute.toOffice === false
                            }
                            onChange={() => this.showRoutes()}
                            onClick={() => {
                              this.state.filteredRoute.toOffice = false;
                              this.handleFromOfficeSelection();
                            }}
                            value={"From office"}
                            name="radio-button-demo"
                            aria-label="A"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <SimpleMenu
                    buttonText="Select Office"
                    handleSelection={(e, indexas, button) =>
                      this.handleOfficeSelection(e)
                    }
                    whichButton="from"
                  />
                  {/* <select
                    onChange={e => {
                      this.handleOfficeSelection(e);
                    }}
                  >
                    <option value={0}>
                      {OfficeAddresses[0].street + OfficeAddresses[0].number}
                    </option>
                    <option value={1}>
                      {OfficeAddresses[1].street + OfficeAddresses[1].number}
                    </option>
                  </select> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid container justify="center" className="algolia-input" xs={10}>
            <input
              type="search"
              class="form-group"
              id="passenger-address"
              placeholder="Center map by location..."
            />
          </Grid>
          {this.state.showDriver ? (
            <Grid container justify="center">
              <Grid item xs={10}>
                <Card>
                  {this.state.driversOfRoute.map(driver => (
                    <Grid
                      className="driver-button-container"
                      justify="center"
                      item
                      xs={12}
                      key={driver.id}
                    >
                      <Grid container alignItems="center" justify="center">
                        <Grid className="names-and-phones" item xs={12}>
                          <Grid container>
                            <Grid className="driver-name" item xs={12}>
                              <Typography variant="caption">Driver </Typography>
                              <Typography variant="body1">
                                {driver.firstName} {driver.lastName}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid className="call" item xs={12}>
                            <Phone />
                            <Typography variant="body1">
                              {driver.driverPhone}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ "background-color": "#007bff" }}
                        onClick={() => {
                          this.showRidesOfDriver(driver.email);
                        }}
                      >
                        View Time
                      </Button>{" "}
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          this.handleCloseDriver();
                        }}
                      >
                        Close
                      </Button>{" "}
                    </Grid>
                  ))}
                  {this.state.showRides ? (
                    <RidesOfDriver
                      rides={this.state.ridesOfRoute}
                      driver={this.state.driverEmail}
                      pickUpPoint={this.state.pickUpPoint}
                      className="date-display"
                    />
                  ) : (
                    <div />
                  )}
                </Card>
              </Grid>
            </Grid>
          ) : (
            <div />
          )}
          <div />
        </div>
        <div id="map" />
        <Button
          variant="contained"
          color="primary"
          style={{ "background-color": "#007bff" }}
          className="next-button"
          onClick={() => {
            this.setState({ viewNext: !this.state.viewNext });
            this.selectRoute();
          }}
        >
          View Next Route
        </Button>
      </div>
    );
  }
}
export default PassengerMap;
