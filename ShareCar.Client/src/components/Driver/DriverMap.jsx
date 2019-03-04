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
  createRoute, centerMap } from "./../../utils/mapUtils";
import { routeStyles } from "./../../utils/mapStyles";
import {addressToString, fromLocationIqResponse} from "../../utils/addressUtils";

import "./../../styles/testmap.css";

export class DriverMap extends React.Component {
  state = {
    isRideSchedulerVisible: false,
    isFromAddressEditable: true, // can the fromAddress be changed by clicking on the map?
    fromAddress: null,
    toAddress: OfficeAddresses[0],
    routeGeometry: null // only needed to prevent duplicate calls for RidesScheduler
  };
  
  componentDidMount() {
    const {map, vectorSource} = this.initializeMap();
    this.map = map;
    this.vectorSource = vectorSource;
    this.updateMap();
  }

  handleFromAddressChange(newFromAddress) {
    if (!OfficeAddresses.some(a => a == newFromAddress)) {
      this.autocompleteInput.value = addressToString(newFromAddress);
      this.setState({isFromAddressEditable: true});
    }
    this.setState({fromAddress: newFromAddress}, this.updateMap);
    if(newFromAddress) centerMap(newFromAddress.longitude, newFromAddress.latitude, this.map);
  }

  handleToAddressChange(newToAddress) {
    if (!OfficeAddresses.some(a => a == newToAddress)) {
      this.autocompleteInput.value = addressToString(newToAddress);
      this.setState({isFromAddressEditable: false});
    }
    this.setState({toAddress: newToAddress}, this.updateMap);
    if(newToAddress) centerMap(newToAddress.longitude, newToAddress.latitude, this.map);
  }

  handleMapClick(longitude, latitude) {
    getNearest(longitude, latitude)
      .then(([long, lat]) => coordinatesToLocation(lat, long))
      .then(response => {
        const address = fromLocationIqResponse(response);
        this.autocompleteInput.value = response.display_name;
        if(this.state.isFromAddressEditable) {
          this.setState({fromAddress: address}, this.updateMap);
        } else {
          this.setState({toAddress: address}, this.updateMap);
        }
      });
  }

  updateMap() {
    this.vectorSource.clear();
    const {fromAddress, toAddress} = this.state;
    if (fromAddress) {
      const {longitude, latitude} = fromAddress;
      this.vectorSource.addFeature(createPointFeature(longitude, latitude));
    }
    if (toAddress) {
      const {longitude, latitude} = toAddress;
      this.vectorSource.addFeature(createPointFeature(longitude, latitude));
    }
    if (fromAddress && toAddress) {
      createRoute(fromAddress, toAddress)
        .then(geometry => {
          this.vectorSource.addFeature(createRouteFeature(geometry));
          this.setState({routeGeometry: geometry})
        });
    }
  }

  initializeMap() {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({source: vectorSource});
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
    return {map, vectorSource};
  }

  render() {
    return (
      <div>
        <div className="displayRoutes">
            <DriverRouteInput 
              onFromAddressChange={address => this.handleFromAddressChange(address)}
              onToAddressChange={address => this.handleToAddressChange(address)}
              ref={e => {
                if (e) {
                  this.autocompleteInput = e.autocompleteElem;
                }
              }}
            />
        </div>
        <div id="map"></div>
        {this.state.isRideSchedulerVisible ? (
          <RidesScheduler routeInfo={{
            fromAddress: this.state.fromAddress,
            toAddress: this.state.toAddress,
            routeGeometry: this.state.routeGeometry
          }} />
        ) : null}
        <Button
          disabled={!this.state.fromAddress || !this.state.toAddress}
          className="continue-button"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ isRideSchedulerVisible: !this.state.isRideSchedulerVisible })}
        >
          Continue
        </Button>
      </div>
    );
  }
}

export default DriverMap;