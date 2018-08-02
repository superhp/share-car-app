// @flow
import * as React from "react";
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

export default class MapComponent extends React.Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      map:"",
      Vector:""
    }
  
}

// passes coordinates up to parent
 updateCoordinates(){
    this.props.onUpdate(this.state.coordinates);
  };

centerMapParent(val){

  this.CenterMap(val.lng,val.lat,this.state.map);
}

  setPassengersPickUpPoint(val) {   
     this.CenterMap(val[0], val[1], this.state.map);
     var xy = [];
     xy = transform(val, 'EPSG:4326', 'EPSG:3857');
     console.log(xy);
    var vectorSource = this.state.Vector; 

    var feature = new Feature(
      new Point(xy)
  );

  vectorSource.clear();
  vectorSource.addFeature(feature);

  }

  componentDidMount() {
    var component = this;
    console.log(this.props.pickUpPoint);
    var 
    vectorSource = new SourceVector(),
    vectorLayer = new LayerVector({
      source: vectorSource
    }),
    map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 19
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: "map"
    });

  
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


this.setState({map:map});
this.setState({Vector: vectorSource})
if(!this.props.driver){
  map.on('click', function(evt){
      var feature = new Feature(
          new Point(evt.coordinate)
      );
      console.log(vectorSource);
      var lonlat = [];
      lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

     component.setState({coordinates : lonlat});

      vectorSource.clear();
      vectorSource.addFeature(feature);
  });

   this.CenterMap(25.279652, 54.687157, map);

  }}

       CenterMap(long, lat,map) {
      console.log("Long: " + long + " Lat: " + lat);
      map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(19);

    }
  
  render() {
    return(
    <div>
      {
        this.props.driver
        ? <div id="map" />
        :<div onClick={this.updateCoordinates.bind(this)} id="map" />
        
      }
     </div>
    ); 
  }
}
