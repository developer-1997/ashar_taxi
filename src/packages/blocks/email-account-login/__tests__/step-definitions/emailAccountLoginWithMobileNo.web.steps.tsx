import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper} from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import EmailAccountLoginWithMobileNo from "../../src/EmailAccountLoginWithMobileNo.web";
import { LoginWithMobileNo } from "../../../../components/src/LoginWithMobileNoForm.web";

jest.mock("formik")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "mobile-account-login-scenario",
    mainProps:"",
}

const mobileLoginProp={
    values:{
        full_phone_number:"",
    },
    handleStateError:jest.fn(),
    handleChange:jest.fn(),
    handleSubmit:jest.fn(),
    handleFormValidationForLogin:jest.fn(),
    errors:"",
    touched:""
}

const feature = loadFeature('./__tests__/features/email-account-login-with-mobileNo-scenerio.web.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Login with Mobile No', ({ given, when, then }) => {
        let mobileLoginWrapper: ShallowWrapper;
        let mobileWrapper: ShallowWrapper;
        let instance: EmailAccountLoginWithMobileNo;

        given('I am a User loading login with mobile no page', () => {
            mobileLoginWrapper = shallow(<EmailAccountLoginWithMobileNo history={undefined} {...screenProps} />)
            mobileWrapper = shallow(<LoginWithMobileNo {...mobileLoginProp} />)
            expect(mobileLoginWrapper).toBeTruthy()
            expect(mobileWrapper).toBeTruthy()
        });

        when('I navigate to the login with mobile no Screen', () => {
            instance = mobileLoginWrapper.instance() as EmailAccountLoginWithMobileNo
        });

        then('Login with mobile no page will load with out error', () => {
            expect(mobileLoginWrapper).toBeTruthy();
            expect(mobileLoginWrapper).toMatchSnapshot();
        });

        then("I can handle the mobile number in the login", () => {
            let mobileInput = mobileWrapper.findWhere((node) => node.prop('data-test-id') === 'full_phone_number');
            mobileInput.simulate('change', 'mobileNo');
            instance.handleStateError("");
        })

        then("I can handle the submit mobile number in the login",()=>{
            let submitMobileNo = mobileWrapper.findWhere((node) => node.prop('data-test-id') === 'submit_mobile_no');
            submitMobileNo.simulate('click');
        })

        then("I can handle the form validation in the login with the mobile no",()=>{
            instance.handleFormValidationForLogin("","");
        })

        then("I can handle the user login by the mobile no",()=>{
            instance.userLoginByMobileNo("","");
        })

        then("I can handle the login account with phone number",()=>{
            instance.LoginAccountWithPhoneForWeb("");
        })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(mobileLoginWrapper).toBeTruthy();
        });
    });
})
