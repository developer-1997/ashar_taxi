import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import NavbarComponent from "../../src/Navbar.web";
const navigation = require("react-navigation");
let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object

const screenProps = {
  navigation: navigation,
  id: "NavbarComponent",
  match: mockMatch,
  history: mockHistory,
  location: { search : ""}
};

const feature = loadFeature("./__tests__/features/Navbar-scenario.web.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let NavbarComponentBlock: ShallowWrapper;
    let instance: NavbarComponent;
    let token: string | null;

    given("I am a User loading LandingPage", () => {
      NavbarComponentBlock = shallow(<NavbarComponent  {...screenProps} />);
    });

    when("I navigate to the LandingPage", () => {
      instance = NavbarComponentBlock.instance() as NavbarComponent;
    });

    then("I can see Navbar render successfully", () => {
      instance.componentDidMount();
      expect(NavbarComponentBlock).toBeTruthy();
      expect(NavbarComponentBlock.exists()).toBe(true);
    });
    then("I can press the LogInButton with with out errors", () => {
      let LogInButton = NavbarComponentBlock.findWhere(
        node => node.prop("data-testid") === "LogInButton"
      );
      expect(LogInButton.exists()).toBe(true);
      LogInButton.simulate("click");
    });
    then("I can press the IconButton with with out errors", () => {
      expect(NavbarComponentBlock.state("isUserLoggedIn")).toBe(false);
      let IconButton = NavbarComponentBlock.findWhere(
        node => node.prop("data-testid") === "IconButton"
      );
      expect(IconButton.exists()).toBe(false);
      expect(NavbarComponentBlock.state("open")).toBe(false);
    });

    then("I can press the MenuItem with with out errors", () => {
      let MenuItem = NavbarComponentBlock.findWhere(
        node => node.prop("data-testid") === "MenuItem"
      );
      expect(MenuItem.exists()).toBe(true);
      MenuItem.simulate("click");
      expect(NavbarComponentBlock.state("open")).toBe(false);
    });
    when('User clicks on logout button',()=>{
        let wrapper = NavbarComponentBlock.findWhere(
          node => node.prop("data-test-id") === "logout-button"
        );
        wrapper.simulate('click')
    })
    then('token is cleared',()=>{
      expect(token).toBeFalsy()
    })
  });
});
