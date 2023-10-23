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
import ForgotPasswordOTPconfirmation from "../../src/CreatedNewPassword.web"
import {NewPasswordForm} from "../../../../components/src/NewPasswrodForm.web"

const navigation = require("react-navigation")
jest.mock("formik")

const screenProps = {
    id: "newPassword",
    navigation: navigation,
    onchange: () => {},
    history: { push: jest.fn(), goBack: jest.fn() },
    location: {},
}


const newPasssuccessForm = {
    message: "Thank You, From submited has been successfully",
};
const newPassErrorForm = {
    errors: "Sorry, Form submited failed",
};

const feature = loadFeature('./__tests__/features/createdNewPassword-scenerio.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('New password', ({ given, when, then }) => {
        let newPasswordWrapper : ShallowWrapper;
        let newPasswordFormWrapper: ShallowWrapper;
        let instance: ForgotPasswordOTPconfirmation;

        given('I am a User loading New password page', () => {
            newPasswordWrapper = shallow(<ForgotPasswordOTPconfirmation {...screenProps} />)
            expect(newPasswordWrapper).toBeTruthy()
            // expect(newPasswordFormWrapper).toBeTruthy()
        });

        when('I navigate to the New password Screen', () => {
            instance = newPasswordWrapper.instance() as ForgotPasswordOTPconfirmation
        });

        then('NewPassword page will load with out errors', () => {
            expect(newPasswordWrapper).toBeTruthy();
            expect(newPasswordWrapper).toMatchSnapshot();
        });
        then("I can handle the inputs in newPassword", () => {


            const newPassProps = {
                values: {
                    password: '',
                    confirmpassword:''
                },
                handleChange: jest.fn(),
                handleFromValidation: instance.handleFromValidation,
                errors: "",
                touched: "",
                state: {
                    enableReTypePasswordField: false
                },
                setFieldValue: jest.fn(),
                handleSubmit: instance.newPassForForgotPass,
            }
            newPasswordFormWrapper = shallow(<NewPasswordForm {...newPassProps} />)

            let PasswordInput = newPasswordFormWrapper.findWhere((node) => node.prop('data-test-id') === 'newFormPassword');
            PasswordInput.simulate('change', 'password')

            let ConfirmPasswordInput = newPasswordFormWrapper.findWhere((node) => node.prop('data-test-id') === 'newFormRetypePassword');
            ConfirmPasswordInput.simulate('change', 'passwordConfirm')
            
        })

        then("I can handle the submit button in newPassword",()=>{
            let verifyButton = newPasswordFormWrapper.findWhere((node) => node.prop('data-test-id') === 'newPassSubmitButton');
            verifyButton.simulate('click');
           
        })
        then("Check new password api is working",() => {
            const PostNewPasswordFormApi = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            PostNewPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                PostNewPasswordFormApi.messageId
            );
            PostNewPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(newPasssuccessForm))
            );
            PostNewPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({ status: 500 }))
            );
            instance.newpasswordApiCallId =
                PostNewPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostNewPasswordFormApi);
            // ----
            PostNewPasswordFormApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({ errors: newPassErrorForm, }))
            );
            instance.newpasswordApiCallId =
                PostNewPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostNewPasswordFormApi);
            // ------

            instance.newpasswordApiCallId =
                PostNewPasswordFormApi.messageId;
            runEngine.sendMessage("Unit Test", PostNewPasswordFormApi);
            instance.apiCall({
                contentType: "application/json",
                method: "",
                endPoint: "",
                body: "",
            });
        })
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(newPasswordWrapper).toBeTruthy();
        });
    });
})
