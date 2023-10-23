import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Stripegatewayapifrontend2 from "../../src/Stripegatewayapifrontend2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Stripegatewayapifrontend2",
    history:{
        location:{
          state:
            `{"carDetails":{"id":"3","type":"cab","attributes":{"cab_name":"LEVC TXE Comfort Plus Electric - Automatic","cab_model":"E","number_of_seats":4,"colour":"Black","charging_time":"One hour","range":400,"kms_driven":1003,"features":["feature 1","feature 2"],"depot":"Golders Green","shifts":["Half Shift - 1","Full Shift","Monthly"],"availability":true,"cab_image":"https://minio.b298406.dev.eastus.az.svc.builder.cafe/sbucket…1ae0d64d11bced2abf104e6302d2aadf9899b81d7af62a7a9b6b43fd6f7f","available_dates":[{"id":2,"cab_id":3,"start_date":"2023-08-02T00:00:00.000+01:00","end_date":"2023-11-01T00:00:00.000+00:00"}],"other_cab_images":[],"depot_information":{"id":7,"name":"Golders Green","latitude":"51.57279774978","longitude":"-0.19887145404","address":"Boots, 58-60, Golders Green Road, Golders Green, London Borough of Barnet, London, Greater London, England, NW11 8LN, United Kingdom","full_address":"101 Pine Road, Golders Green, NW11 8UA, United Kingdom"}}},"responseJson":{"message":"Booking successful","booking":{"id":77,"account_id":257,"cab_id":3,"status":"Booked","pick_up_depot":"Golders Green","drop_off_depot":"Golders Green","shift":"Half Shift - 1","pick_up_time":null,"drop_off_time":null,"duration":null,"scheduled_pick_up":"2023-10-05T07:00:00.000+01:00","scheduled_drop_off":"2023-10-05T15:00:00.000+01:00","base_price":"30.0","final_price":null,"extended_shifts":null,"extended_endtimes":null,"extended_prices":null,"extended_booking":null,"created_at":"2023-09-27T07:44:19.704+01:00","updated_at":"2023-09-27T07:44:19.704+01:00"}}}`
        }
      }
  }

const feature = loadFeature('./__tests__/features/stripegatewayapifrontend2-scenario.feature');


defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to stripegatewayapifrontend2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Stripegatewayapifrontend2; 

        given('I am a User loading stripegatewayapifrontend2', () => {
            exampleBlockA = shallow(<Stripegatewayapifrontend2 {...screenProps}/>);
        });

        when('I navigate to the stripegatewayapifrontend2', () => {
             instance = exampleBlockA.instance() as Stripegatewayapifrontend2
        });

        then('stripegatewayapifrontend2 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        when('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'A');
            let feedback = exampleBlockA.findWhere((node) => node.prop('testID') === 'feedback');
            feedback.simulate('press');
            
        });

        then('state txtSavedValue value should be change', () => {
            expect(instance.state.txtSavedValue).toEqual("A");
        });

        when('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');

        });

        then('state txtSavedValue value should be change', () => {
            expect(instance.state.txtSavedValue).toEqual("A");
        });

        when('I can press btnShowHide the button with out errors', () => {
            let btnShowHide = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnShowHide');
            btnShowHide.simulate('press');

        });

        then('state enableField value should be change', () => {
            expect(instance.state.enableField).toEqual(true);
        });

   


        
    });


});
