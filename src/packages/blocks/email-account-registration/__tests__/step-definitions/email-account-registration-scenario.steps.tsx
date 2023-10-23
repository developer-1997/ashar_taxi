//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";

import EmailAccountRegistration from "../../src/EmailAccountRegistration"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "email-account-registration-scenario"
  }
  const mockDataValid = {
    data: [
        {
            "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
            "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
            "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
        }
    ]
}
const mockDataLoginToken = {
    meta: {
        token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
    }
}

const mockDataLogin = {
    errors: [
        {
            "failed_login": "Login Failed"
        }
    ]
}
const feature = loadFeature('./__tests__/features/email-account-registration-scenario.feature');

const setMockApiResponse = jest. fn(async (instance: any, from: string, requestMessage: Message, payload?: any) => {
    const testResponseMessage = new Message(
      getName (MessageEnum. RestAPIResponceMessage)
    );
  testResponseMessage.messageId = requestMessage.messageId;
    testResponseMessage.addData(
      getName (MessageEnum. RestAPIResponceDataMessage),
      testResponseMessage.messageId
    );
  
  if (payload) {
    testResponseMessage.addData(
      getName (MessageEnum. RestAPIResponceSuccessMessage),
      payload
    )}
  
    const { receive: MockRecieve } = instance;
    await MockRecieve (from, testResponseMessage);
  });


const mockApiCall = jest.fn().mockImplementation((instance: any, apiCallId: string, apiData: any, responseType: number) => {
    const msgDeviceTokenAPI = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    msgDeviceTokenAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgDeviceTokenAPI.messageId
    );
    msgDeviceTokenAPI.addData(
      getName(responseType),
      apiData
    );
    instance[apiCallId] = msgDeviceTokenAPI.messageId;

    const runEngineMock = jest.fn().mockImplementation( async (from : string , message : Message ) => {
        await setMockApiResponse(instance , "test environment" , message , apiData )
      })

    runEngineMock("Api Test", msgDeviceTokenAPI);
  });

  const mockApiCallSecond = jest.fn().mockImplementation(( apiData: any, apiType:string ,  responseType: number, instance:any) => {
    const msgDeviceTokenAPI = new Message(
      getName(apiType)
    );

    msgDeviceTokenAPI.addData(
      getName(responseType),
      apiData
    );
    
    const runEngineMock = jest.fn().mockImplementation( async (from : string , message : Message ) => {

        const testResponseMessage = new Message(
            getName(apiType)
        );

        testResponseMessage.addData(
            getName(responseType),
            apiData
        );
    
        testResponseMessage.addData(
            getName (MessageEnum. RestAPIResponceDataMessage),
            testResponseMessage.messageId
        );
        
        const { receive: MockRecieve } = instance;
        await MockRecieve (from, testResponseMessage);

    })

    runEngineMock("Api Test", msgDeviceTokenAPI);
  });


defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Register Email Account', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register after confirming OTP', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });


        when('I can toggle the Password Show/Hide with out errors', () => {
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            buttonComponent.simulate('press')
        });

        then('enablePasswordField should be false', () => {
            expect(instance.state.enablePasswordField).toBe(false)
        });

    
        when('I can toggle the Confimation Password Show/Hide with out errors', () => {
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnConfirmPasswordShowHide');
            buttonComponent.simulate('press')
        });

        then('enableReTypePasswordField should be false', () => {
            expect(instance.state.enableReTypePasswordField).toBe(false)
        });

        

        when('I can select the Submit button with out errors', () => {

            mockApiCallSecond("+911234567890" , MessageEnum.CountryCodeMessage , MessageEnum.CountyCodeDataMessage , instance)
            mockApiCallSecond("91+1234567890" , MessageEnum.CountryCodeMessage , MessageEnum.CountyCodeDataMessage , instance)

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalTermsAndCondition');
            buttonComponent.simulate('press')

            buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalPrivacyPolicy');
            buttonComponent.simulate('press')

            buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnSignUp');
            buttonComponent.simulate('press')

            mockApiCall(instance, "createAccountApiCallId", mockDataLoginToken, MessageEnum.RestAPIResponceSuccessMessage);

        });

        then('token value should be update', () => {
            expect(instance.state.token).toBe(mockDataLoginToken.meta.token)
        })
        

    });
    test('Empty First Name', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
           
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration;
        });

        when('I Register with an empty First Name', () => {
            let textInputSecondComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputLastName');
            textInputSecondComponent.simulate('changeText', 'LAST');

            let textInputEmailComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputEmailComponent.simulate('changeText', 'aaaab@b.com');


            let textInputPasswordComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputPasswordComponent.simulate('changeText', 'password123!!');

            let textInputCNFComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputCNFComponent.simulate('changeText', 'password123!!');

            let buttonLegalComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalTermsAndCondition');
            buttonLegalComponent.simulate('press')

            let buttonPrivacyComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalPrivacyPolicy');
            buttonPrivacyComponent.simulate('press')

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnSignUp');
            buttonComponent.simulate('press')
        });

     

        then('Registration Should Fail', () => {

        
         expect(instance.createAccount()).toBe(false);
        });

        
        
    });

    test('Invalid Email', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            
        });

        when('I Register with an Invalid Email', () => {

            mockApiCall(instance, "validationApiCallId", mockDataValid, MessageEnum.RestAPIResponceSuccessMessage);
            mockApiCallSecond("USER-TOKEN" , MessageEnum.NavigationPayLoadMessage , MessageEnum.AuthTokenDataMessage , instance)
        });
        
        then('arrayholder should have value', () => {
            expect(instance.arrayholder).toBe(mockDataValid.data)

        });

        when('wrong email format input', () => {

            let textInputFirstComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
            textInputFirstComponent.simulate('changeText', 'FIRST');

            let textInputSecondComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputLastName');
            textInputSecondComponent.simulate('changeText', 'LAST');

            let textInputEmailComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputEmailComponent.simulate('changeText', 'a');


            let textInputPasswordComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputPasswordComponent.simulate('changeText', 'password123!!');

            let textInputCNFComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputCNFComponent.simulate('changeText', 'password123!!');

            let buttonLegalComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalTermsAndCondition');
            buttonLegalComponent.simulate('press')

            let buttonPrivacyComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalPrivacyPolicy');
            buttonPrivacyComponent.simulate('press')

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnSignUp');
            buttonComponent.simulate('press')
        });

        then('Registration Should Fail', () => {
            expect(instance.createAccount()).toBe(false);

        });

      
        
    });
    




    test('Password and RePassword do not match', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration 

        });

        when('I Register with Password and RePassword that do not match', () => {

            let textInputFirstComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
            textInputFirstComponent.simulate('changeText', 'FIRST');

            let textInputSecondComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputLastName');
            textInputSecondComponent.simulate('changeText', 'LAST');

            let textInputEmailComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputEmailComponent.simulate('changeText', 'aaaab@b.com');


            let textInputPasswordComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputPasswordComponent.simulate('changeText', 'password123!!');

            let textInputCNFComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputCNFComponent.simulate('changeText', 'password!!');

            let buttonLegalComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalTermsAndCondition');
            buttonLegalComponent.simulate('press')

            let buttonPrivacyComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalPrivacyPolicy');
            buttonPrivacyComponent.simulate('press')

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnSignUp');
            buttonComponent.simulate('press')
        });

        then('Registration Should Fail', () => {

         expect(instance.createAccount()).toBe(false);
        });

        when('RestAPI will return an error', () => {
            mockApiCall(instance, "createAccountApiCallId", mockDataLogin, MessageEnum.RestAPIResponceSuccessMessage);
        });

        then('error state should be set', () => {
            expect(instance.state.error).toBe(mockDataLogin.errors);
        });
        
    });

    test('Valid Registration', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountRegistration; 

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps}/>)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration 
        });

        when('I Register with all valid data', () => {
            let textInputFirstComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
            textInputFirstComponent.simulate('changeText', 'FIRST');

            let textInputSecondComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputLastName');
            textInputSecondComponent.simulate('changeText', 'LAST');

            let textInputEmailComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputEmailComponent.simulate('changeText', 'aaaab@b.com');


            let textInputPasswordComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputPasswordComponent.simulate('changeText', 'password123!!');

            let textInputCNFComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputCNFComponent.simulate('changeText', 'password123!!');

            let buttonLegalComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalTermsAndCondition');
            buttonLegalComponent.simulate('press')

            let buttonPrivacyComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnLegalPrivacyPolicy');
            buttonPrivacyComponent.simulate('press')

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnSignUp');
            buttonComponent.simulate('press')
        });

        then('Registration Should Succeed', () => {

            expect(instance.createAccount()).toBe(true);
        });

        when('RestAPI will return token', () => {

            mockApiCall(instance, "createAccountApiCallId", mockDataLoginToken, MessageEnum.RestAPIResponceSuccessMessage);

        });

        then('token value should be update', () => {

            expect(instance.state.token).toBe(mockDataLoginToken.meta.token);
        });
        
    });
});
