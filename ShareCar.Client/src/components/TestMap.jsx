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
import {fromLonLat} from "ol/proj";
//import * as ol from "ol";

export class test extends React.Component {

state = {
  points :[],
  coordiantes : [],
  route : "",
  utils:"",
  map :"",
  accessToken : "ad45b0b60450a4",

}

coordinatesToLocation(latitude, longtitude){
//https://eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat=54.687195281637855&lon=25.27815111311289&format=json
return new Promise(function(resolve, reject) {
  //make sure the coord is on street
  fetch('//eu1.locationiq.com/v1/reverse.php?key=ad45b0b60450a4&lat='+latitude+'&lon='+longtitude+'&format=json'
   ).then(function(response) { 
    return response.json();
  }).then(function(json) {
  if (true/*json.code === 'Ok'*/) 
    {
      console.log('===================in promise');
      console.log(json);
    resolve(json);
  }
    else reject();

  });
});
}

  addressInputSuggestion(component, utils){
var places = require("places.js");
var placesAutocompleteFrom = places({
  container: document.querySelector("#address-input-from")
});
var placesAutocompleteTo = places({
  container: document.querySelector("#address-input-to")
});
placesAutocompleteFrom.on("change", (e) =>{
  this.CenterMap(e.suggestion.latlng.lng, e.suggestion.latlng.lat, this.state.map);
  this.add(utils, [e.suggestion.latlng.lng, e.suggestion.latlng.lat], component, '//cts-maps.northeurope.cloudapp.azure.com/maps/route/v1/driving/');
});

}
CenterMap(long, lat, map) {

  map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(19);
}
add(utils, evt, component, url_osrm_route){
  
console.log(evt);

  utils.getNearest(evt/*.coordinate*/).then(function(coord_street){
    var last_point = component.state.points[component.state.points.length - 1];
    var points_length = component.state.points.push(coord_street);
    utils.createFeature(coord_street);

    if (points_length < 2) {
   //   msg_el.innerHTML = 'Click to add another point';
      return;
    }

    //get the route
    var point1 = last_point.join();
    var point2 = coord_street.join();
    

    fetch(url_osrm_route + point1 + ';' + point2).then(function(r) { 

      return r.json();
    }).then(function(json) {
      if(json.code !== 'Ok') {
     //   msg_el.innerHTML = 'No route found.';
        return;
      }
    //  msg_el.innerHTML = 'Route added';
      //points.length = 0;

component.setState({coordiantes : [point1, point2], route : json.routes[0].geometry});



      utils.createRoute(json.routes[0].geometry);
    });
  });
}



    componentDidMount(){

this.coordinatesToLocation(54.687195281637855,25.27815111311289).then(function(e){
  console.log('===================out of promise');
  console.log(e);
});

//var points = [];
    var msg_el = document.getElementById('msg'),

    url_osrm_nearest = '//cts-maps.northeurope.cloudapp.azure.com/maps/nearest/v1/driving/',
    url_osrm_route = '//cts-maps.northeurope.cloudapp.azure.com/maps/route/v1/driving/',
    icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
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

this.setState({map});

this.CenterMap(25.279652, 54.687157, map);

  var component = this;

map.on('click', (evt) =>
{
   var coord4 = transform([
    parseFloat(evt.coordinate[0]), parseFloat(evt.coordinate[1])
  ], 'EPSG:3857', 'EPSG:4326');
this.add(utils, coord4, component, url_osrm_route);
} 
/* utils.getNearest(evt.coordinate).then(function(coord_street){
    var last_point = component.state.points[component.state.points.length - 1];
    var points_length = component.state.points.push(coord_street);

    utils.createFeature(coord_street);

    if (points_length < 2) {
      msg_el.innerHTML = 'Click to add another point';
      return;
    }

    //get the route
    var point1 = last_point.join();
    var point2 = coord_street.join();
    

    fetch(url_osrm_route + point1 + ';' + point2).then(function(r) { 
      return r.json();
    }).then(function(json) {
      if(json.code !== 'Ok') {
        msg_el.innerHTML = 'No route found.';
        return;
      }
      msg_el.innerHTML = 'Route added';
      //points.length = 0;

component.setState({coordiantes : [point1, point2], route : json.routes[0].geometry});



      utils.createRoute(json.routes[0].geometry);
    });
  });*/
);

var utils = {
  getNearest: function(coord){

   // var coord4326 = utils.to4326(coord);    
  var coord4326 = coord;
   console.log(coord4326);
    return new Promise(function(resolve, reject) {
      //make sure the coord is on street
      fetch(url_osrm_nearest + coord4326.join()).then(function(response) { 
        return response.json();
      }).then(function(json) {
        if (json.code === 'Ok') 
        {
        resolve(json.waypoints[0].location);
        }
        else reject();
      });
    });
  },
  createFeature: function(coord) {
    var feature = new Feature({
      type: 'place',
      geometry: new Point(fromLonLat(coord))
    });
    feature.setStyle(styles.icon);
    vectorSource.addFeature(feature);
  },
  createRoute: function(polyline) {
    // route is ol.geom.LineString
    console.log("create route - polyline " + polyline);
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
    feature.setStyle(styles.route);
    vectorSource.addFeature(feature);
  },
  to4326: function(coord) {
    return transform([
      parseFloat(coord[0]), parseFloat(coord[1])
    ], 'EPSG:3857', 'EPSG:4326');
  }
};
this.addressInputSuggestion(this, utils);
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


