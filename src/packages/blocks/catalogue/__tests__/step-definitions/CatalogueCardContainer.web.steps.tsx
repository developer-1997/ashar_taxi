/**
 * @jest-environment jsdom
 */
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueCardContainer from "../../src/CatalogueCardContainer.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { act } from 'react-dom/test-utils';
import RentalPeriod from "../../src/RentalPeriod.web";
import RentalCard from "../../src/RentalCard.web";
import CheckBoxWrapper from "../../src/CheckBoxWrapper.web";
import CustomFilterCatalogueSelectBox from "../../../../components/src/CustomFilterCatalogueSelectBox.web";

const navigation = require("react-navigation");

let mockMatch = { params: { id: '3' } };
let mockHistory = { push: jest.fn() };

const screenProps = {
  navigation: navigation,
  id: "CatalogueCardContainer",
  history: mockHistory,
  location: {},
  match: mockMatch,
};

const feature = loadFeature("./__tests__/features/CatalogueCardContainer-scenario.feature");

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
const mockFilteredData = {
  "data": [{
    "id": "18", "type": "cab_landing",
    "attributes": {
      "cab_name": "TestDev", "cab_model": "SUV", "number_of_seats": 5, "colour": "red", "depot": "Hackney", "shifts": ["Full Shift", "Weekly", "Monthly"],
      "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/52z6u1lrg1yedm7h2fyx7o1vk0mc?response-content-disposition=inline%3B%20filename%3D%22Audi.png%22%3B%20filename%2A%3DUTF-8%27%27Audi.png\u0026response-content-type=image%2Fpng\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=hello%2F20230908%2Fbuilder-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230908T122954Z\u0026X-Amz-Expires=300\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=c921b11f874fa2021d0fa050f3dd7e0e1089558c359a26193cb22f2281150fe0"
    }
  }
  ]
}

const mockDataRentalPrices = {
  "prices": [
    { "id": 3, "shift_name": "Full Shift", "price": 123 },
    { "id": 2, "shift_name": "Weekly", "price": 300 },
    { "id": 4, "shift_name": "Half Shift - 1", "price": 30 },
    { "id": 5, "shift_name": "Half Shift - 2", "price": 35 },
    { "id": 1, "shift_name": "Monthly", "price": 1200 },
  ]
}


const mockRentalTime = {
  "data": [{ "id": "1", "type": "shift_time", "attributes": { "shift_name": "Half Shift - 1", "start_time": "07:00", "end_time": "15:00" } },
  { "id": "2", "type": "shift_time", "attributes": { "shift_name": "Half Shift - 2", "start_time": "16:00", "end_time": "23:00" } },
  { "id": "3", "type": "shift_time", "attributes": { "shift_name": "Full Shift", "start_time": "07:00", "end_time": "18:00" } },
  { "id": "4", "type": "shift_time", "attributes": { "shift_name": "Weekly", "start_time": "07:00", "end_time": "18:00" } },
  { "id": "5", "type": "shift_time", "attributes": { "shift_name": "Monthly", "start_time": "07:00", "end_time": "18:00" } }]
}


const mockResponse = { message: "No Cabs Available" }

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

const intialProps = {
  shiftCheck: "Monthly",
  depotCheck: "Hackney",
  tempDepotCheck: 'Hackney',
  handleRentalPeriodMenuClose: jest.fn(),
  handleDepotChange: jest.fn(),
  handleChange: jest.fn(),
  handleSearch: jest.fn(),
  handleConfirm: jest.fn(),
  handleDateRangeClean: jest.fn(),
  startDate: "",
  endDate: "",
  rentalPriceFilter: mockDataRentalPrices,
  rentalTimeFilter: {},
  nearestLocation: "Hackney"
};
const rentalProps = {
  depotCheck: "Hackney",
  handleSearch: jest.fn(),
  handleConfirm: jest.fn(),
  handleDateRangeClean: jest.fn(),
  tempDepotCheck: 'Hackney',
  startDate: "",
  endDate: "",
  handleDateRangeSelect: jest.fn(),
  rentalPriceFilter: {},
  rentalTimeFilter: {},
  shiftCheck: "",
  nearestLocation: "Hackney"
};

const mockPosition = {
  coords: {
    latitude: 51.54223176145522,
    longitude: -0.0016405662795868847,
  }
};

const mockNearestLocationData = { "Depot": "Hackney" }

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CatalogueCardContainer;
    let checkBoxWrapperOne: ShallowWrapper;
    let rentalCard: ShallowWrapper;
    let rentalPeriod: ShallowWrapper;

    given("I am a User loading catalogue Page", () => {
      exampleBlockA = shallow(<CatalogueCardContainer {...screenProps} />);


      rentalCard = shallow(<RentalCard
        {...intialProps}
      />)
      rentalPeriod = shallow(<RentalPeriod {...rentalProps} />);
      checkBoxWrapperOne = shallow(<CheckBoxWrapper
        shiftCheck={intialProps.shiftCheck}
        handleChange={intialProps.handleChange}
        id="monthly-change"
        data-test-id="monthly-change"
        check="Monthly"
      />);
      (global.navigator as any).geolocation = {
        getCurrentPosition: jest.fn().mockImplementationOnce(success => success(mockPosition))
      };


    });

    when("I navigate to the Catalogue page", () => {
      instance = exampleBlockA.instance() as CatalogueCardContainer;
    });

    then("Catalogue page will load with out errors", () => {
      const heading = exampleBlockA.findWhere((node) => node.prop('data-testId') === "Catalogue Card Heading")
      expect(heading.text()).toBe('Electric Taxi rental Period');
    });
    then('CabList api called with out errors', () => {
      expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
        1,
        'RestAPIRequestMessage',
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "cabs",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      )
    });
    then('RentalPrice api called with out errors', () => {
      expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
        2,
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "rental_price",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });
    then('Shift Timing api called with out errors', () => {
      expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
        3,
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "rent_times",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });

    when("Network response for Cabs is set", async () => {
      await act(async () => {
        await mockApiCall(instance, "getProductApiCallId", mockData, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("Cabs list is populated with certain attributes", async () => {

      await act(async () => {
        exampleBlockA.update();
        await Promise.resolve();
        const location = exampleBlockA.find('[data-testId="cardBoxList"]').length;
        expect(location).toBe(mockData.data.length);
      });
    });
    when("Network response for filtered Cabs is set", async () => {
      await act(async () => {
        await mockApiCall(instance, "getProductParamsApiCallId", mockFilteredData, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("Filtered Cabs list is populated with certain attributes", async () => {

      await act(async () => {
        exampleBlockA.update();
        await Promise.resolve();
        const location = exampleBlockA.find('[data-testId="cardBoxList"]').length;
        expect(location).toBe(mockFilteredData.data.length);
      });
    });
    when("Network response for filtered Cabs gives no result", async () => {
      await act(async () => {
        await mockApiCall(instance, "getProductParamsApiCallId", { message: "No Cabs Available" }, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("Filtered Cabs list is not populated", async () => {

      await act(async () => {
        exampleBlockA.update();
        await Promise.resolve();
        const location = exampleBlockA.find('[data-testId="cardBoxList"]').length;
        expect(location).toBe(mockFilteredData.data.length);
      });
    });
    when("Network response for user location is set", async () => {
      await act(async () => {
        await mockApiCall(instance, "getDepotsApiCallId", mockNearestLocationData, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("Filtered location list is populated on search field", async () => {
      await act(async () => {
        rentalPeriod.update();
        await Promise.resolve();

        expect(rentalProps.nearestLocation).toBe(mockNearestLocationData.Depot);
      });
    });
    when("Network response for user location throws error", async () => {
      await act(async () => {
        await mockApiCall(instance, "getDepotsApiCallId", {}, MessageEnum.RestAPIResponceErrorMessage);
      });
    });

    then("Filtered location list is populated by default", async () => {
      await act(async () => {
        rentalPeriod.update();
        await Promise.resolve();

        expect(rentalProps.nearestLocation).toBe("Hackney");
      });
    });
    when('user selects a particular rental period', () => {
      checkBoxWrapperOne = shallow(<CheckBoxWrapper
        shiftCheck={intialProps.shiftCheck}
        handleChange={instance.handleChange}
        id="monthly-change"
        data-test-id="monthly-change"
        check="Monthly"
      />);
      
      checkBoxWrapperOne.simulate("change", { target: { value: "Monthly" } });
    });

    then('particular shift is selected for the rental period', () => {

      const monthlyCheckbox = checkBoxWrapperOne.find('[data-test-id="monthly-change"]');
      const check = monthlyCheckbox.prop("checked")
      expect(check).toBe(true);
    });
    when("user get empty data for cabs", async () => {
      await act(async () => {
        await mockApiCall(instance, "getProductApiCallId", mockResponse, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("no data will be rendered on screen", async () => {
      await act(async () => {
        exampleBlockA.update();
        await Promise.resolve();
        const location = exampleBlockA.find('[data-testId="No Cars"]').length;
        expect(location).toBe(1);
      });
    });
    when("user get the data for cabs on rental prices", async () => {
      await act(async () => {
        await mockApiCall(instance, "getCabsRentalApiCallId", mockDataRentalPrices, MessageEnum.RestAPIResponceSuccessMessage);
      });

    });

    then("data will be rendered on left panel", async () => {
      rentalCard.update();
      await Promise.resolve();
      const rentalPriceText = rentalCard.find('[data-testId="Rental Price"]').text();
      expect(rentalPriceText).toBe("£ ");
    });
    when("Network response for rental prices throws error", async () => {
      await act(async () => {
        await mockApiCall(instance, "getCabsRentalApiCallId", {}, MessageEnum.RestAPIResponceErrorMessage);
      });
    });

    then("rental prices wont be shown", async () => {
      await act(async () => {
        rentalCard.update();
        await Promise.resolve();
        const rentalPriceText = rentalCard.find('[data-testId="Rental Price"]').text();
        expect(rentalPriceText).toBe("£ ");
      });
    });
    when("user get the data for cabs on rental periods", async () => {
      await act(async () => {
        await mockApiCall(instance, "getCabsTimeApiCallId", mockRentalTime, MessageEnum.RestAPIResponceSuccessMessage);
      });
    });

    then("data will be saved for rental periods", async () => {
      await act(async () => {
        rentalCard.update();
        await Promise.resolve();
        const rentalPriceText = rentalCard.find('[data-testId="Rental Price"]').text();
        expect(rentalPriceText).toBe("£ ");
      });

    });
    when("Network response for rental periods throws error", async () => {
      await act(async () => {
        await mockApiCall(instance, "getCabsTimeApiCallId", {}, MessageEnum.RestAPIResponceErrorMessage);
      });
    });

    then("shift timing wont be added", async () => {
      await act(async () => {
        rentalCard.update();
        await Promise.resolve();
        const rentalPriceText = rentalCard.find('[data-testId="Rental Price"]').text();
        expect(rentalPriceText).toBe("£ ");
      });
    });
    when("user does not get the data for cabs", async () => {
      await act(async () => {
        await mockApiCall(instance, "getProductApiCallId", { message: "No Cabs Available" }, MessageEnum.RestAPIResponceErrorMessage);
      });
    });

    then("No data will be displayed on screen", async () => {
      await act(async () => {
        rentalCard.update();
        await Promise.resolve();

        const rentalPriceText = rentalCard.find('[data-testId="Rental Price"]').text();
        expect(rentalPriceText).toBe("£ ");
      });

    });
    when("user selects rental location", () => {

      const props = {
        ...rentalProps,
        handleDepotChange: instance.handleDepotChange,
        handleRentalPeriodMenuClose: instance.handleRentalPeriodMenuClose,
        handleSearch: instance.handleSearch,
        handleConfirm: instance.handleConfirm

      };

      rentalPeriod = shallow(<RentalPeriod {...props} />);

      rentalPeriod.find('WithStyles(ForwardRef(Checkbox))').at(0).simulate('change', { target: { value: 'Hackney' } });
      rentalPeriod.findWhere((node) => node.prop('data-test-id') === 'handleRentalPeriodMenuCloseButton').simulate('click');

    });

    then("user can close the modal", () => {
      const boxComponent = rentalPeriod.find('[data-test-id="handleRentalPeriodMenuCloseButton"]');
      boxComponent.simulate('click');
    })

    then("user can search in rental period", () => {
      const searchComponent = rentalPeriod.find('[data-test-id="searchButton"]');
      searchComponent.simulate('click');
    })

    then("user selects nearest location", () => {

      const props = {
        ...rentalProps,
        depotCheck: "",
        nearestLocation:"Hackney",
        handleDepotChange: instance.handleDepotChange,
        handleRentalPeriodMenuClose: instance.handleRentalPeriodMenuClose,
        handleSearch: instance.handleSearch,
        handleConfirm: instance.handleConfirm

      };

      rentalPeriod = shallow(<RentalPeriod {...props} />);
      const searchComponent = rentalPeriod.find('[data-test-id="searchButton"]');
      searchComponent.simulate('click');
    
    });
    then("user selects monthly shift", () => {
      const props = {
        ...rentalProps,
        depotCheck: "",
        nearestLocation:"",
        shiftCheck:"Monthly",
        handleDepotChange: instance.handleDepotChange,
        handleRentalPeriodMenuClose: instance.handleRentalPeriodMenuClose,
        handleSearch: instance.handleSearch,
        handleConfirm: instance.handleConfirm

      };

      rentalPeriod = shallow(<RentalPeriod {...props} />);
      const searchComponent = rentalPeriod.find('[data-test-id="searchButton"]');
      searchComponent.simulate('click');
    
    });
    then("call handleConfirm in rental period", () => {
      const confirmComponent = rentalPeriod.find('[data-test-id="handleConfirm"]');
      confirmComponent.simulate('click');
    })

    when('User lands on page with landing page query', () => {
      const mockLocation = {
        search: '?shift=Monthly&depot=Hackney&startDate=23-07-2023&endDate=24-07-2023',
      };
      const locationProps = {
        ...screenProps,
        location: mockLocation,
      };
      exampleBlockA = shallow(<CatalogueCardContainer {...locationProps} />);
    })
    then('Page is loaded without errors', () => {
      const heading = exampleBlockA.findWhere((node) => node.prop('data-testId') === "Catalogue Card Heading")
      expect(heading.text()).toBe('Electric Taxi rental Period');
    })
    when('User lands on page with landing page query with only shift', () => {
      const mockLocation = {
        search: '?shift=Monthly',
      };
      const locationProps = {
        ...screenProps,
        location: mockLocation,
      };
      exampleBlockA = shallow(<CatalogueCardContainer {...locationProps} />);
    })
    then('Page is loaded without errors for shift data', () => {
      const heading = exampleBlockA.findWhere((node) => node.prop('data-testId') === "Catalogue Card Heading")
      expect(heading.text()).toBe('Electric Taxi rental Period');
    })
    when('User lands on page with landing page query with only depot', () => {
      const mockLocation = {
        search: '?depot=Hackney',
      };
      const locationProps = {
        ...screenProps,
        location: mockLocation,
      };
      exampleBlockA = shallow(<CatalogueCardContainer {...locationProps} />);
    })
    then('Page is loaded without errors for depot data', () => {
      const heading = exampleBlockA.findWhere((node) => node.prop('data-testId') === "Catalogue Card Heading")
      expect(heading.text()).toBe('Electric Taxi rental Period');
    })
  

  });
});
