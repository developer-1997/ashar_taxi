import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper ,mount, ReactWrapper} from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { act } from 'react-dom/test-utils';
import React from "react";
import LandingPage from "../../src/LandingPage.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import FooterComponent from "../../src/Footer.web";
const navigation = require("react-navigation");


let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
let mockLocation ={
  pathname:'/LandingPage'
}
const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  history: mockHistory,
  location: mockLocation,
  match: mockMatch,
};

const mockApiCall = jest.fn().mockImplementation((instance: any, apiCallId: string, apiData: any, responseType: number) => {
  const msgDeviceTokenAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgDeviceTokenAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgDeviceTokenAPI.messageId
  );
  msgDeviceTokenAPI.addData(
    getName(responseType),
    apiData
  );
  instance[apiCallId] = msgDeviceTokenAPI.messageId;
  const { receive: MockRecieve } =  instance
  MockRecieve("", msgDeviceTokenAPI)
});


const mockData = {
  "data": [{
    "id": "16",
    "type": "cab_landing",
    "attributes": {
      "cab_name": "Testing", "cab_model": "123456", "number_of_seats": 2, "colour": "red",
      "depot": "Golders Green",
      "shifts": ["Half Shift - 1", "Half Shift - 2", "Full Shift"],
      "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/5euljm2lpezxxs5xqt8azcvpv85n?response-content-disposition=inline%3B%20filename%3D%22Login%20to%20book%25401x%25281%2529.jpg%22%3B%20filename%2A%3DUTF-8%27%27Login%2520to%2520book%25401x%25281%2529.jpg\u0026response-content-type=image%2Fjpeg\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=hello%2F20230824%2Fbuilder-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230824T061312Z\u0026X-Amz-Expires=300\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=f886521e770d29f99b535dce0f62eb02b9defa16ffcccf076472ff08f640c62f"
    }
  },
  ]
}
const mockSupportData = {
  "support_email": "dummy@example.com",
  "support_number": "0123456789"
}

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.web.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;
    let footerPageBlock:ShallowWrapper;

    given("I am a User loading LandingPage", () => {
      landingPageBlock = shallow(<LandingPage {...screenProps} />);
      footerPageBlock =  shallow(<FooterComponent   supportData={mockSupportData} {...screenProps} />)
      
    });

    when("I navigate to the LandingPage", () => {
      instance = landingPageBlock.instance() as LandingPage;
    });

    then('Support api called with out errors', () => {
      expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
        1,
        'RestAPIRequestMessage',
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "support",
          },
        })
      )
    });
    then('CabList api called with out errors', () => {
      expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
        2,
        'RestAPIRequestMessage',
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "cabs",
          },
        })
      )
    });
    when("Network response for Cabs is set", async () => {
      await act(async () => {
        await mockApiCall(instance, "getUserApiCallId", mockData, MessageEnum.RestAPIResponceSuccessMessage);
      });
    
    });

    then("Cabs list is populated with certain attributes", async () => {
      await act(async () => {
        landingPageBlock.update();
        await Promise.resolve();
        const location = landingPageBlock.find('[data-test-id="cardBoxListLanding"]').length;
        expect(location).toBe(1);
      });
    });

    when("Network response for Support is set", async () => {
      await act(async () => { 
        await mockApiCall(instance, "getSupportCallId", mockSupportData, MessageEnum.RestAPIResponceSuccessMessage);
        await Promise.resolve();
      });
    
    });

    then("Support Contact is populated with certain attributes", async () => {
      await act(async () => { 
        footerPageBlock.update();
        const supportText = footerPageBlock.find('[data-test-id="footerContactDummy"]').text();
        expect(supportText).toBe(mockSupportData.support_email);
      });
    });
  });
});
