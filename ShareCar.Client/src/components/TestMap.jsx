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

    componentDidMount(){
        
var points = [];
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
          width: 20, color: [40, 40, 40, 0.8]
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

map.on('click', function(evt){
  utils.getNearest(evt.coordinate).then(function(coord_street){
    var last_point = points[points.length - 1];
    var points_length = points.push(coord_street);

    utils.createFeature(coord_street);

    if (points_length < 2) {
      msg_el.innerHTML = 'Click to add another point';
      return;
    }

    //get the route
    var point1 = last_point.join();
    var point2 = coord_street.join();
    console.log(point1);
    console.log(point2);

    fetch(url_osrm_route + point1 + ';' + point2).then(function(r) { 
      return r.json();
    }).then(function(json) {
      if(json.code !== 'Ok') {
        msg_el.innerHTML = 'No route found.';
        return;
      }
      msg_el.innerHTML = 'Route added';
      console.log('route added' + json.routes[0].geometry);
      //points.length = 0;
      utils.createRoute(json.routes[0].geometry);
    });
  });
});

var utils = {
  getNearest: function(coord){

    var coord4326 = utils.to4326(coord);    
    console.log(coord4326);
    return new Promise(function(resolve, reject) {
      //make sure the coord is on street
      fetch(url_osrm_nearest + coord4326.join()).then(function(response) { 
        // Convert to JSON
        return response.json();
      }).then(function(json) {
        if (json.code === 'Ok') resolve(json.waypoints[0].location);
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
    console.log(feature);
    feature.setStyle(styles.route);
    vectorSource.addFeature(feature);
  },
  to4326: function(coord) {
    return transform([
      parseFloat(coord[0]), parseFloat(coord[1])
    ], 'EPSG:3857', 'EPSG:4326');
  }
};
}


render() {
    return (
        <div>

<div id="map"></div>
<div id="msg">Click to add a point.</div>
         

        </div>

        );

}
}
export default test;


