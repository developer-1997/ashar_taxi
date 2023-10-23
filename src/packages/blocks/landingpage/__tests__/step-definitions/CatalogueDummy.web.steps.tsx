import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import CataloguePage from "../../src/CatalogueDummy.web"
const navigation = require("react-navigation")

let mockMatch = { params: { id: '3' } }; // Define a mock match object
let mockHistory = { push: jest.fn() }; // Define a mock history object
let mockLocation = {
    pathname: '/LandingPage'
}
const screenProps = {
    navigation: navigation,
    id: "CataloguePage",
    history: mockHistory,
    location: mockLocation,
    match: mockMatch,
}

const feature = loadFeature('./__tests__/features/CatalogueDummy-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CataloguePage', ({ given, when, then }) => {
        let CataloguePageBlock: ShallowWrapper;
        let instance: CataloguePage;

        given('I am a User loading CataloguePage', () => {
            CataloguePageBlock = shallow(<CataloguePage {...screenProps} />)
        });

        when('I navigate to the CataloguePage', () => {
            instance = CataloguePageBlock.instance() as CataloguePage
        });

        then('I can see CataloguePage render successfully', () => {
            instance.componentDidMount()
            expect(CataloguePageBlock).toBeTruthy();
            expect(CataloguePageBlock.exists()).toBe(true)
        });


    });


});
