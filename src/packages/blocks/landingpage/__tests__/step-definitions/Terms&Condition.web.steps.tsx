import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import TermsAndCondition from "../../src/Terms&Condition.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "TermsAndCondition",
  }

const feature = loadFeature('./__tests__/features/Terms&Condition-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Terms&Condition Page', ({ given, when, then }) => {
        let TermsAndConditionBlock:ShallowWrapper;

        given('I am a User loading Terms&Condition Page', () => {
            TermsAndConditionBlock = shallow(<TermsAndCondition />)
        });

        when('I navigate to the Terms&Condition Page', () => {
            TermsAndConditionBlock = shallow(<TermsAndCondition />)
        });

        then('I can see Terms&Condition Page render successfully', () => {
            expect(TermsAndConditionBlock.exists()).toBe(true)
        });
       
      
    });


});
