import * as React from "react";
import Map from "ol/Map";
import View from "ol/View";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Button from "@material-ui/core/Button";

import { OfficeAddresses } from "../../utils/AddressData";
import RidesScheduler from "./Ride/RidesScheduler";
import { DriverRouteInput } from "./Map/DriverRouteInput";
import {
  fromLonLatToMapCoords, fromMapCoordsToLonLat,
  getNearest, coordinatesToLocation,
  createPointFeature, createRouteFeature,
  createRoute, centerMap
} from "./../../utils/mapUtils";
import { routeStyles } from "./../../utils/mapStyles";
import { addressToString, fromLocationIqResponse } from "../../utils/addressUtils";

import "./../../styles/testmap.css";
export class DriverMap extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInputs = [];
  }
  state = {
    isRideSchedulerVisible: false,
    isFromAddressEditable: true, // can the fromAddress be changed by clicking on the map?
    fromAddress: null,
    toAddress: OfficeAddresses[0],
    initialFromAddress: null,
    initialToAddress: OfficeAddresses[0],
    routeGeometry: null, // only needed to prevent duplicate calls for RidesScheduler
    routePoints: [{ address: OfficeAddresses[0], feature: null, displayName: null }],
    routePolylineFeature: null,
  };

  componentDidMount() {
    const { map, vectorSource } = this.initializeMap();
    this.map = map;
    this.vectorSource = vectorSource;
    this.addNewRoutePoint(this.state.toAddress)
  }

  handleFromAddressChange(newFromAddress) {

    if (!OfficeAddresses.some(a => a == newFromAddress)) {
      //  this.setAutocompleteFieldValue(addressToString(newFromAddress));
      this.setState({ isFromAddressEditable: true });
    }
    this.setState({ fromAddress: newFromAddress }, this.updateMap(newFromAddress));
    if (newFromAddress) {
      centerMap(newFromAddress.longitude, newFromAddress.latitude, this.map);
    }
  }

  handleToAddressChange(newToAddress) {
    if (!OfficeAddresses.some(a => a == newToAddress)) {
      //   this.setAutocompleteFieldValue(addressToString(newToAddress));
      this.setState({ isFromAddressEditable: false });
    }
    this.setState({ toAddress: newToAddress }, this.updateMap(newToAddress));
    if (newToAddress) {
      centerMap(newToAddress.longitude, newToAddress.latitude, this.map);
    }
  }

  handleOfficeChange(address) {
    const { longitude, latitude } = address
    var routePoints = this.state.routePoints;
    this.vectorSource.removeFeature(routePoints[0].feature);
    const feature = createPointFeature(longitude, latitude);
    this.vectorSource.addFeature(feature);
    routePoints[0].address = address
    routePoints[0].feature = feature;
    this.setState({ routePoints: routePoints });
    this.displayNewRoute();
  }

  handleMapClick(longitude, latitude) {
    return getNearest(longitude, latitude)
      .then(([long, lat]) => coordinatesToLocation(lat, long))
      .then(response => {
        if (!response.address) {
          console.log(response.error)
          return;
        } else {
          const address = fromLocationIqResponse(response);
          var routePoints = this.state.routePoints;
          routePoints.push({ address: address, feature: null, displayName: response.display_name });
          this.setState({ routePoints: routePoints });
          if (this.state.isFromAddressEditable) {
            this.setState({ fromAddress: address }, this.updateMap(address));
          } else {
            this.setState({ toAddress: address }, this.updateMap(address));
          }
        }
      });
  }
  addNewRoutePoint(address) {
    const { longitude, latitude } = address;
    const feature = createPointFeature(longitude, latitude);
    this.vectorSource.addFeature(feature);
    var routePoints = this.state.routePoints;
    routePoints[routePoints.length - 1].feature = feature;
    this.setState({ routePoints: routePoints });
  }

  displayNewRoute() {
    let points = this.state.routePoints.map(a => a.address);
    if (points.length == 1 && this.state.routePolylineFeature) {
      this.vectorSource.removeFeature(this.state.routePolylineFeature);
      this.setState({ routePolylineFeature: null });
    } else {
      createRoute(points)
        .then(geometry => {
          if (this.state.routePolylineFeature) {
            this.vectorSource.removeFeature(this.state.routePolylineFeature);
          }
          const newRouteFeature = createRouteFeature(geometry)
          this.vectorSource.addFeature(newRouteFeature);
          this.setState({ routeGeometry: geometry, routePolylineFeature: newRouteFeature });
        });
    }
  }

  updateMap(address) {
    this.addNewRoutePoint(address);
    this.displayNewRoute();
  }

  // index => index of input field representing route point. Since First Route Point is office (and there is no input field for office) index must be incermented
  removeRoutePoint(index) {
    var routePoints = this.state.routePoints;

    this.vectorSource.removeFeature(this.state.routePoints[index + 1].feature);

    routePoints.splice(index + 1, 1);
    this.setState({ routePoints: routePoints }, this.displayNewRoute);
  }

  manageRoutePointInputs(e) {
    if (e) {
      if (!this.autocompleteInputs.includes(e.autocompleteElem)) {
        if (this.autocompleteInputs.length >= 1 && this.autocompleteInputs.length < this.state.routePoints.length) {
          this.autocompleteInputs[this.autocompleteInputs.length - 1].value = this.state.routePoints[this.autocompleteInputs.length].displayName;
        }
        if (this.autocompleteInputs.length === this.state.routePoints.length - 1) {
          e.autocompleteElem.value = "";
        }

        this.autocompleteInputs.push(e.autocompleteElem);
      }
    }
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

  render() {
    return (

      <div>
        {this.autocompleteInputs = []}
        <div className="displayRoutes">
          <DriverRouteInput
            onFromAddressChange={address => this.handleFromAddressChange(address)}
            onToAddressChange={address => this.handleToAddressChange(address)}
            onOfficeChange={address => this.handleOfficeChange(address)}
            clearVectorSource={() => { this.vectorSource.clear() }}
            clearRoutePoints={address => { this.setState({ routePoints: [address] }) }}
            setInitialFromAddress={address => this.setState({ initialFromAddress: address, initialToAddress: null })}
            setInitialToAddress={address => this.setState({ initialToAddress: address, initialFromAddress: null })}
            routePoints={this.state.routePoints}
            removeRoutePoint={index => this.removeRoutePoint(index)}
            ref={e => this.manageRoutePointInputs(e)}
          />

        </div>
        <div id="map"></div>
        {this.state.isRideSchedulerVisible ? (
          <RidesScheduler routeInfo={{
            fromAddress: this.state.isFromAddressEditable ? this.state.fromAddress : this.state.initialFromAddress,
            toAddress: this.state.isFromAddressEditable ? this.state.initialToAddress : this.state.toAddress,
            routeGeometry: this.state.routeGeometry
          }} />
        ) : null}
        <Button
          disabled={!this.state.fromAddress || !this.state.toAddress}
          className="continue-button"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ f: !this.state.isRideSchedulerVisible })}
        >
          Continue
        </Button>
      </div>
    );
  }
}

export default DriverMap;