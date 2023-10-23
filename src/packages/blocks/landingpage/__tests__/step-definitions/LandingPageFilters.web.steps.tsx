import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import FilterComponent from "../../src/LandingPageFilters.web"
import RadioWrapper from "../../src/RadioWrapper.web";
const navigation = require("react-navigation")

let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
let mockLocation = {
    pathname: '/LandingPage'
}
const screenProps = {
    navigation: navigation,
    id: "FilterComponent",
    history: mockHistory,
    location: mockLocation,
    match: mockMatch,
}

const feature = loadFeature('./__tests__/features/LandingPageFilters-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LandingPage', ({ given, when, then }) => {
        let FilterComponentBlock: ShallowWrapper;
        let instance: FilterComponent;
        let RadioWrapperComponent:ShallowWrapper;

        given('I am a User loading LandingPage', () => {
            FilterComponentBlock = shallow(<FilterComponent  {...screenProps} />)
        });

        when('I navigate to the LandingPage', () => {
            instance = FilterComponentBlock.instance() as FilterComponent
        });

        then('I can see LandingPageFilters render successfully', () => {
            expect(FilterComponentBlock.exists()).toBe(true)
        });
        when('User click on confirm', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="handleRentalPeriodMenuCloseButtonDepot"]')
            confirmClick.simulate('click', { type: "depot" });
        })
        then('Dropdown is closed', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="handleRentalPeriodMenuCloseButtonDepot"]').text()
            expect(confirmClick).toBe('CONFIRM')
        })
      
        when('User click on shift selection', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="RentalPeriodGridBox"]').at(0)
            confirmClick.simulate('click', { id: 1 });
        })
        then('Shift is selected', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="RentalPeriodGridBox"]').length
            expect(confirmClick).toBe(4)
        })
        when('User click on confirm type', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="handleRentalPeriodMenuCloseButton"]')
            confirmClick.simulate('click', { type: "confirm" });
        })
        then('Dropdown is closed for depot', () => {
            const confirmClick = FilterComponentBlock.find('[data-test-id="handleRentalPeriodMenuCloseButton"]').text()
            expect(confirmClick).toBe('CONFIRM')
        })
        when('User click on Rental Depot Selection', () => {
            RadioWrapperComponent = shallow(<RadioWrapper
                handleDepotSelection={instance.handleDepotSelection}
                tempDepot={instance.state.tempDepot}
                id={"Brixton"}  
                data-test-id="Brixton"  
              />);
              console.log(RadioWrapperComponent.debug(),"shallowed")
            const confirmClick = RadioWrapperComponent.find('[data-test-id="Brixton"]')
            confirmClick.simulate('click', "Brixton" );
        })
        then('Value is selected on depot field', () => {
            RadioWrapperComponent = shallow(<RadioWrapper
                handleDepotSelection={instance.handleDepotSelection}
                tempDepot={instance.state.tempDepot}
                id={"Brixton"}  
                data-test-id="Brixton"  
              />);
              console.log(RadioWrapperComponent.debug(),"shallowed")
            const confirmClick = RadioWrapperComponent.find('[data-test-id="Brixton"]')
            const check = confirmClick.prop("checked")
            expect(check).toBe(true);
        })
    });
});

