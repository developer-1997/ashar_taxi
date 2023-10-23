//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper, mount } from 'enzyme'
import { Message } from "..././../../framework/src/Message";
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import EmailAccountRegistration from "../../src/EmailAccountRegistration.web";
import { RegistrationForm , HandlePassword, HandleClickShowPasswordRetype} from "../../../../components/src/RegistrationForm.web";

jest.mock("formik")

import { toast } from 'react-toastify'; // Import toast from react-toastify

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(), // Mock toast.error
  },
}));

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

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "email-account-registration-scenario"
}

const mockDataWithErrorcreateAccountApiCallIdForWeb =  {
    errors:  {
      email:"abc@gmail.com",
      full_phone_number:1234567890
    }, 
  }
  

const registartionProp = {
    values: {
        sector: '',
        password:"3242" ,
        password_confirmation: "3242",
        first_name: "",
        license_front:"index.jpg",
        license_back:"index2.jpg" ,
        bill_document:"index3.jpg" ,
        license_front:"dsdsdd"
    },
    handleChange: jest.fn(),
    handleFromValidation: jest.fn(),
    errors:{ email: "error" } ,
    touched:{ email: "touched" },
    state: {
        enableReTypePasswordField: false
    },
    setFieldValue: jest.fn(),
}

const propsVal = {
    sector: '',
    password:"3242" ,
    password_confirmation: "3242",
    first_name: "",
    license_front:"index.jpg",
    license_back:"index2.jpg" ,
    bill_document:"index3.jpg" ,
    license_front:"dsdsdd"
};

const handleProps = {
    enableReTypePasswordField : true
}

const handlePasswordProps = {       
    enablePasswordField : true
}

const feature = loadFeature('./__tests__/features/emailAccountRegistration-scenerio.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Register Email Account', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let registrationWrapper: ShallowWrapper;
        let handlePasswordWrapper : ShallowWrapper;
        let handleConfirmPasswordWrapper : ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User loading Registration page', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            
            registartionProp.setReuploadedState = instance.setReuploadedState;
            registartionProp.handleSubmit = instance.createNewAccountForWeb ;
            registartionProp.handleClickShowPassword = instance.handleClickShowPassword;
            registartionProp.handleClickShowPasswordRetype = instance.handleClickShowPasswordRetype;
            registartionProp.handleFromValidation = instance.handleFromValidation;

            registrationWrapper = shallow(<RegistrationForm {...registartionProp} />)
      
            handleProps.handleClickShowPasswordRetype = instance.handleClickShowPasswordRetype
            handleConfirmPasswordWrapper = shallow(<HandleClickShowPasswordRetype {...handleProps} />)

            handlePasswordProps.handleClickShowPassword = instance.handleClickShowPassword
            handlePasswordWrapper = shallow(<HandlePassword {...handlePasswordProps} />)
        });

        when('I navigate to the Registration Screen', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });

        then('Registration page will load with out errors', () => {
            let RegistrationWrapper = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('data-test-id') === 'signIN');
           
            expect(RegistrationWrapper.text()).toBe("Sign In")
            
        });

        when("click on sign up tab" , () => {
            let RegistrationWrapper = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('data-test-id') === 'signIN');
            RegistrationWrapper.simulate('click')
        })

        then("should open sign up form and sign up button should be there with content Sign Up", () => {
            let verifyButton = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'btnEmailVerify');
            expect(verifyButton.text()).toBe("Sign Up")
        })

        when("when i input in first name" , () => {
            let firstNameInput = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'txtFirstName');
            firstNameInput.simulate('change', 'first')
        })

        then("I can handle the firstname in account registration", () => {
           
            expect(registartionProp.handleChange).toBeCalled()
        })


        when("I click re-type password in registration",()=>{
            let verifyButton = handleConfirmPasswordWrapper.findWhere((node) => node.prop('data-test-id') === 'iconButton');
            verifyButton.simulate('click');
        })

        then("enableReTypePasswordField should be update and it will be false",()=>{
            expect(instance.state.enableReTypePasswordField).toBe(false)            
        })

        when("I can handle the deleteFront button in registration",()=>{
            let deleteImage = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'deleteFront');
            deleteImage.simulate('click');
        })

        then("state value of licenseFrontReuploadCheck should be true",()=>{
            expect(instance.state.licenseFrontReuploadCheck).toBe(true)
            
        })

        when("I can handle the deleteBack button in registration",()=>{

            let deleteImageBack = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'deleteBack');
            deleteImageBack.simulate('click');
        })

        then("state value of licenseBackReuploadCheck should be true",()=>{
            expect(instance.state.licenseBackReuploadCheck).toBe(true)
        })

        when("I can handle the deleteBill button in registration",()=>{
        
            let deleteImageBill = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'deleteBill');
            deleteImageBill.simulate('click');
        })

        then("state value of billDocumentReuploadCheck should be true",()=>{
            expect(instance.state.billDocumentReuploadCheck).toBe(true)
        })


        then("I can handle the verify button in registration",()=>{
            let verifyButton = registrationWrapper.findWhere((node) => node.prop('data-test-id') === 'btnEmailVerify');
            verifyButton.simulate('click' , propsVal);
        })


        when("I can handle the show/hide password",()=>{
            let verifyButton = handlePasswordWrapper.findWhere((node) => node.prop('data-test-id') === 'iconButton');
            verifyButton.simulate('click');
        })

        then("enablePasswordField state value will change",()=>{
            expect(instance.state.enablePasswordField).toBe(false)
        })

        when("registration form submit with already register phone and email",()=>{
            mockApiCall(instance, "createAccountApiCallIdForWeb", mockDataWithErrorcreateAccountApiCallIdForWeb, MessageEnum.RestAPIResponceSuccessMessage);

        })

        then("toastr error should be appear",()=>{
            expect(toast.error).toHaveBeenCalledWith("Email Id already exist")
            expect(toast.error).toHaveBeenCalledWith("Phone Number already exist.")

        })

      
    });
})
