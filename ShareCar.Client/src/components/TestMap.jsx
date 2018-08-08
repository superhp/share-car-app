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
//import * as ol from "ol";

export class test extends React.Component {

  state = {
    points: [],
    coordinates: {
      firstPoint: [],
      lastPoint: []
    },
    route: "",
    utils: "",
    map: "",
    accessToken: "ad45b0b60450a4",
    vectorSource: "",
    startPointInput: false,// If marker on a map was added by writing an address, it should be known if it was From or To input field
    features: { // markers on a map
      startPointFeature: "", 
      destinationFeature: ""
    },
    routeFeature:"",
    url_osrm_nearest : '//cts-maps.northeurope.cloudapp.azure.com/maps/nearest/v1/driving/',
    url_osrm_route : '//cts-maps.northeurope.cloudapp.azure.com/maps/route/v1/driving/'
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
    var inputField = document.querySelector("#address-input-from");
    inputField.value = value;
  }

  setInputTo(value) {
    var inputField = document.querySelector("#address-input-to");
    inputField.value = value;
  }

  addressInputSuggestion(utils) {
    var places = require("places.js");
  
    var placesAutocompleteFrom = places({
      container: document.querySelector("#address-input-from")
    });

    var placesAutocompleteTo = places({
      container: document.querySelector("#address-input-to")
    });



    placesAutocompleteFrom.on("change", (e) => {
      this.setState({startPointInput : true});
      this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
      this.addRoutePoint(utils, [e.suggestion.latlng.lng, e.suggestion.latlng.lat], false);
    });

    placesAutocompleteTo.on("change", (e) => {
      this.setState({startPointInput : false});
      this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
      this.addRoutePoint(utils, [e.suggestion.latlng.lng, e.suggestion.latlng.lat], false);
    });


  }
  CenterMap(long, lat, map) {

    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(19);
  }

  addRoutePoint(utils, evt, clickedOnMap) {

    utils.getNearest(evt).then((coord_street) => {
      var points_length = this.state.points.push(coord_street);

      if (clickedOnMap) {
        if (points_length > 1) {
          if (this.state.features.destinationFeature) {
            this.state.vectorSource.removeFeature(this.state.features.destinationFeature);
          }
          
          this.setState({ coordinates: { firstPoint: this.state.coordinates.firstPoint, lastPoint: coord_street } });
        
          this.coordinatesToLocation(coord_street[1],coord_street[0]).then((e)=>{
            console.log(e);
            this.setInputTo(e.display_name);
          });
          utils.createFeature(coord_street, false);
        
        }
        else {
          
          this.setState({ coordinates: { firstPoint: coord_street, lastPoint: [] } });
         
          this.coordinatesToLocation(coord_street[1],coord_street[0]).then((e)=>{
            this.setInputFrom(e.display_name);
          });
         
          utils.createFeature(coord_street, true);

        }

      }
      else if (this.state.startPointInput) {
        if (this.state.features.startPointFeature) {
          this.state.vectorSource.removeFeature(this.state.features.startPointFeature)
        }
        this.setState({ coordinates: { firstPoint: coord_street, lastPoint: this.state.coordinates.lastPoint } });


        utils.createFeature(coord_street, true);
      }
      else {
        if (this.state.features.destinationFeature) {

          this.state.vectorSource.removeFeature(this.state.features.destinationFeature)
        }

        this.setState({ coordinates: { firstPoint: this.state.coordinates.firstPoint, lastPoint: coord_street } });

        utils.createFeature(coord_street, false);

      }



      if (points_length < 2) { // only one point on a map, impossible to display route
        return;
      }

      //get the route

      var point1 = this.state.coordinates.firstPoint;//last_point.join();
      var point2 = this.state.coordinates.lastPoint;//coord_street.join();

      console.log(this.state.vectorSource.getFeatures());
      console.log(this.state.features);

      fetch(this.state.url_osrm_route + point1 + ';' + point2).then(function (r) {

        return r.json();
      }).then(function (json) {
        if (json.code !== 'Ok') {
          return;
        }


     //   this.setState({ coordinates: [point1, point2], route: json.routes[0].geometry });



        utils.createRoute(json.routes[0].geometry);
      });
    });
  }

  componentDidMount() {

    var  icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
   
      vectorSource = new SourceVector(),
      vectorLayer = new LayerVector({
        source: vectorSource
      }),
      styles = {
        route: new Style({
          stroke: new Stroke({
            width: 6, color: [40, 40, 40, 0.8]
          })
        }),
        icon: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: icon_url
          })
        })
      };
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

    var component = this;

    map.on('click', (evt) => {
      var coord4326 = transform([
        parseFloat(evt.coordinate[0]), parseFloat(evt.coordinate[1])
      ], 'EPSG:3857', 'EPSG:4326');

      this.addRoutePoint(utils, coord4326, true);
    }
    );

    var utils = {
      getNearest:  (coord)=> {

        return new Promise( (resolve, reject)=> {
          //make sure the coord is on street
          fetch(this.state.url_osrm_nearest + coord.join()).then( (response)=> {
            return response.json();
          }).then(function (json) {
            if (json.code === 'Ok') {
              resolve(json.waypoints[0].location);
            }
            else reject();
          });
        });
      },
      createFeature: (coord, fromFeature) => { // fromFeature param indicates which feature is added - start point or destination
        var feature = new Feature({
          type: 'place',
          geometry: new Point(fromLonLat(coord))
        });
        feature.setStyle(styles.icon);

        vectorSource.addFeature(feature);
console.log(fromFeature);
        if (fromFeature)
          this.setState({ features: { startPointFeature: feature, destinationFeature: this.state.features.destinationFeature } });
        else
          this.setState({ features: { startPointFeature: this.state.features.startPointFeature, destinationFeature: feature } });
console.log(this.state.features);

      },
      createRoute: (polyline)=> {
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
if(this.state.routeFeature){
this.state.vectorSource.removeFeature(this.state.routeFeature) // removes old route from map
}
        feature.setStyle(styles.route);
        vectorSource.addFeature(feature);
        this.setState({routeFeature : feature});
      },
      to4326: function (coord) {
        return transform([
          parseFloat(coord[0]), parseFloat(coord[1])
        ], 'EPSG:3857', 'EPSG:4326');
      }
    };
    this.addressInputSuggestion(utils);
  }


  render() {
    return (
      <div>

        <div className="form-group">
          <label>From:</label>
          <input
            type="search"
            class="form-group"
            id="address-input-from"
            placeholder="Select From Location..."
          />
        </div>
        <div className="form-group">
          <label>To:</label>
          <input
            type="search"
            class="form-group"
            id="address-input-to"
            placeholder="Select To Location..."

          />
        </div>
        <button>Save</button>

        <div id="map"></div>
        <div id="msg">Click to add a point.</div>


      </div>

    );

  }
}
export default test;


