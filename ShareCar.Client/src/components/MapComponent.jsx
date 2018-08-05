// @flow
import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import SourceVector from "ol/source/Vector";
import View from "ol/View";
import Feature from "ol/Feature";
import Icon from "ol/style/Icon";
import LayerVector from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Polyline from "ol/format/Polyline";
//import styles from "ol/styles";
import "../styles/mapComponent.css";

export default class MapComponent extends React.Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      map: "",
      Vector: ""
    }

  }

  // passes coordinates up to parent
  updateCoordinates() {
    this.props.onUpdate(this.state.coordinates);
  };

  centerMapParent(val) {

    this.CenterMap(val.lng, val.lat, this.state.map);
  }

  displayRoute() {
    var vectorSource = this.state.Vector;

    var route = new Polyline({
      factor: 1e6
  }).readGeometry('mfp_I__vpASBG?u@FuBRiCRMMC?AAKAe@FyBTC@E?IDKDA@K@]BUBUBA?C?EBMHUBK@mAL{CZQ@qBRUBmAFc@@}@FAYCsCCqBCgBKoJCgBcDuAwAo@KEUKWMECe@Uk@WSSSGOIKCU?{@c@IBKDOHgEtBiAl@i@ZIDWLIm@AIQuACOQwAE_@Ic@]uBw@aFgAuHAKKo@?KAQ?KIuDQcH@eACeB?OCq@Ag@Ag@OuF?OAi@?c@@c@Du@r@cH@UBQ@K?E~@kJRyBf@uE@KFi@VoBFc@Da@@ETaC@QJ{@Ny@Ha@RiAfBuJF]DOh@yAHSf@aADIR_@\\q@N[@EPa@Zw@`@oA^gABIFUH[^sAJ_@Nq@Ps@DQRq@Ng@Pq@La@BKJYb@kAm@w@SYCCi@u@_AkAgAuAu@_AW]aBwBo@{@s@eAgAcBEE[]Jk@JmA?c@?QAQG]LKDEDCHOTm@^uA@Gb@wA`A_DJ[pAgCJSlAwBJSf@{@b@w@nAcCZq@LMLKRIFAL?J@HBFBp@XPHTJRHTJNFTRNFd@N\\HF@J@J@@V?N@rA@dB', {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
  });
  console.log(route);
  var feature = new Feature(route);
  //feature.setStyle(styles.route);

  vectorSource.addFeature();
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


    this.setState({ map: map });
    this.setState({ Vector: vectorSource })
    if (!this.props.driver) {
      map.on('click', function (evt) {
        var feature = new Feature(
          new Point(evt.coordinate)
        );
        console.log(vectorSource);
        var lonlat = [];
        lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

        component.setState({ coordinates: lonlat });

        vectorSource.clear();
        vectorSource.addFeature(feature);
      });

      this.CenterMap(25.279652, 54.687157, map);

    }

     this.displayRoute();

  }

  CenterMap(long, lat, map) {
    console.log("Long: " + long + " Lat: " + lat);
    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(19);

  }

  render() {
    return (
      <div>
        {
          this.props.driver
            ? <div id="map" />
            : <div onClick={this.updateCoordinates.bind(this)} id="map" />

        }
      </div>
    );
  }
}
