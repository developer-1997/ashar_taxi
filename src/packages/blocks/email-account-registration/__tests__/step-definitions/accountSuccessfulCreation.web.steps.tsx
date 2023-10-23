//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";

import AccountSuccessCreation from "../../src/AccountSuccessfulCreation.web";

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AccountSuccessCreation"
  }

const feature = loadFeature('./__tests__/features/accountSuccessfulCreation-scenerio.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

test('Account Successful Creation Page', ({ given, when, then }) => {
    let accountSuccessCreationWrapperRegistration:ShallowWrapper;
    let instance:AccountSuccessCreation; 

    given('I am a User loading accountSuccessful page', () => {
        accountSuccessCreationWrapperRegistration = shallow(<AccountSuccessCreation {...screenProps}/>)
    });

    when('I navigate to the accountSuccessful Screen', () => {
        instance = accountSuccessCreationWrapperRegistration.instance() as AccountSuccessCreation
    });

    then('accountSuccessful page will load with out errors', () => {
      expect(accountSuccessCreationWrapperRegistration).toBeTruthy();
      expect(accountSuccessCreationWrapperRegistration).toMatchSnapshot();
    });

    then('I can leave the screen with out errors', () => {
        expect(accountSuccessCreationWrapperRegistration).toBeTruthy();
    });
});
})
