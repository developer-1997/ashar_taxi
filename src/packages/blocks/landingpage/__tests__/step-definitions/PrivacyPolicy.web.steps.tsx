import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import {PrivacyPolicy} from "../../src/PrivacyPolicy.web"
const navigation = require("react-navigation")



const feature = loadFeature('./__tests__/features/PrivacyPolicy-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Privacy Policy Page', ({ given, when, then }) => {
        let PrivacyPolicyBlock:ShallowWrapper;

        given('I am a User loading Privacy Policy Page', () => {
            PrivacyPolicyBlock = shallow(<PrivacyPolicy />)
        });

        when('I navigate to the Privacy Policy Page', () => {
            PrivacyPolicyBlock = shallow(<PrivacyPolicy />)
        });

        then('I can see Privacy Policy Page render successfully', () => {
            expect(PrivacyPolicyBlock.exists()).toBe(true)
        });
       
      
    });


});
