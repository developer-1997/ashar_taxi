// @ts-nocheck
import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";

import LoginOtpConfirmation from "../../src/LoginOtpConfirmation.web";
import { OtpInputField } from "../../../../components/src/OtpInputField.web";

jest.mock("formik")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "LoginWithOtpConfirmation",
    onchange: () => { },
    history: { push: jest.fn(), goBack: jest.fn() },
    location: {},
}

const loginOtpProp = {
    values: {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: ""
    },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
}
const mockOTPData = {
    "otp1": "",
    "otp2": "",
    "otp3": "",
    "otp4": ""
  }

const feature = loadFeature('./__tests__/features/login-otp-confirmation-scenerio.web.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(runEngine, "sendMessage");
    });

    test('Login With Otp Confirmation Page', ({ given, when, then, and }) => {
        let otpConfirmationWrapper: ShallowWrapper;
        let otpFormWrapper: ShallowWrapper;
        let instance: LoginOtpConfirmation;

        given('User loading Login With Otp Confirmation page', () => {
            otpConfirmationWrapper = shallow(<LoginOtpConfirmation history={undefined} {...screenProps} />)
            expect(otpConfirmationWrapper).toMatchSnapshot();
            otpFormWrapper = shallow(<OtpInputField {...loginOtpProp} />)

        });
        when('User navigate to the Login With Otp Confirmation Screen', () => {
            instance = otpConfirmationWrapper.instance() as LoginOtpConfirmation
        });

        then("User can handle the otp input field", () => {
            let firstInput = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputFirst');
            expect(firstInput.exists()).toBe(true)
            firstInput.simulate('keypress', 'first');

            let secondInput = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputSecond');
            expect(firstInput.exists()).toBe(true)
            secondInput.simulate('keypress', 'second')


            let thirdInput = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputThird');
            expect(firstInput.exists()).toBe(true)
            thirdInput.simulate('keypress', 'third')

            let fourthInput = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'txtInputFourth');
            expect(firstInput.exists()).toBe(true)
            fourthInput.simulate('keypress', 'fourth')
        })
        when("User can click the otp verify Button", () => {
            let verifyOtp = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'btnVerifyotp');
            expect(verifyOtp.text()).toEqual("Continue")
        })
        then("User can handle the otp verify by submit", () => {
            let verifyOtp = otpFormWrapper.findWhere((node) => node.prop('data-test-id') === 'btnVerifyotp');
            verifyOtp.simulate('click');
        })
        when("User can click the resend otp link", () => {
            let otpsendButoon = otpConfirmationWrapper.findWhere((node) => node.prop('data-test-id') === 'otpsendButton');
            expect(otpsendButoon.text()).toEqual("Resend code")
        })

        then('User can resend otp again by click', () => {
            let otpsendButoon = otpConfirmationWrapper.findWhere((node) => node.prop('data-test-id') === 'otpsendButton');
            otpsendButoon.simulate("click")
        });
        then("LoginOtpVerificationApiCallIdForWeb api will return success", () => {
            const msgLogInSucessRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLogInSucessRestAPI.messageId
            );
            msgLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data:  mockOTPData, 
                }
            );
            instance.LoginOtpVerificationApiCallIdForWeb = msgLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
          })
    });
})
