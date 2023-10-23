//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";
import ForgotPassword from "../../src/ForgotPassword.web"
import {ForgotPassForm} from "../../../../components/src/ForgotPassForm.web"
import SharableLeftSideTaxi from "../../../../components/src/SharableLeftSideTaxi.web";
import ForgotPassContainer from "../../src/ForgotPasswordContainer.web";


const navigation = require("react-navigation")
jest.mock("formik")

const screenProps = {
    id: "forgotpassword",
    navigation: navigation,
    onchange: () => {},
    history: { push: jest.fn(), goBack: jest.fn() },
    location: {},
}



const forgotPassSuccessForm = {
    message: "Thank You, From submited has been successfully",
};
const forgotPassErrorForm = {
    errors: "Sorry, Form submited failed",
};

const feature = loadFeature('./__tests__/features/forgotPassword-scenerio.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Forgot password', ({ given, when, then }) => {
        let forgotPasswordWrapper : ShallowWrapper;
        let forgotPasswordFormWrapper: ShallowWrapper;
        let sharableLeftSideTaxiWrapper: ShallowWrapper;
        let forgotPassContainerWrapper : ShallowWrapper;
        let instance: ForgotPassword;

        given('I am a User loading Forgot password page', () => {
            forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />)
            sharableLeftSideTaxiWrapper = shallow(<SharableLeftSideTaxi />)
            forgotPassContainerWrapper = shallow(<ForgotPassContainer />)
            expect(forgotPasswordWrapper).toBeTruthy()
            // expect(forgotPasswordFormWrapper).toBeTruthy()
            expect(sharableLeftSideTaxiWrapper).toBeTruthy();
            expect(forgotPassContainerWrapper).toBeTruthy();
        });

        when('I navigate to the Forgot password Screen', () => {
            instance = forgotPasswordWrapper.instance() as ForgotPassword
        });

        then('Forgotpassword page will load with out errors', () => {
            expect(forgotPasswordWrapper).toMatchSnapshot();
        });

        then("I can handle the form validation in the forgotpassword", () => {
            let error = "error";
            let touched = "touched"
           
        })

        then("I can handle the inputs in forgotpassword", () => {
            const forgotPassProp = {
                "data-test-id": "",
                values: {
                    email: '',
                },
                handleChange: jest.fn(),
                handleFromValidation: instance.handleFromValidation,
                errors: "",
                touched: "",
                state: {
                    enableReTypePasswordField: false 
                },
                setFieldValue: jest.fn(),
                handleSubmit: instance.sendEmailForForgotPass,
                setState: jest.fn(),
                handleStateError: instance.handleStateError
            }
            forgotPasswordFormWrapper = shallow(<ForgotPassForm {...forgotPassProp} />)
            let emailInput = forgotPasswordFormWrapper.findWhere((node) => node.prop('data-test-id') === 'forgotPassEmail');
            emailInput.simulate('change', 'email')
           
        })

        then("I can handle the submit button in forgotpassword",()=>{
            let verifyButton = forgotPasswordFormWrapper.findWhere((node) => node.prop('data-test-id') === 'forgotPassSubmitButton');
            verifyButton.simulate('click');
        })
        then("Check forgotPassword api is working",() => {
            const PostForgotPasswordFormApi = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            PostForgotPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                PostForgotPasswordFormApi.messageId
            );
            PostForgotPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(forgotPassSuccessForm))
            );
            PostForgotPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({ status: 500 }))
            );
            instance.forgotPassApiCallId =
                PostForgotPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostForgotPasswordFormApi);
            // ----
            PostForgotPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({ errors: forgotPassErrorForm, }))
            );
            instance.forgotPassApiCallId =
                PostForgotPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostForgotPasswordFormApi);
            // ------

            instance.forgotPassApiCallId =
                PostForgotPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostForgotPasswordFormApi);
            instance.apiCall({
                contentType: "application/json",
                method: "",
                endPoint: "",
                body: "",
            });
        })
        then("I can handle function for api call",() => {
            
        })
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(forgotPasswordWrapper).toBeTruthy();
        });
    });
})
