import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import SignInSignUpHeader from "../../src/SignInSignUpHeader.web";

jest.mock("formik")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "signin-signup-header-scenario",
    mainProps:"",
}

const feature = loadFeature('./__tests__/features/signInSignUpHeader.scenerio.web.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Sign In Sign Up Header', ({ given, when, then }) => {
        let signInSignUpHeaderWrapper: ShallowWrapper;
        let instance: SignInSignUpHeader;

        given('I am a User loading signInSignUpHeader page', () => {
            signInSignUpHeaderWrapper = shallow(<SignInSignUpHeader history={undefined} {...screenProps} />)
            expect(signInSignUpHeaderWrapper).toBeTruthy()
        });

        when('I navigate to the signInSignUpHeader page', () => {
            instance = signInSignUpHeaderWrapper.instance() as SignInSignUpHeader
        });

        then('SignInSignUpHeader page page will load with out error', () => {
            expect(signInSignUpHeaderWrapper).toBeTruthy();
            expect(signInSignUpHeaderWrapper).toMatchSnapshot();
        });

        then("I can handle the sign-in route in header",()=>{
            let signInClick = signInSignUpHeaderWrapper.findWhere((node) => node.prop('data-test-id') === 'sign-in-route');
        })

        then("I can handle the sign-up route in header",()=>{
            let signupClick = signInSignUpHeaderWrapper.findWhere((node) => node.prop('data-test-id') === 'sign-up-route');
            signupClick.simulate('click');
        })
        
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(signInSignUpHeaderWrapper).toBeTruthy();
        });
    });
})