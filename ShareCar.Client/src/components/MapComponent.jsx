// @flow
import * as React from "react";
import { transform } from "ol/proj";
import Map from "ol/Map";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import View from "ol/View";
import Feature from "ol/Feature";
import Icon from "ol/style/Icon";
import TileLayer from "ol/layer/Tile";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Polyline from "ol/format/Polyline";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

import "../styles/mapComponent.css";

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

  centerMapParent(val) {
    this.CenterMap(val.lng, val.lat, this.state.map);
  }
  /*
  displayRoute() {
    var vectorSource = this.state.Vector;

    var route = new Polyline({
      factor: 1e6
  }).readGeometry('mfp_I__vpASBG?u@FuBRiCRMMC?AAKAe@FyBTC@E?IDKDA@K@]BUBUBA?C?EBMHUBK@mAL{CZQ@qBRUBmAFc@@}@FAYCsCCqBCgBKoJCgBcDuAwAo@KEUKWMECe@Uk@WSSSGOIKCU?{@c@IBKDOHgEtBiAl@i@ZIDWLIm@AIQuACOQwAE_@Ic@]uBw@aFgAuHAKKo@?KAQ?KIuDQcH@eACeB?OCq@Ag@Ag@OuF?OAi@?c@@c@Du@r@cH@UBQ@K?E~@kJRyBf@uE@KFi@VoBFc@Da@@ETaC@QJ{@Ny@Ha@RiAfBuJF]DOh@yAHSf@aADIR_@\\q@N[@EPa@Zw@`@oA^gABIFUH[^sAJ_@Nq@Ps@DQRq@Ng@Pq@La@BKJYb@kAm@w@SYCCi@u@_AkAgAuAu@_AW]aBwBo@{@s@eAgAcBEE[]Jk@JmA?c@?QAQG]LKDEDCHOTm@^uA@Gb@wA`A_DJ[pAgCJSlAwBJSf@{@b@w@nAcCZq@LMLKRIFAL?J@HBFBp@XPHTJRHTJNFTRNFd@N\\HF@J@J@@V?N@rA@dB', {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
  });
  console.log(route);
  var feature = new Feature({
    type: 'route',
    geometry: route
  });
  console.log("===" + vectorSource);

/*
  var styles = {
    route: new Style({
      stroke: new Stroke({
        width: 6, color: [40, 40, 40, 0.8]
      })
    }),
    icon: new Style({
      image: new Icon({
        anchor: [0.5, 1]
            })
    })
  };

console.log(vectorSource);

  feature.setStyle(styles.route);

  vectorSource.addFeature();
  }
*/
  // Shows passenger pick up point for a driver
  setPassengersPickUpPoint(val) {
    this.CenterMap(val[0], val[1], this.state.map);
    var xy = [];
    xy = transform(val, "EPSG:4326", "EPSG:3857");
    console.log(xy);
    var vectorSource = this.state.Vector;

    var feature = new Feature(new Point(xy));

    vectorSource.clear();
    vectorSource.addFeature(feature);
  }

  componentDidMount() {
    var component = this;
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
    this.setState({ map: map });
    this.setState({ Vector: vectorSource });
    if (!this.props.driver) {
      map.on("click", function(evt) {
        // Allows passenger to set a dingle marker on a map

        var feature = new Feature(new Point(evt.coordinate));
        console.log(vectorSource);
        var lonlat = [];
        lonlat = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

        component.setState({ coordinates: lonlat });

        vectorSource.clear();
        vectorSource.addFeature(
          feature
        ); /*
        var route = new Polyline({
          factor: 1e6
      }).readGeometry('mfp_I__vpASBG?u@FuBRiCRMMC?AAKAe@FyBTC@E?IDKDA@K@]BUBUBA?C?EBMHUBK@mAL{CZQ@qBRUBmAFc@@}@FAYCsCCqBCgBKoJCgBcDuAwAo@KEUKWMECe@Uk@WSSSGOIKCU?{@c@IBKDOHgEtBiAl@i@ZIDWLIm@AIQuACOQwAE_@Ic@]uBw@aFgAuHAKKo@?KAQ?KIuDQcH@eACeB?OCq@Ag@Ag@OuF?OAi@?c@@c@Du@r@cH@UBQ@K?E~@kJRyBf@uE@KFi@VoBFc@Da@@ETaC@QJ{@Ny@Ha@RiAfBuJF]DOh@yAHSf@aADIR_@\\q@N[@EPa@Zw@`@oA^gABIFUH[^sAJ_@Nq@Ps@DQRq@Ng@Pq@La@BKJYb@kAm@w@SYCCi@u@_AkAgAuAu@_AW]aBwBo@{@s@eAgAcBEE[]Jk@JmA?c@?QAQG]LKDEDCHOTm@^uA@Gb@wA`A_DJ[pAgCJSlAwBJSf@{@b@w@nAcCZq@LMLKRIFAL?J@HBFBp@XPHTJRHTJNFTRNFd@N\\HF@J@J@@V?N@rA@dB', {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
      });


console.log(route);


      var feature = new Feature({
        type: 'route',
        geometry: route
      });
      var style = new Style({
        fill: new Fill({ color: '#0091ea', weight: 10 }),
        stroke: new Stroke({ color: '#0091ea', width: 6 })
    });

feature.setStyle(style);

      vectorSource.addFeature(feature);
        console.log('+++' + vectorSource);

*/
      });
    }
    this.CenterMap(25.279652, 54.687157, map);
  }

  CenterMap(long, lat, map) {
    console.log("Long: " + long + " Lat: " + lat);
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
