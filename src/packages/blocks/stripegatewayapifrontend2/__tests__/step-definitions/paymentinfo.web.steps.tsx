import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import React from "react";
import PaymentInfo from "../../src/PaymentInfo.web";
const navigation = require("react-navigation");



const screenProps = {
  navigation: navigation,
  id: "PaymentInfo",
  history:{
    push:jest.fn() ,
    location:{
      pathname:"/payment/success" ,
      search:"booking_id=126&session_id=cs_test_a1qKwVoMa8yq79URp64tlUDsr1NtqwDUdnQDqBkz9E92YWcM2lBLFcjuH9",
      state:
      `{"carDetails":{"id":"3","type":"cab","attributes":{"cab_name":"LEVC TXE Comfort Plus Electric - Automatic","cab_model":"E","number_of_seats":4,"colour":"Black","charging_time":"One hour","range":400,"kms_driven":1003,"features":["feature 1","feature 2"],"depot":"Golders Green","shifts":["Half Shift - 1","Full Shift","Monthly"],"availability":true,"cab_image":"https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket…1ae0d64d11bced2abf104e6302d2aadf9899b81d7af62a7a9b6b43fd6f7f","available_dates":[{"id":2,"cab_id":3,"start_date":"2023-08-02T00:00:00.000+01:00","end_date":"2023-11-01T00:00:00.000+00:00"}],"other_cab_images":[],"depot_information":{"id":7,"name":"Golders Green","latitude":"51.57279774978","longitude":"-0.19887145404","address":"Boots, 58-60, Golders Green Road, Golders Green, London Borough of Barnet, London, Greater London, England, NW11 8LN, United Kingdom","full_address":"101 Pine Road, Golders Green, NW11 8UA, United Kingdom"}}},"responseJson":{"message":"Booking successful","booking":{"id":77,"account_id":257,"cab_id":3,"status":"Booked","pick_up_depot":"Golders Green","drop_off_depot":"Golders Green","shift":"Half Shift - 1","pick_up_time":null,"drop_off_time":null,"duration":null,"scheduled_pick_up":"2023-10-05T07:00:00.000+01:00","scheduled_drop_off":"2023-10-05T15:00:00.000+01:00","base_price":"30.0","final_price":null,"extended_shifts":null,"extended_endtimes":null,"extended_prices":null,"extended_booking":null,"created_at":"2023-09-27T07:44:19.704+01:00","updated_at":"2023-09-27T07:44:19.704+01:00"},"pricing":{"id":18,"booking_id":97,"base_amount":138,"vat_amount":"6.9","billed_amount":"144.9","refund_amount":null,"payment_intent_id":null,"payment_method_id":null,"shift":"Full Shift","for_extended_shift":null,"for_refund":null,"transaction_completed":null}}}`
    }
  }
};

const feature = loadFeature(
  "./__tests__/features/paymentinfo-scenario.web.feature"
);


const setMockApiResponse = jest. fn(async (instance: any, from: string, requestMessage: Message, payload?: any) => {
  const testResponseMessage = new Message(
    getName (MessageEnum. RestAPIResponceMessage)
  );
  testResponseMessage.messageId = requestMessage.messageId;
    testResponseMessage.addData(
      getName (MessageEnum. RestAPIResponceDataMessage),
      testResponseMessage.messageId
    );

  if (payload) {
    testResponseMessage.addData(
      getName (MessageEnum. RestAPIResponceSuccessMessage),
      payload
  )}

  const { receive: MockRecieve } = instance;
  await MockRecieve (from, testResponseMessage);
});

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

  const runEngineMock = jest.fn().mockImplementation( async (from : string , message : Message ) => {
    await setMockApiResponse(instance , "test environment" , message , apiData )
  })

runEngineMock("Api Test", msgDeviceTokenAPI);
});


const confirmPaymentMockData = {
    "message": "Booking Successful",
    "payment_id": "pi_3NzCM0Fg7vVpVyj50vFs4ihI",
    "cab_name": "test-testing",
    "booking_details": {
      "id": 126,
      "status": "Booked",
      "account_id": 307,
      "cab_id": 14,
      "pick_up_depot": "Putney",
      "drop_off_depot": "Putney",
      "shift": "Full Shift",
      "pick_up_time": null,
      "drop_off_time": null,
      "duration": null,
      "scheduled_pick_up": "2023-10-20T07:00:00.000+01:00",
      "scheduled_drop_off": "2023-10-20T18:00:00.000+01:00",
      "base_price": "123.0",
      "final_price": null,
      "extended_shifts": null,
      "extended_endtimes": null,
      "extended_prices": null,
      "extended_booking": null,
      "created_at": "2023-10-09T06:49:17.739+01:00",
      "updated_at": "2023-10-09T07:01:49.383+01:00"
    },
    "bill": {
      "booking_id": 126,
      "billed_amount": "129.15",
      "id": 47,
      "transaction_completed": true,
      "base_amount": 123,
      "vat_amount": "6.15",
      "shift": "Full Shift",
      "refund_amount": null,
      "payment_intent_id": "pi_3NzCM0Fg7vVpVyj50vFs4ihI",
      "payment_method_id": "pm_1NzCLzFg7vVpVyj5k8cnEjwJ",
      "for_extended_shift": null,
      "for_refund": null,
      "session_id": null
    }
  
}

const confirmPaymentMockDataError = {
  errors : [
    "Payment failed"
  ]
}

const cancelPaymentMock = {
  message : "success"
}

const cancelPaymentMockError = {
  error : "success"
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.setTimeout(60000);
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to paymentinfo", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PaymentInfo;

    given("I am a User loading paymentinfo", () => {
      exampleBlockA = shallow(<PaymentInfo {...screenProps} />);
    });

    when("I navigate to the paymentinfo", () => {
      instance = exampleBlockA.instance() as PaymentInfo;
    });

    then("paymentinfo will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("I can call confirmPaymentApiCallId API with out errors", () => {
      mockApiCall(instance, "confirmPaymentApiCallId", confirmPaymentMockData , MessageEnum.RestAPIResponceSuccessMessage);
    });

    then("paymentStatus state should be update", () => {
      expect(instance.state.paymentSuccessResponse).toBe(confirmPaymentMockData);
    });

    when("I can call confirmPaymentApiCallId API with errors", () => {
      mockApiCall(instance, "confirmPaymentApiCallId", confirmPaymentMockDataError , MessageEnum.RestAPIResponceSuccessMessage);
    });

    then("paymentStatus and loading state should be update", () => {
      expect(instance.state.loading).toBe(false);
    });


    when("user click to cancel button for booking", () => {
      let buttonComponentId = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnCancel');
      buttonComponentId.simulate('click');   
    });

    then("handleCancel function will called and loading state will be changed", () => {
      expect(instance.state.loading).toBe(true);
    });

    when("I can call cancelBookingApiCallId API with errors", () => {
      mockApiCall(instance, "cancelBookingApiCallId", cancelPaymentMock , MessageEnum.RestAPIResponceSuccessMessage);
    });

    then("loading state should be update", () => {
      expect(instance.state.loading).toBe(false);
    });



  });
});
