import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import DriverMap from "../components/Driver/DriverMap";

it("renders without crashing", () => {
    shallow(<DriverMap />);
});

it("directly handles from address change", () => {
    const address = {
        number: "59",
        street: "Didlaukio g.",
        city: "Vilnius",
        country: "Lithuania",
        latitude: 54.7275,
        longitude: 25.2802
    }
    const driverWrapper = shallow(<DriverMap />);
    const inputField = {value: null};
    fetch.mockResponse();
    
    driverWrapper.instance().autocompleteInput = inputField;
    driverWrapper.instance().handleFromAddressChange(address);

    expect(driverWrapper.state("isFromAddressEditable")).toBe(true);
    expect(driverWrapper.state("fromAddress")).toBe(address);
    expect(fetch).toBeCalled();
});