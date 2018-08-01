// @flow
import React, { Component } from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "../styles/mapComponent.css";

export default class MapComponent extends Component<{}> {
  componentDidMount() {
    var map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 8
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: "map"
    });
    CenterMap(25.279652, 54.687157);
    function CenterMap(long, lat) {
      console.log("Long: " + long + " Lat: " + lat);
      map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(13);
    }
    function handleMapClick(evt)
    {
       var lonlat = map.getLonLatFromViewPortPx(evt.xy);
       // use lonlat
       alert(lonlat);
    } 
  }


  
  render() {
    return <div id="map" />;
  }
}
