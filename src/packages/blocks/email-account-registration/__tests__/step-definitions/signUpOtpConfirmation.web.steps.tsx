//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import React from "react";
import { Message } from "..././../../framework/src/Message";
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import SignUpOtpConfirmation from "../../src/SignUpOtpConfirmation.web";
import { OtpInputField } from "../../../../components/src/OtpInputFieldSignUp.web";

jest.mock("formik")
const pushSpy = jest.fn();

const screenProps = {
  navigation: {
    getItem: jest.fn(),
    setItem: jest.fn(),

  },
  id: "SignUpOtpConfirmation",
  onchange: () => { },
  history: { push: pushSpy, goBack: jest.fn() },
  location: {},
}


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

const mockOTPData = {
  "otp1": "1",
  "otp2": "2",
  "otp3": "3",
  "otp4": "4"
}


const signOtpProps = {
  values: {
    otp1: "1",
    otp2: "2",
    otp3: "3",
    otp4: "4"
  },
 
}

const mockData =  {
  data:  {
    email:"abc@gmail.com",
    full_phone_number:1234567890
  }, 
  meta: {
    token: 'yourExpectedTokenValue',
  },
}

const mockDataWithErrorcreateAccountApiCallIdForWeb =  {
  errors:  {
    email:"abc@gmail.com",
    full_phone_number:1234567890
  }, 
}

const mockDataOtpVerificationErrors =  {
  errors:  ["Otp wrong"], 
}

const feature = loadFeature('./__tests__/features/signUpOtpConfirmation-scenerio.feature');
 
let RegistrationWrapper ;

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.spyOn(runEngine, "sendMessage");
    
  });

  test('SignUp With Otp Confirmation', ({ given, when, then, and }) => {
    let SignUpOtpConfirmationWrapperRegistration: ShallowWrapper;
    let SignUpOtpWrapper: ShallowWrapper;
    let instance: SignUpOtpConfirmation;

    given('User loading signUpOtpConfirmation page', () => {
      SignUpOtpConfirmationWrapperRegistration = shallow(<SignUpOtpConfirmation {...screenProps} />)
      instance = SignUpOtpConfirmationWrapperRegistration.instance() as SignUpOtpConfirmation
      signOtpProps.handleChange = instance.handleChange ;
      signOtpProps.handleSubmit=  instance.handleOtpFormSubmit
      SignUpOtpWrapper = shallow(<OtpInputField {...signOtpProps} />)

    });

    when('User navigate to the signUpOtpConfirmation Screen', () => {
      RegistrationWrapper = SignUpOtpConfirmationWrapperRegistration.findWhere((node) => node.prop('data-test-id') === 'backId');
    });

    then('SignUpOtpConfirmation page will load with out errors', () => {
      expect(RegistrationWrapper.text()).toBe("Back to home")
    });

    when("User can handle the otp input field", () => {
      let firstInput = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputFirst');
      firstInput.simulate('keypress', 'first')

      let secondInput = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputSecond');
      secondInput.simulate('keypress', 'second')

      let thirdInput = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputThird');
      thirdInput.simulate('keypress', 'third')

      let fourthInput = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputFourth');
      fourthInput.simulate('keypress', 'fourth')

      let otpSubmit = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'btnOtpVerify');
      otpSubmit.simulate('click' , mockOTPData);
   
    })

    then("User can click the otp verify Button", () => {
      let otpSubmit = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'btnOtpVerify');
      expect(otpSubmit.text()).toEqual("Continue")
    })

    when("User can handle the otp verify by submit", () => {
      let otpSubmit = SignUpOtpWrapper.findWhere((node) => node.prop('data-test-id') === 'btnOtpVerify');
      otpSubmit.simulate('click' , mockOTPData);
    })


    then("handleOtpFormSubmit should be called", () => {
      let str = signOtpProps.values.otp1 + signOtpProps.values.otp2 + signOtpProps.values.otp3 + signOtpProps.values.otp4;
      expect(str).toBe("1234")
    })

    when('User can resend otp again by click', () => {
      let otpsendButoon = SignUpOtpConfirmationWrapperRegistration.findWhere((node) => node.prop('data-test-id') === 'otpsendButton');
      otpsendButoon.simulate("click")
    });

    then("error state should should set", () => {
      expect(instance.state.error).toBe("OTP sent again");
    })

    when("OtpVerificationApiCallIdForWeb api will return success", () => {
      const mockData =  {
        data:  mockOTPData 
      }
      mockApiCall(instance, "OtpVerificationApiCallIdForWeb", mockData, MessageEnum.RestAPIResponceSuccessMessage);      
    })

    then("location push should be called with AccountSuccessfulCreation", () => {
      expect(pushSpy).toHaveBeenCalledWith('/AccountSuccessfulCreation');
    })


    when("OtpVerificationApiCallIdForWeb api will return errors", () => {
      mockApiCall(instance, "OtpVerificationApiCallIdForWeb", mockDataOtpVerificationErrors, MessageEnum.RestAPIResponceSuccessMessage);
    })


    then("error state should should set", () => {
      expect(instance.state.error).toBe(mockDataOtpVerificationErrors.errors[0]);
    })

    when("createAccountApiCallIdForWeb api will return error", () => {
      mockApiCall(instance, "createAccountApiCallIdForWeb", mockDataWithErrorcreateAccountApiCallIdForWeb, MessageEnum.RestAPIResponceSuccessMessage);
    })

    then("error state should should set", () => {
      expect(instance.state.error).toBe(mockDataWithErrorcreateAccountApiCallIdForWeb.errors);
    })

    when("createAccountApiCallIdForWeb api will return success", () => {
      mockApiCall(instance, "createAccountApiCallIdForWeb", mockData, MessageEnum.RestAPIResponceSuccessMessage);
    })

    then("token should have valid value", () => {
      expect(instance.state.token).toBe('yourExpectedTokenValue');
    })
    

  });
})
