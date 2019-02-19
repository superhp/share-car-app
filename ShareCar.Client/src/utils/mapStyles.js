import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

const PLACE_ICON = "http://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png";

export const routeStyles = {
    route: new Style({
        stroke: new Stroke({
        width: 6,
        color: [40, 40, 40, 0.8]
        })
    }),
    icon: new Style({
        image: new Icon({
        anchor: [0.5, 1],
        src: PLACE_ICON
        })
    })
};

export const selectedRouteStyle = {
    route: new Style({
      stroke: new Stroke({
        width: 6,
        color: [0, 200, 0, 0.8]
      }),
      zIndex: 10
    })
};