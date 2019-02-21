// @flow
import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import View from "ol/View";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import "../../styles/mapComponent.css";

export default class MapComponent extends React.Component<{}> {
  constructor(props) {
    super(props);

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

  centerMapParent(value) {
    this.CenterMap(value.lng, value.lat, this.state.map);
  }

  // Shows passenger pick up point 
  setPassengersPickUpPoint(val, map) {
    this.CenterMap(val[0], val[1], map);
    var xy = [];
    xy = transform(val, "EPSG:4326", "EPSG:3857");
    var vectorSource = this.state.Vector;

    var feature = new Feature(new Point(xy));

    vectorSource.clear();
    vectorSource.addFeature(feature);
  }

  componentDidMount() {
    var vectorSource = new SourceVector(),
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

        var feature = new Feature(new Point(evt.coordinate));
        var lonlat = [];
        lonlat = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

        this.setState({ coordinates: lonlat });

        vectorSource.clear();
        vectorSource.addFeature(
          feature
        ); 
      });
    }

  }

  CenterMap(long, lat, map) {
    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(19);
  }

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
