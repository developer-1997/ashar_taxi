import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";
import CarDetails from "../../src/CarDetails.web";
const navigation = require("react-navigation");

let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
const screenProps = {
    navigation: navigation,
    id: "CarDetails",
    match: mockMatch,
    history: mockHistory
};

const mockData = {
    "id": "3",
    "type": "cab",
    "attributes": {
        "cab_name": "",
        "cab_model": "E",
        "number_of_seats": 4,
        "colour": "Black",
        "features_amenities": "Black",
        "charging_time": "One hour",
        "range": 400,
        "kms_driven": 1003,
        "depot": "Golders Green",
        "shifts": [],
        "availability": true,
        "cab_image": "https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket…30cda21eafafa7dd771c40537955fd1a4b9965f0c4fb5612390a665e4665",
        "other_cab_images": [],
        "depot_information": null
    }
}

const mockRentalPeriodData = [
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
        "surge_price": null
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

const mockBookingDetails = {
    cab_id: 3,
    shift: "Full Shift",
    pick_up: "2023-08-31T07:00:00",
    drop_off: "2023-08-31T18:00:00",
    price: 123,
    message: " The cab is available for the given schedule."
}

const mockErrorResponse = {
    "errors": [
        {
            "token": "Invalid token"
        }
    ]
}

const mockTokenData = ''


const feature = loadFeature("./__tests__/features/CarDetails-scenario.feature");

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

    runEngine.sendMessage("Api Test", msgDeviceTokenAPI);
});
defineFeature(feature, (test) => {
    let CarDetailsWrapper: ShallowWrapper;
    let instance: CarDetails;
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.spyOn(runEngine, "sendMessage");
    });

    test("User navigates to CarDetails page", ({ given, when, then }) => {


        given("I am a User loading CarDetails page", () => {
            CarDetailsWrapper = shallow(<CarDetails {...screenProps} />);
        });

        when("I navigate to the CarDetails page", () => {
            instance = CarDetailsWrapper.instance() as CarDetails;
        });

        then("CarDetails page will load with out errors", () => {
            const heading = CarDetailsWrapper.findWhere((node) => node.prop('data-testId') === "heading")
            expect(heading.text()).toBe('Electric Taxi Detail');
        });
        then('CarDetails api called with out errors', () => {
            expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
                2,
                'RestAPIRequestMessage',
                expect.objectContaining({
                    id: "RestAPIRequestMessage",
                    initializeFromObject: expect.any(Function),
                    messageId: expect.any(String),
                    properties: {
                        RestAPIRequestMethodMessage: "GET",
                        RestAPIResponceEndPointMessage: "cab" + "/" + mockData.id,
                        RestAPIRequestHeaderMessage: expect.any(String),
                    },
                })
            )
        });
        then('RentalPrice api called with out errors', () => {
            expect(runEngine.sendMessage).toHaveBeenNthCalledWith(
                3,
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
        when("Network response for CarDetails is set", () => {
            mockApiCall(instance, "getProductApiCallId", mockData, MessageEnum.RestAPIResponceSuccessMessage);
            CarDetailsWrapper.update()
        });
        then('Title of car show', () => {
            const title = CarDetailsWrapper.find('[data-testId="Title"]');
            expect(title.text()).toBe(`${mockData.attributes.cab_name}`)
        });

        when("Network response for RentalPrice is set", () => {
            mockApiCall(instance, "getRentalPriceListApiCallId", mockRentalPeriodData, MessageEnum.RestAPIResponceSuccessMessage);
            CarDetailsWrapper.update()
        });
        then('RentalPrice of car show', () => {
            const RentalPrice = CarDetailsWrapper.find('[data-testId="RentalPeriodGridBox"]').length;
            expect(RentalPrice).toBe(mockData.attributes.shifts.length)
        });
    });

    test('Selecting rental period', ({ given, when, then }) => {
        when('I select a rental period', () => {
            instance.state.rentalPeriod.map((item) => {
                if (instance.state.carDetails.attributes.shifts.includes(item.shift_name)) {
                    const RentalPeriodGridBox = CarDetailsWrapper.findWhere((node) => node.prop('data-testId') === 'RentalPeriodGridBox')
                    RentalPeriodGridBox.at(1).simulate('click')

                }
            })
        });
        then('the selected rental period should be highlighted', () => {
            expect(instance.state.rentalPeriod.filter(item => item.selected)).toHaveLength(0)
        })
    });
    test('Booking a car without error', ({ given, when, then }) => {
        when('I click on the "Book" button', () => {
            const Bookbtn = CarDetailsWrapper.findWhere((node) => node.prop('variant') === 'contained')
            Bookbtn.simulate('click')
            mockApiCall(instance, "getBookingDetailsApiCallId", mockBookingDetails, MessageEnum.RestAPIResponceSuccessMessage);
        });
        then('it should trigger the booking process', () => {
            const pickupdate = CarDetailsWrapper.findWhere((node) => node.prop('data-testId') === 'pickupdate')
            expect(pickupdate.at(0).text()).toBe('Pick up Date & Time')
        });
        when('I again click on the "Book" button', () => {
            const Bookbtn = CarDetailsWrapper.findWhere((node) => node.prop('variant') === 'contained')
            Object.defineProperty(globalThis, 'window', {
                value: { localStorage: { getItem: jest.fn() } },
                writable: true,

            });
            Bookbtn.simulate('click')
            mockApiCall(instance, "postBookingsApiCallId", mockBookingDetails, MessageEnum.RestAPIResponceSuccessMessage);
        });
        then('Check Booking is done', () => {
            const RentalPeriod = CarDetailsWrapper.findWhere((node) => node.prop('data-testId') === 'RentalPeriod')
            expect(RentalPeriod.text()).toBe('Select Rental Period')
        });
    });
    test('Booking a car with error', ({ given, when, then }) => {
        when('I click on the "Book" button', () => {
            const Bookbtn = CarDetailsWrapper.findWhere((node) => node.prop('variant') === 'contained')
            Bookbtn.simulate('click')
            mockApiCall(instance, "getBookingDetailsApiCallId", mockBookingDetails, MessageEnum.RestAPIResponceSuccessMessage);
        });
        then('it should trigger the booking process', () => {
            const pickupdate = CarDetailsWrapper.findWhere((node) => node.prop('data-testId') === 'pickupdate')
            expect(pickupdate.at(0).text()).toBe('Pick up Date & Time')
        });
        when('I again click on the "Book" button', () => {
            const Bookbtn = CarDetailsWrapper.findWhere((node) => node.prop('variant') === 'contained')
            Object.defineProperty(globalThis, 'window', {
                value: { localStorage: { getItem: jest.fn() } },
                writable: true,

            });
            Bookbtn.simulate('click')
            mockApiCall(instance, "postBookingsApiCallId", mockErrorResponse, MessageEnum.RestAPIResponceSuccessMessage);
        });
        then('Check Error popup', () => {
            const ErrorPopupTitle = CarDetailsWrapper.findWhere((node) => node.prop('variant') === 'inherit')
            expect(ErrorPopupTitle.text()).toBe("Sorry, You need to login again... we’re redirecting you to the login page.")
        })
    });
});
