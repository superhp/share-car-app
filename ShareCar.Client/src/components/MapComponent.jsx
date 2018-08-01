// @flow
import React, { Component } from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import SourceVector from "ol/source/Vector";
import View from "ol/View";
import Feature from "ol/Feature";
import Icon from "ol/style/Icon";
import LayerVector from "ol/layer/Vector";
import Style from "ol/style/Style";
import TileLayer from "ol/layer/Tile";
import Tile from "ol/Tile";

import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Test from "ol/style/Text";
import "../styles/mapComponent.css";

export default class MapComponent extends Component<{}> {
  componentDidMount() {
    var 
    vectorSource = new SourceVector(),
    vectorLayer = new LayerVector({
      source: vectorSource
    }),
    map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 8
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: "map"
    });
  /*
*/
    /*  var 
      vectorSource = new SourceVector(),
      vectorLayer = new LayerVector({
        source: vectorSource
      }),
      olview = new View({
          center: [0, 0],
          zoom: 2,
          minZoom: 2,
          maxZoom: 20
      }),
      map = new Map({
          
        /*target: document.getElementById('map'),
          view: olview,
          layers: [
              new Tile({
                  style: 'Aerial',
                  source: new ol.source.MapQuest({ layer: 'osm' })
              }),
              vectorLayer
          ]
      })
  ;*/
  
  var iconStyle = new Style({
      image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: '//openlayers.org/en/v3.8.2/examples/data/icon.png'
      }),
      text: new Text({
          font: '12px Calibri,sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({
              color: '#fff', width: 2
          }),
          text: 'Some text'
      })
  });
  map.on('click', function(evt){
      var feature = new Feature(
          new Point(evt.coordinate)
      );
      console.log(vectorSource);
      var lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      var lon = lonlat[0];
      var lat = lonlat[1];
      
      vectorSource.addFeature(feature);
  });
  

/*
      map.on("singleclick", function(evt) {
        var lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(lonlat);
        var lon = lonlat[0];
        var lat = lonlat[1];
    });*/
  
    CenterMap(25.279652, 54.687157);
    function CenterMap(long, lat) {
      console.log("Long: " + long + " Lat: " + lat);
      map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(13);
    }
  }


  
  render() {
    return <div id="map" />;
  }
}
