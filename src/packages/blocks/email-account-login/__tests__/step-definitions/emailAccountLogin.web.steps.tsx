import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import EmailAccountLogin, { LoginForm } from "../../src/EmailAccountLogin.web";

jest.mock("formik")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "email-account-login-scenario",
    mainProps:"",
}

const loginProp = {
    values: {
        email: "",
        password: ""
    },
    handleChange: jest.fn(),
    state: {
        enablePasswordField: false
    },
    handleClickShowPassword: jest.fn(),
    handleSubmit: jest.fn(),
    handleFormValidation: jest.fn(),
    errors: "",
    touched: "",
    gotoEmailAccountLoginWithOtp: jest.fn(),
    routeHandler:jest.fn()
}

const feature = loadFeature('./__tests__/features/emailAccountLogin-scenerio.web.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Email Account Login', ({ given, when, then }) => {
        let emailAccountLoginWrapper: ShallowWrapper;
        let loginWrapper: ShallowWrapper;
        let instance: EmailAccountLogin;

        given('I am a User loading email login page', () => {
            emailAccountLoginWrapper = shallow(<EmailAccountLogin history={undefined} {...screenProps} />)
            loginWrapper = shallow(<LoginForm {...loginProp} />)
            expect(emailAccountLoginWrapper).toBeTruthy()
            expect(loginWrapper).toBeTruthy()
        });

        when('I navigate to the email login Screen', () => {
            instance = emailAccountLoginWrapper.instance() as EmailAccountLogin
        });

        then('Email login page will load with out error', () => {
            expect(emailAccountLoginWrapper).toBeTruthy();
            expect(emailAccountLoginWrapper).toMatchSnapshot();
        });

        then("I can handle the Email and password in account login", () => {
            let emailInput = loginWrapper.findWhere((node) => node.prop('data-test-id') === 'txt_Input_Email');
            emailInput.simulate('change', 'first')

            let passwordInput = loginWrapper.findWhere((node) => node.prop('data-test-id') === 'txt_Input_Password');
            passwordInput.simulate('change', 'first')
        })

        then("I can handle the continue button in login",()=>{
            let loginButton = loginWrapper.findWhere((node) => node.prop('data-test-id') === 'btnEmail_login');
            loginButton.simulate('click');
        })

        then("I can handle the route route handler in login",()=>{
            let routeClick = loginWrapper.findWhere((node) => node.prop('data-test-id') === 'login_with_otp');
            routeClick.simulate('click');
            instance.routeHandler("");
        })

        then("I can handle the form validation in the login",()=>{
            instance.handleFormValidation("","");
        })

        then("I can handle the click show password",()=>{
            instance.handleClickShowPassword();
        })

        then("I can handle the login api for web",()=>{
            instance.userLoginAccountApiForWeb("","");
        })
        then("I can handle the error message in the login",()=>{
            instance.handleStateError("");
        })

        then('I can handle the route handler in the login',()=>{
            instance.routeHandler("");
        })

        then("I can handle the create login for the web",()=>{
            instance.createLoginForWeb("");
        })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(emailAccountLoginWrapper).toBeTruthy();
        });
    });
})
