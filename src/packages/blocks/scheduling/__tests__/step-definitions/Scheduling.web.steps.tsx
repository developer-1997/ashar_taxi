import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import * as utilities from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";
import Scheduling from "../../src/Scheduling.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Scheduling",
};

const mockData = {
  data: [
    {
      "id": "11",
      "type": "booking_history",
      "attributes": {
        "id": 11,
        "status": "In-Progress",
        "shift": "Full Shift",
        "shift_for_extension": ["Full Shift", 'Weekly'],
        "scheduled_pick_up": "2023-09-04T07:00:00.000+01:00",
        "scheduled_drop_off": "2023-09-04T18:00:00.000+01:00",
        "created_at": "2023-09-04T07:07:10.030+01:00",
        "cab_name": "LEVC TXE Comfort Plus Electric - Automatic E",
        "price": 123,
        "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/sugrbxax1g9ovhz6o4ktnpw4jex9?response-content-disposition=inline%3B%20filename%3D%22widerangetaxi.png%22%3B%20filename%2A%3DUTF-8%27%27widerangetaxi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230907%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T124517Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6d92937d37198b002bd85271eb249effe72aefdbae2fb4d5215bf99902553176"
      }
    },
    {
      "id": "13",
      "type": "booking_history",
      "attributes": {
        "id": 13,
        "status": "Booked",
        "shift": "Full Shift",
        "scheduled_pick_up": "2023-09-06T07:08:28.000+01:00",
        "scheduled_drop_off": "2023-09-06T18:08:28.000+01:00",
        "created_at": "2023-09-05T08:09:20.030+01:00",
        "cab_name": "LEVC TXE Comfort Plus Electric - Automatic  Creta",
        "price": 123,
        "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/oq1b53l0vp8ja4a6u1hlepvx4apc?response-content-disposition=inline%3B%20filename%3D%22widerangetaxi.png%22%3B%20filename%2A%3DUTF-8%27%27widerangetaxi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230907%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T124517Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f33f41021893edea2ad266b67298979be8dbe49bdcbac7ee3cd12ab17af70ade"
      }
    },
    {
      "id": "15",
      "type": "booking_history",
      "attributes": {
        "id": 15,
        "status": "Booked",
        "shift": "Full Shift",
        "scheduled_pick_up": "2023-09-13T11:40:50.000+01:00",
        "scheduled_drop_off": "2023-09-13T22:40:50.000+01:00",
        "created_at": "2023-09-05T12:58:03.938+01:00",
        "cab_name": "LEVC TXE Comfort Plus Electric - Automatic  Creta",
        "price": 123,
        "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/oq1b53l0vp8ja4a6u1hlepvx4apc?response-content-disposition=inline%3B%20filename%3D%22widerangetaxi.png%22%3B%20filename%2A%3DUTF-8%27%27widerangetaxi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230907%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T124517Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f33f41021893edea2ad266b67298979be8dbe49bdcbac7ee3cd12ab17af70ade"
      }
    }
  ]
}

const mockEmptyData = {
  data: []
}

const mockCancelledData = {
  "message": "Your booking has been cancelled."
}

const mockExtensionetailsDataWithError = {
  "error": "Booking not found or not available for extension"
}
const mockExtensionetailsDataWithOutError = {
  "booking_id": 15,
  "extended_shift": "Additional Day",
  "extended_start_time": "2023-09-13T22:40:50",
  "extended_endtime": "2023-09-14T22:40:50",
  "additional_shift_price": 40
}

const mockBookingHistory = {
  "data": [
    {
      "id": "11",
      "type": "booking_history",
      "attributes": {
        "id": 11,
        "status": "Cancelled",
        "shift": "Full Shift",
        "scheduled_pick_up": "2023-09-04T07:00:00.000+01:00",
        "scheduled_drop_off": "2023-09-04T18:00:00.000+01:00",
        "created_at": "2023-09-04T07:07:10.030+01:00",
        "cab_name": "LEVC TXE Comfort Plus Electric - Automatic E",
        "price": 123,
        "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket/sugrbxax1g9ovhz6o4ktnpw4jex9?response-content-disposition=inline%3B%20filename%3D%22widerangetaxi.png%22%3B%20filename%2A%3DUTF-8%27%27widerangetaxi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230911%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230911T074611Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=116e1677ed985ba5033c837affaf204e907df09825980c1d4a0dda393213ee1a",
        "scheduled_depot_location": "101 Pine Road, Golders Green, NW11 8UA, United Kingdom"
      }
    }
  ]
}

const mockRentalPeriodData = {
  "prices": [
    {
      "id": 3,
      "shift_name": "Full Shift",
      "price": 123,
      "created_at": "2023-07-31T10:41:23.294+01:00",
      "updated_at": "2023-07-31T10:41:23.294+01:00",
      "surge_price": null
    },
    {
      "id": 2,
      "shift_name": "Weekly",
      "price": 300,
      "created_at": "2023-07-31T08:16:13.391+01:00",
      "updated_at": "2023-08-14T12:02:22.896+01:00",
      "surge_price": null
    },
    {
      "id": 4,
      "shift_name": "Half Shift - 1",
      "price": 30,
      "created_at": "2023-08-14T12:02:37.257+01:00",
      "updated_at": "2023-08-14T12:02:37.257+01:00",
      "surge_price": null
    },
    {
      "id": 1,
      "shift_name": "Monthly",
      "price": 1200,
      "created_at": "2023-07-28T13:42:07.264+01:00",
      "updated_at": "2023-08-14T12:13:05.169+01:00",
      "surge_price": null,
      "selected": true
    },
    {
      "id": 5,
      "shift_name": "Half Shift - 2",
      "price": 35,
      "created_at": "2023-08-14T12:02:49.610+01:00",
      "updated_at": "2023-08-24T11:47:16.397+01:00",
      "surge_price": 49
    }
  ]
}

const feature = loadFeature("./__tests__/features/Scheduling.web-scenario.feature");

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
  const { receive: mockResponse } = instance
  mockResponse("test", msgDeviceTokenAPI)
});

defineFeature(feature, (test) => {
  let SchedulingWrapper: ShallowWrapper;
  let instance: Scheduling;
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: { getItem: jest.fn() } },
      writable: true,

    });
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(utilities, "getStorageData")
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to Scheduling page", ({ given, when, then }) => {


    given("I am a User loading Scheduling page", () => {
      SchedulingWrapper = shallow(<Scheduling {...screenProps} />);
    });

    when("I navigate to the Scheduling page", () => {
      instance = SchedulingWrapper.instance() as Scheduling;
    });

    then("Scheduling page will load with out errors", () => {
      const heading = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "heading")
      expect(heading.at(0).text()).toBe('Upcoming');
      expect(heading.at(0).hasClass('active')).toBe(true);
      expect(heading.at(1).hasClass('active')).toBe(false);
    });
    when("Network response for Scheduling with data is set", () => {
      mockApiCall(instance, "getUpcomingBookingHistoryApiId", mockData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('Upcoming Booking data show', () => {
      const UpcomingBooking = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "Title");
      expect(UpcomingBooking.at(0).text()).toBe(mockData.data[0].attributes.cab_name)
    });
    when("Network response for Scheduling without data is set", () => {
      mockApiCall(instance, "getUpcomingBookingHistoryApiId", mockEmptyData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('No Booking Error show', () => {
      const NoBookingText = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "NoBooking");
      expect(NoBookingText.text()).toBe('No Booking are Scheduled.')
    });
  });

  test("User click to cancel button", ({ given, when, then }) => {
    given("Upcoming Booking data show", () => {
      mockApiCall(instance, "getUpcomingBookingHistoryApiId", mockData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    when("I click to cancel button", () => {
      const CancelBtn = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "CancelBtn");
      CancelBtn.at(1).simulate('click')
    });
    then('Cancel model appear', () => {
      const CancelModalText = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "CancelModalText");
      expect(CancelModalText.text()).toBe('Are you sure you want to cancel?')
    });

    when("I click to yes button", () => {
      const ConfirmCancelBtn = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ConfirmCancelBtn");
      ConfirmCancelBtn.simulate('click')
      mockApiCall(instance, "postCancelBookingApiId", mockCancelledData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('Cancel model disappear', () => {
      const CancelModal = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "CancelModal");
      expect(CancelModal.prop('open')).toBe(false)
    })
  });

  test("User click to Extend button", ({ given, when, then }) => {
    given("Rental Period Api called", () => {
      mockApiCall(instance, "getRentalPriceListApiCallId", mockRentalPeriodData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    when("I click to Extend button", () => {
      const ExtendBtn = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ExtendBtn");
      ExtendBtn.at(0).simulate('click')
    });
    then('Extend model appear', () => {
      const RentalPeriod = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "RentalPeriod");
      expect(RentalPeriod.text()).toBe('Select Rental Period')
    });
    when('I select a rental period', () => {
      const RentalPeriodGridBox = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === 'RentalPeriodGridBox')
      RentalPeriodGridBox.at(1).simulate('click')
    });
    then('the selected rental period should be highlighted', () => {
      expect(instance.state.rentalPeriod.filter(item => item.selected)).toHaveLength(1)
    });
    when("I click to Continue button api give error", () => {
      const ExtendBookingContinueBtn = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ExtendBookingContinueBtn");
      ExtendBookingContinueBtn.simulate('click')
      mockApiCall(instance, "getExtendBookingDetailsApiCallId", mockExtensionetailsDataWithError, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('error message appear', () => {
      const ExtendBookingErrorMessage = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ExtendBookingErrorMessage");
      expect(ExtendBookingErrorMessage.text()).toBe(mockExtensionetailsDataWithError.error)
    })
    when("I click to Continue button api without error", () => {
      const ExtendBookingContinueBtn = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ExtendBookingContinueBtn");
      ExtendBookingContinueBtn.simulate('click')
      mockApiCall(instance, "getExtendBookingDetailsApiCallId", mockExtensionetailsDataWithOutError, MessageEnum.RestAPIResponceSuccessMessage);
      mockApiCall(instance, "patchExtendBookingApiId", mockExtensionetailsDataWithOutError, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('Extend model disappear', () => {
      const ExtendBookingModal = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "ExtendBookingModal");
      expect(ExtendBookingModal.prop('open')).toBe(false)
    })
  });

  test("User click to Past Tab", ({ given, when, then }) => {

    when("I click to Past Tab", () => {
      const heading = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "heading")
      heading.at(1).simulate('click')
    });

    then("Active past tab", () => {
      const heading = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "heading")
      expect(heading.at(1).hasClass('active')).toBe(true);
      expect(heading.at(0).hasClass('active')).toBe(false);
    });
    when("Network response for booking history with data is set", () => {
      mockApiCall(instance, "getPreviousBookingHistoryApiId", mockBookingHistory, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('booking history data show', () => {
      const UpcomingBooking = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "Title");
      expect(UpcomingBooking.at(0).text()).toBe(mockData.data[0].attributes.cab_name)
    });
    when("Network response for booking history without data is set", () => {
      mockApiCall(instance, "getPreviousBookingHistoryApiId", mockEmptyData, MessageEnum.RestAPIResponceSuccessMessage);
    });
    then('No Booking Error show', () => {
      const NoBookingText = SchedulingWrapper.findWhere((node) => node.prop('data-testId') === "NoBooking");
      expect(NoBookingText.text()).toBe('No Booking are Scheduled.')
    });
  });
});