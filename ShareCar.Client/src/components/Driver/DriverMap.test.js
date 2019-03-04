import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import DriverMap from "./DriverMap";

it("renders without crashing", () => {
    shallow(<DriverMap />);
});