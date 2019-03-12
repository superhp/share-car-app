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
const initialId = 1;
export class DriverMap extends React.Component {  
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  setAutocompleteFieldValue = (value) => {
    this.child.setAutocomplete(value);
  };

  state = {
    isRideSchedulerVisible: false,
    isFromAddressEditable: true, // can the fromAddress be changed by clicking on the map?
    fromAddress: null,
    toAddress: OfficeAddresses[0],
    initialFromAddress: null,
    initialToAddress: OfficeAddresses[0],
    routeGeometry: null, // only needed to prevent duplicate calls for RidesScheduler
    routePoints: [{ address: OfficeAddresses[0], feature: null, id: initialId, displayName:"" }],
    routePolylineFeature: null
  };

  componentDidMount() {
    const { map, vectorSource } = this.initializeMap();
    this.map = map;
    this.vectorSource = vectorSource;
    this.updateMap();
  }

  handleFromAddressChange(newFromAddress) {
  
    if (!OfficeAddresses.some(a => a == newFromAddress)) {
     // this.autocompleteInput.value = addressToString(newFromAddress);
     this.setAutocompleteFieldValue(addressToString(newFromAddress));

      this.setState({ isFromAddressEditable: true });
    }
    this.setState({ fromAddress: newFromAddress }, this.updateMap);
    if (newFromAddress) centerMap(newFromAddress.longitude, newFromAddress.latitude, this.map);
  }

  handleToAddressChange(newToAddress) {
    if (!OfficeAddresses.some(a => a == newToAddress)) {
     // this.autocompleteInput.value = addressToString(newToAddress);
     this.setAutocompleteFieldValue(addressToString(newToAddress));
      this.setState({ isFromAddressEditable: false });
    }
    this.setState({ toAddress: newToAddress }, this.updateMap);
    if (newToAddress) centerMap(newToAddress.longitude, newToAddress.latitude, this.map);
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
          this.setAutocompleteFieldValue(response.display_name);

         // this.autocompleteInput.value = response.display_name;
          var routePoints = this.state.routePoints;
          routePoints.push({ address: address, feature: null, id: this.state.routePoints[this.state.routePoints.length - 1].id + 1, displayName:response.display_name });
          this.setState({routePoints: routePoints});
          if (this.state.isFromAddressEditable) {
            if (!this.state.fromAddress) {
              this.setState({ fromAddress: address }, this.updateMap);
            } else {
              var newToAddress = this.state.fromAddress;
              this.setState({ fromAddress: address, toAddress: newToAddress }, this.updateMap);

            }

          } else {

            if (!this.state.toAddress) {

              this.setState({ toAddress: address }, this.updateMap);
            } else {
              var newFromAddress = this.state.toAddress;
              this.setState({ toAddress: address, fromAddress: newFromAddress }, this.updateMap);

            }

          }
        }
      });
  }

  updateMap() {
    const { fromAddress, toAddress } = this.state;
    if (fromAddress) {
      const { longitude, latitude } = fromAddress;
      const feature = createPointFeature(longitude, latitude);
      this.vectorSource.addFeature(feature);

      if (!this.state.isFromAddressEditable) {
        var routePoints = this.state.routePoints;
        routePoints[routePoints.length - 1].feature = feature;
        this.setState({ routePoints: routePoints });
      }
    }
    if (toAddress) {
      const { longitude, latitude } = toAddress;
      const feature = createPointFeature(longitude, latitude);
      this.vectorSource.addFeature(feature);

      if (this.state.isFromAddressEditable) {
        var routePoints = this.state.routePoints;
        routePoints[routePoints.length - 1].feature = feature;
        this.setState({ routePoints: routePoints });
      }
    }
    if (fromAddress && toAddress) {
      let points = this.state.routePoints.map(a => a.address);

      createRoute(points)
        .then(geometry => {
          if (this.state.routePolylineFeature) {
            this.vectorSource.removeFeature(this.state.routePolylineFeature);
          }
          const newRouteFeature = createRouteFeature(geometry)
          this.vectorSource.addFeature(newRouteFeature);
          this.setState({ routeGeometry: geometry, routePolylineFeature: newRouteFeature })
        });
    }
  }

  removeRoutePoint(id) {
    var index = -1;
    var routePoints = this.state.routePoints;

    for (var i = 0; i < routePoints.length; i++) {
      if (routePoints[i].id == id) {
        index = i;
        console.log(routePoints[i].displayName)
        break;
      }
    }

    this.vectorSource.removeFeature(this.state.routePoints[index].feature);

    routePoints.splice(index, 1);
    this.setState({ routePoints: routePoints });

    this.updateMap();
    this.child.assignNamesToInputs();

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
        <div className="displayRoutes">
          <DriverRouteInput
            onRef={ref => (this.child = ref)}
            onFromAddressChange={address => this.handleFromAddressChange(address)}
            onToAddressChange={address => this.handleToAddressChange(address)}
            clearVectorSource={() => { this.vectorSource.clear() }}
            clearRoutePoints={address => { this.setState({ routePoints: [address] }) }}
            setInitialFromAddress={address => this.setState({ initialFromAddress: address, initialToAddress: null })}
            setInitialToAddress={address => this.setState({ initialToAddress: address, initialFromAddress: null })}
            routePoints={this.state.routePoints}
            removeRoutePoint={id => this.removeRoutePoint(id)}
            initialId = {initialId}
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