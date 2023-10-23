import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueCard from "../../src/CatalogueCard.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CatalogueCard",
  element: {
      "cab_name": "Testing",
      "cab_model": "123456",
      "number_of_seats": 2,
      "colour": "red",
      "features_amenities": "AC",
      "charging_time": "12345678",
      "range": 2345,
      "kms_driven": 12,
      "depot": "Golders Green",
      "shift": "Full Shift",
      "availability": true,
      "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/5euljm2lpezxxs5xqt8azcvpv85n?response-content-disposition=inline%3B%20filename%3D%22Login%20to%20book%25401x%25281%2529.jpg%22%3B%20filename%2A%3DUTF-8%27%27Login%2520to%2520book%25401x%25281%2529.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230802%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230802T104834Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e51e9957ad63ab9fb6d1ee10c6ef570383a76d634b2944b1e569408e7f9c0c3d"
    },
  datatestId: "cardBox",
  key: 0
};

const feature = loadFeature("./__tests__/features/CatalogueCard-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue Page", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    // let instance: CatalogueCard;

    given("I am a User loading catalogue Page", () => {
      exampleBlockA = shallow(<CatalogueCard {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      // instance = exampleBlockA.instance() as CatalogueCard;
      exampleBlockA = shallow(<CatalogueCard {...screenProps} />);
    });

    then("catalogue card list will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
     
    });


  });
});
