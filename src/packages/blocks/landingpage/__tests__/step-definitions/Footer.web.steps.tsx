import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import FooterComponent from "../../src/Footer.web"
const navigation = require("react-navigation")
let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
let mockLocation ={
  pathname:'/LandingPage'
}

const screenProps = {
navigation: navigation,
id: "FooterComponent",
history: mockHistory,
location: mockLocation,
match: mockMatch,
  }

const feature = loadFeature('./__tests__/features/Footer-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LandingPage', ({ given, when, then }) => {
        let FooterComponentBlock:ShallowWrapper;
        let instance:FooterComponent; 

        given('I am a User loading LandingPage', () => {
            FooterComponentBlock = shallow(<FooterComponent {...screenProps}/>)
        });

        when('I navigate to the LandingPage', () => {
             instance = FooterComponentBlock.instance() as FooterComponent
        });

        then('I can see Footer render successfully', () => {
            instance.componentDidMount()
            expect(FooterComponentBlock).toBeTruthy();
            expect(FooterComponentBlock.exists()).toBe(true)
        });
       
      
    });


});
