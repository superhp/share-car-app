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
import "../styles/genericStyles.css";

import { centerMap } from "./../utils/mapUtils";
import { routeStyles, selectedRouteStyle } from "./../utils/mapStyles";

export class PassengerMap extends React.Component {
  state = {
    passengerPickUpPointFeature: null,
    selectedRoute: "",
    filteredRoute: {
      toOffice: false,
      office: OfficeAddresses[0],
      dateTimeFrom: "",
      dateTimeTo: ""
    }, // route object containing filttering information acocrding to which passenger will get route suggestions
    driversOfRoute: [],
    map: "",
    accessToken: "ad45b0b60450a4", // required for reverse geocoding api
    vectorSource: "",
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
    driverEmail: ""
  };

  selectRoute(value) {
    let counter = this.state.passengerRouteFeaturesCounter;
    const features = this.state.passengerRouteFeatures;
    const featuresLength = features.length;
    
    if (featuresLength != 0) {
      this.state.showDrivers = true;
      this.state.showRoutes = false;
      this.state.showRides = false;

      if (counter == 0) {
        this.state.passengerRouteFeatures[featuresLength - 1]
          .feature.setStyle(routeStyles.route);

        if (featuresLength != 1) {
          features[1].feature.setStyle(routeStyles.route);
        }
      } 
      else {
          features[counter - 1].feature.setStyle(routeStyles.route);
      
          if (value == -1) {
            if (counter != featuresLength - 1) {
              features[counter + 1].feature.setStyle(routeStyles.route);
            } 
            else {
                  features[0].feature.setStyle(routeStyles.route);
            }
          }
      }

      features[counter].feature.setStyle(selectedRouteStyle.route);
      this.setState(
        {
          selectedRoute: features[counter]
        },
        () => {
          counter += value;

          if (counter >= featuresLength) {
            counter = 0;
          }
          if (counter < 0) {
            counter = featuresLength - 1;
          }
          this.setState({ passengerRouteFeaturesCounter: counter });
          this.getRidesByRoute(this.state.selectedRoute.route);
        }
      );
    }
  }

  handleCloseDriver() {
    this.setState({ showDriver: false });
  }

  getRidesByRoute(route) {
    this.setState({ ridesOfRoute: route.rides, driversOfRoute: [] }, () => {
      var drivers = [];

      this.state.ridesOfRoute.forEach(ride => {
        if (!drivers.includes(ride.driverFirstName + ride.driverLastName)) {
          drivers.push(ride.driverFirstName + ride.driverLastName);

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

      if (drivers.length != 0) {
        this.setState({ showDriver: true });
      } else {
        this.setState({ showDriver: false });
      }
    });
}

  handleOfficeSelection(e, indexas, button) {
    var index = e.target.value;
    if (indexas) {
      var getState = this.state.filteredRoute;

      getState.office = OfficeAddresses[indexas];

      this.setState({ filteredRoute: getState });

      this.showRoutes();
    }
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
    centerMap(
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

    feature.setStyle(routeStyles.route);

    this.state.passengerRouteFeatures.push({
      feature: feature,
      geometry: polyline.geometry,
      route: polyline
    });

    this.state.vectorSource.addFeature(feature);
  }

  passengerAddressInputSuggestion() {
    var places = require("places.js");

    var placesAutocompletePassenger = places({
      container: document.querySelector("#passenger-address")
    });
    placesAutocompletePassenger.on("change", e => {
      centerMap(
        e.suggestion.latlng.lng,
        e.suggestion.latlng.lat,
        this.state.map,
        19
      );
    });
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

    this.setState({ pickUpPoint: lonlat }, () => {
      console.log(this.state.pickUpPoint);
    });
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
      centerMap(25.279652, 54.687157, this.state.map);

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
                      this.handleOfficeSelection(e, indexas, button)
                    }
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
            this.selectRoute(-1);
          }}
        >
          View Previous Route
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ "background-color": "#007bff" }}
          className="next-button"
          onClick={() => {
            this.setState({ viewNext: !this.state.viewNext });
            this.selectRoute(1);
          }}
        >
          View Next Route
        </Button>
      </div>
    );
  }
}
export default PassengerMap;
