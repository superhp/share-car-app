// @flow
import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import View from "ol/View";
import Feature from "ol/Feature";
import Tile from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";

import { centerMap, fromLonLatToMapCoords, fromMapCoordsToLonLat } from "../../utils/mapUtils";

import "../../styles/mapComponent.css";

export default class MapComponent extends React.Component<{}> {
  constructor(props) {
    super(props);
console.log(props)
    this.state = {
      coordinates: [],
      map: null,
      Vector: null
    };
  }

  // passes coordinates up to parent
  updateCoordinates() {
    this.props.onUpdate(this.state.coordinates);
  }

  // Shows passenger pick up point 
  setPassengersPickUpPoint(val, map) {
    centerMap(val[0], val[1], map);
    let xy = [];
    xy = transform(val, "EPSG:4326", "EPSG:3857");
    let vectorSource = this.state.Vector;
    const feature = new Feature(new Point(xy));

    vectorSource.clear();
    vectorSource.addFeature(feature);
  }

componentDidMount(){
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
}

  /*
  componentDidMount() {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({
        source: vectorSource
    });
    let map = new Map({
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
      target: "map",
      controls: []
    });
    this.setState({ map });
    this.setState({ Vector: vectorSource }, () => {
      this.setPassengersPickUpPoint(this.props.coordinates, map);
    });
    if (!this.props.driver) {
      map.on("click", function(evt) {
        // Allows passenger to set a single marker on a map

        const feature = new Feature(new Point(evt.coordinate));
        let lonlat = [];
        lonlat = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

        this.setState({ coordinates: lonlat });

        vectorSource.clear();
        vectorSource.addFeature(
          feature
        ); 
      });
    }

  }
*/
  render() {
    return (
      <div>
        {this.props.driver ? (
          <div id="map" />
        ) : (
          <div onClick={this.updateCoordinates.bind(this)} id="map" />
        )}
      </div>
    );
  }
}
