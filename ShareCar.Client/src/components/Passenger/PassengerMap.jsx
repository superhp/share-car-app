import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";

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
import {SnackbarVariants} from "../common/SnackbarVariants";


export class PassengerMap extends React.Component {
  state = {
    passengerAddress: null,
    direction: "from",
    routes: [],
    currentRouteIndex: 0,
    showDriver: false,
    snackBarMessage: "",
    snackBarClick: false,
    snackBarVariant: "",
  }

  componentDidMount() {
    const { map, vectorSource } = this.initializeMap();
    this.map = map;
    this.vectorSource = vectorSource;
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

  updateMap() {
    this.setState({ showDriver: true });
    this.vectorSource.clear();
    const { passengerAddress } = this.state;
    if (passengerAddress) {
      const { longitude, latitude } = passengerAddress;
      this.vectorSource.addFeature(createPointFeature(longitude, latitude));
    }
    if (this.state.routes.length > 0) {
      this.vectorSource.addFeature(createRouteFeature(this.state.routes[this.state.currentRouteIndex].geometry));
    }
  }

  handleMapClick(longitude, latitude) {
    getNearest(longitude, latitude)
      .then(([long, lat]) => coordinatesToLocation(lat, long))
      .then(response => {
        const address = fromLocationIqResponse(response);
        this.autocompleteInput.value = response.display_name;
        this.setState({ passengerAddress: address }, this.updateMap);
      });
  }

  onMeetupAddressChange(newAddress) {
    this.autocompleteInput.value = addressToString(newAddress);
    this.setState({ passengerAddress: newAddress }, this.updateMap);
    if (newAddress) centerMap(newAddress.longitude, newAddress.latitude, this.map);
  }

  getAllRoutes(address, direction) {
    let routeDto;
    this.setState({ direction: direction });
    if (direction === "to")
      routeDto = { AddressTo: address };
    else
      routeDto = { AddressFrom: address };

    api.post("https://localhost:44347/api/Ride/routes", routeDto).then(res => {
      if (res.status === 200 && res.data !== "") {
        this.setState({ routes: res.data }, this.updateMap);
      }
    });
  }

  handleRegister(ride) {
    if (!this.state.passengerAddress) {
      this.setState({
        snackBarClicked: true,
        snackBarMessage: "Choose your pick up point",
        snackBarVariant: SnackbarVariants[2]
      });
      setTimeout(
        function () {
          this.setState({ snackBarClicked: false });
        }.bind(this),
        3000
      );
    }
    else {
      const request = {
        RideId: ride.rideId,
        DriverEmail: ride.driverEmail,
        Longtitude: this.state.passengerAddress.longitude,
        Latitude: this.state.passengerAddress.latitude
      };

      api.post(`https://localhost:44347/api/RideRequest`, request).then(res => {
        alert("ok");
      });
    }
  }

  render() {
    return (
      <div>
        <div className="passengerForm">
          <PassengerRouteSelection
            direction={this.state.direction}
            initialAddress={OfficeAddresses[0]}
            onChange={(address, direction) => this.getAllRoutes(address, direction)}
            onMeetupAddressChange={address => this.onMeetupAddressChange(address)}
            ref={e => {
              if (e) {
                this.autocompleteInput = e.autocompleteElem;
              }
            }}
          />
          {this.state.showDriver && this.state.routes.length > 0 ? (
            <DriverRoutesSugestions
              rides={this.state.routes[this.state.currentRouteIndex].rides}
              onRegister={ride => this.handleRegister(ride)}
            />
          ) : (
              <div></div>
            )}
        </div>
        <div id="map"></div>
        {this.state.routes.length > 1
          ? <div>
            <PassengerNavigationButton
              onClick={() => this.setState({
                currentRouteIndex: (this.state.currentRouteIndex - 1 + this.state.routes.length) % this.state.routes.length
              },
                this.updateMap
              )}
              text="View Previous Route"
            />
            <PassengerNavigationButton
              onClick={() => this.setState({
                currentRouteIndex: (this.state.currentRouteIndex + 1) % this.state.routes.length
              },
                this.updateMap
              )}
              text="View Next Route"
            />

          </div>
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