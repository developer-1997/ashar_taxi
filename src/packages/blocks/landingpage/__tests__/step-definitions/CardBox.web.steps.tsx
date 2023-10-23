import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CardBox from "../../src/CardBox.web";
const navigation = require("react-navigation");

let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
let mockLocation ={
  pathname:'/LandingPage'
}
const screenProps = {
  navigation: navigation,
  id: "CardBox",
  prop: {
    cab_name: "LEVC TXE Comfort Plus Electric - Automatic",
    cab_model: "E",
    number_of_seats: 4,
    features_amenities: "Black",
    charging_time: "One hour",
    range: 400,
    kms_driven: 1003,
    depot: "Golders Green",
    shift: "Monthly",
    availability: true,
    cab_image:
      "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/sugrbxax1g9ovhz6o4ktnpw4jex9?response-content-disposition=inline%3B%20filename%3D%22widerangetaxi.png%22%3B%20filename%2A%3DUTF-8%27%27widerangetaxi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230712%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T055846Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6f83ed2f545ed4d120476bd644709387be8a6e4e2424afc1f09ad00ff1d17d18"
  },
  history: mockHistory,
  location: mockLocation,
  match: mockMatch,
};

const feature = loadFeature(
  "./__tests__/features/CardBox-scenario.web.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let CardBoxBlock: ShallowWrapper;
    let instance: CardBox;

    given("I am a User loading LandingPage", () => {
      CardBoxBlock = shallow(<CardBox {...screenProps} />);
    });

    when("I navigate to the LandingPage", () => {
      instance = CardBoxBlock.instance() as CardBox;
    });

    then("I can see CardBox render successfully", () => {
      instance.componentDidMount();
      expect(CardBoxBlock).toBeTruthy();
      expect(CardBoxBlock.exists()).toBe(true);
    });
  });
});
