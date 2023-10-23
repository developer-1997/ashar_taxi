//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";
import ForgotPasswordOTPconfirmation from "../../src/ForgotPasswordOTPconfirmation.web";
import { OtpInputField } from "../../../../components/src/OtpInputFieldForgotPass.web";
import ForgotPassHeader from "../../src/ForgotPasswordHeader.web";

const navigation = require("react-navigation");
jest.mock("formik");

const screenProps = {
  id: "forgotPasswordOtpConfirmation",
  navigation: navigation,
  onchange: () => {},
  history: { push: jest.fn(), goBack: jest.fn() },
  location: { state: { email: "xyz" } }
};
const values = {
  otp1: "a",
  otp2: "a",
  otp3: "a",
  otp4: "a"
};

const forgotPassHeaderProps = {
  title: "",
  paragraph: ""
};
const forgototpSuccessForm = {
  message: "Thank You, From submited has been successfully"
};
const forgototpErrorForm = {
  errors: "Sorry, Form submited failed"
};

const feature = loadFeature(
  "./__tests__/features/forgotPasswordOTPconfirmation-scenerio.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("Forgot password Otp", ({ given, when, then, and }) => {
    let createdPasswordOTPWrapper: ShallowWrapper;
    let createdPasswordOTPFormWrapper: ShallowWrapper;
    let forgotPassHeaderWrapper: ShallowWrapper;
    let instance: ForgotPasswordOTPconfirmation;

    given("I am a User loading Forgot password otp page", () => {
      createdPasswordOTPWrapper = shallow(
        <ForgotPasswordOTPconfirmation {...screenProps} />
      );

      forgotPassHeaderWrapper = shallow(
        <ForgotPassHeader {...forgotPassHeaderProps} />
      );
      expect(createdPasswordOTPWrapper).toBeTruthy();
      // expect(createdPasswordOTPFormWrapper).toBeTruthy();
      expect(forgotPassHeaderWrapper).toBeTruthy();
    });

    when("I navigate to the Forgot password otp Screen", () => {
      instance = createdPasswordOTPWrapper.instance() as ForgotPasswordOTPconfirmation;
    });

    and("Forgotpasswordotp page create a snapshot", () => {
      // expect(createdPasswordOTPWrapper).toMatchSnapshot();
    });
    and("I can handle the forgot pasword otp input field", () => {
      const forgotPassOtpProps = {
        values: values,
        handleChange: jest.fn(),
        handleSubmit: instance.handleformSubmit
      };

      createdPasswordOTPFormWrapper = shallow(
        <OtpInputField {...forgotPassOtpProps} />
      );
      let firstInput = createdPasswordOTPFormWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotPassInputFirst"
      );
      firstInput.simulate("keypress", "first");

      let secondInput = createdPasswordOTPFormWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotPassInputSecond"
      );
      secondInput.simulate("keypress", "second");

      let thirdInput = createdPasswordOTPFormWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotPassInputThird"
      );
      thirdInput.simulate("keypress", "third");

      let fourthInput = createdPasswordOTPFormWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotPassInputFourth"
      );
      fourthInput.simulate("keypress", "fourth");
    });

    and("I can handle the submit button in forgotpasswordotp", () => {
      const forgotPassOtpProps = {
        values: values,
        handleChange: jest.fn(),
        handleSubmit: instance.handleformSubmit
      };

      createdPasswordOTPFormWrapper = shallow(
        <OtpInputField {...forgotPassOtpProps} />
      );
      let submitButton = createdPasswordOTPFormWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotPassOtpVerify"
      );

      submitButton.simulate("click", values);
    });
    and("I can handle the form resend OTP", () => {
      let resendOtp = createdPasswordOTPWrapper.findWhere(
        node => node.prop("data-test-id") === "forgotresend"
      );
      expect(resendOtp.text()).not.toEqual("Resend code");
      resendOtp.simulate("click");
    });
    and("Check forgotPassword otp api is working", () => {
      const PostForgotOtpFormApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      PostForgotOtpFormApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        PostForgotOtpFormApi.messageId
      );
      PostForgotOtpFormApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(forgototpSuccessForm))
      );
      PostForgotOtpFormApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ status: 500 }))
      );
      instance.forgotPassOTPApiCallId = PostForgotOtpFormApi.messageId;
      runEngine.sendMessage("Unit Test", PostForgotOtpFormApi);
      // ----
      PostForgotOtpFormApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ errors: forgototpErrorForm }))
      );
      instance.forgotPassOTPApiCallId = PostForgotOtpFormApi.messageId;
      runEngine.sendMessage("Unit Test", PostForgotOtpFormApi);
      instance.apiCall({
        contentType: "application/json",
        method: "",
        endPoint: ""
      });
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(createdPasswordOTPWrapper).toBeTruthy();
    });
  });
});
