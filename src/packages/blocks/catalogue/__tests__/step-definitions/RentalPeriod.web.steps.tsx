import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import RentalPeriod from "../../src/RentalPeriod.web";

const screenProps = {
    depotCheck:"Hackney", 
    handleRentalPeriodMenuClose:jest.fn(),
    handleDepotChange : jest.fn(),
    handleSearch: jest.fn(),
    handleConfirm: jest.fn(),
    handleDateRangeClean : jest.fn(),
    tempDepotCheck:'Hackney',
    startDate: "",
    endDate: "",
    handleDateRangeSelect : jest.fn(),
    rentalPriceFilter : {},
    rentalTimeFilter : {},
    shiftCheck: ""
};

const feature = loadFeature("./__tests__/features/RentalPeriod-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue Page with RentalPeriod", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    given("I am a User loading catalogue Page with RentalPeriod", () => {
      exampleBlockA = shallow(<RentalPeriod nearestLocation={""} {...screenProps} />);
    });

    when("I navigate to the catalogue with RentalPeriod", () => {
      exampleBlockA = shallow(<RentalPeriod nearestLocation={""} {...screenProps} />);
    });

    then("Rental Period Search list will load with out errors", () => {
      expect(exampleBlockA.exists()).toBe(true);
     
    });


  });
});
