import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Polyline from "ol/format/Polyline";
import { fromLonLat } from "ol/proj";
import Button from "@material-ui/core/Button";

import { OfficeAddresses } from "../../utils/AddressData";
import addressParser from "./../../helpers/addressParser";
import RidesScheduler from "./Ride/RidesScheduler";
import map from "./../Maps/Map";
import { getNearest, coordinatesToLocation, centerMap } from "./../../utils/mapUtils";
import { routeStyles } from "./../../utils/mapStyles";

import "./../../styles/testmap.css";
import { DriverRouteInput } from "./Map/DriverRouteInput";

export class DriverMap extends React.Component {
  state = {
    points: 0,
    coordinates: {
      firstPoint: [],
      lastPoint: []
    },
    isChecked: false,
    isContinueClicked: false,
    directionFrom: true,
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
    passengerRouteFeatures: []
  };

  handleOfficeSelection(e, indexas, button) {
    if (indexas) {
      this.setState({
        filteredRoute: {
          ...this.state.filteredRoute, office: OfficeAddresses[indexas]
        }},
        () => {
          const address = this.officeToString(this.state.filteredRoute.office);
          const route = this.state.route;
          this.updateRoute(button, route, address);
        }
      );
    }
  }

  officeToString(office) {
	  const address =
        office.number +
        ", " +
        office.street +
        ", " +
        office.city;
    return address;
  }

  updateRoute(buttonType, route, address){
    if(buttonType === "from"){
      this.setState({startPointInput: true});
      this.setState({ route:
        {...this.state.route, addressFrom: address}
      });
      this.setInputFrom(address);
    }
    else{
      this.setState({startPointInput: false});
      this.setState({ route:
        {...this.state.route, addressTo: address}
      });
      this.setInputTo(address);
    }
    
    this.addRoutePoint(
      [
        this.state.filteredRoute.office.longtitude,
        this.state.filteredRoute.office.latitude
      ],
      false
    );
  }

  createFeature(coordinates, fromFeature) {
    // fromFeature param indicates which feature is added - start point or destination
    let feature = new Feature({
      type: "place",
      geometry: new Point(fromLonLat(coordinates))
    });
    feature.setStyle(routeStyles.icon);
    this.state.vectorSource.addFeature(feature);
    if (fromFeature) {
      this.setState({
        features: {...this.state.features, startPointFeature: feature}
      });
    } else {
      this.setState({
        features: {...this.state.features, destinationFeature: feature}
      });
    }
  }

  createDriverRoute(polyline) {
    this.setState({route: {...this.state.route, routeGeometry: polyline}});
    const route = new Polyline({
      factor: 1e5
    }).readGeometry(this.state.route.routeGeometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });
    let feature = new Feature({
      type: "route",
      geometry: route
    });
    if (this.state.routeFeature) {
      this.state.vectorSource.removeFeature(this.state.routeFeature); // removes old route from map
    }
    feature.setStyle(routeStyles.route);
    this.state.vectorSource.addFeature(feature);
    this.setState({ routeFeature: feature });
  }

  setInputFrom(value) {
    let inputField = document.querySelector("#driver-address-input-from");
    inputField.value = value;
    this.setState({route: {...this.state.route, fromAddress: value }});
  }

  setInputTo(value) {
    let inputField = document.querySelector("#driver-address-input-to");
    inputField.value = value;
    this.setState({route: {...this.state.route, toAddress: value }});
  }

  driverAddressInputSuggestion() {
    // let places = require("places.js");
    // if(this.state.directionFrom){
    //   let placesAutocompleteFrom = places({
    //     container: document.querySelector("#driver-address-input-from")
    //   });
    //   placesAutocompleteFrom.on("change", e => {
    //     this.setState({ startPointInput: true });
    //     this.handleRouteCreation(e, "from");
    //   });
    // }
    // else {
    //   let placesAutocompleteTo = places({
    //     container: document.querySelector("#driver-address-input-to")
    //   });
    //   placesAutocompleteTo.on("change", e => {
    //     this.setState({ startPointInput: false });
    //     this.handleRouteCreation(e, "to");
    //   });
    // }
  }

  handleRouteCreation(e, addressType) {
    const address = addressParser.parseAlgolioAddress(e.suggestion.name);
    const city = e.suggestion.city;
    const route = this.state.route;

    if(addressType === "from"){
      this.setState({route: 
        {
          ...this.state.route, 
          fromAddress: [address.number, address.name, city].join(", ")
        }
      });
    }
    else {
      this.setState({route: 
        {
          ...this.state.route, 
          toAddress: [address.number, address.name, city].join(", ")
        }
      });
    }
    
    centerMap(
      e.suggestion.latlng.lng,
      e.suggestion.latlng.lat,
      this.state.map
    );

    this.addRoutePoint(
      [e.suggestion.latlng.lng, e.suggestion.latlng.lat],
      false
    );
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
          ...this.state.coordinates,
          lastPoint: coordinates
        }
      });

      coordinatesToLocation(coordinates[1], coordinates[0]).then(e => {
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
        coordinates: {
          firstPoint: coordinates, 
          lastPoint: [] 
        }
      });

      coordinatesToLocation(coordinates[1], coordinates[0]).then(e => {
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
          ...this.state.coordinates,
          firstPoint: coordinates
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
          ...this.state.coordinates,
          lastPoint: coordinates
        }
      });

      this.createFeature(coordinates, false);
    }
  }

  addRoutePoint(evt, clickedOnMap) {
    getNearest(evt).then(coordinates => {
      let markersOnMap = this.state.points + 1;
      this.setState({ points: markersOnMap });

      if (clickedOnMap) {
        this.handleDriverMapClick(markersOnMap, coordinates);
      } else {
        this.handleAddressInput(coordinates);
      }

      if (markersOnMap < 2) {
        return;
      }

      this.createRouteFromPoints();
    });
  }

  createRouteFromPoints() {
    const URL_OSMR_ROUTE = "//cts-maps.northeurope.cloudapp.azure.com/route/v1/driving/";
    const point1 = this.state.coordinates.firstPoint;
    const point2 = this.state.coordinates.lastPoint;
  
    fetch(URL_OSMR_ROUTE + point1 + ";" + point2)
      .then(r => {
        return r.json();
      })
      .then(json => {
        if (json.code !== "Ok") {
        return;
        }
        this.createDriverRoute(json.routes[0].geometry);
      });
  }

  componentDidMount() {
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
        center: [-5685003, -3504484],
        zoom: 11,
        minZoom: 9
      })
    });

    this.setState({ map, vectorSource }, function() {
      centerMap(25.279652, 54.687157, this.state.map);
      this.driverAddressInputSuggestion();
    });

    map.on("click", evt => {
      const coord4326 = transform(
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
            <DriverRouteInput 
              onFromAddressChange={address => console.log("From", address)}
              onToAddressChange={address => console.log("To", address)}
            />
        </div>
        <div id="map" />
        {this.state.isContinueClicked ? (
          <RidesScheduler routeInfo={this.state.route} />
        ) : null}
        <Button
          disabled={this.state.route.routeGeometry === "" ? true : false}
          className="continue-button"
          variant="contained"
          color="primary"
          onClick={() => {
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