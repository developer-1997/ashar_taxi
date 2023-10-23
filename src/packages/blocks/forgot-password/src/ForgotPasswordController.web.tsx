import React from "react";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import { runEngine } from "framework/src/RunEngine";
import MessageEnum, {
  getName
} from "framework/src/Messages/MessageEnum";

// Customizable Area Start
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { NewPasswordForm } from "../../../components/src/NewPasswrodForm.web";
import { ForgotPassForm } from "../../../components/src/ForgotPassForm.web";
import { OtpInputField } from "../../../components/src/OtpInputFieldForgotPass.web";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  location: any;
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  forgotPassEmail: string,
  error: Object,
  email: string,
  disableBtn: boolean,
  disableResendBtn: boolean
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  forgotPassApiCallId: string = "";
  forgotPassOTPApiCallId: string = "";
  newpasswordApiCallId: string = "";
  newPassvalidation: {} = {};
  forgotPassValidation: {} = {};
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      forgotPassEmail: "",
      email: "",
      error: {},
      disableBtn: false,
      disableResendBtn: false,
      // Customizable Area End
    };

    // Customizable Area Start
    this.sendEmailForForgotPass = this.sendEmailForForgotPass.bind(this);
    this.createdNewPasswordFormHandler = this.createdNewPasswordFormHandler.bind(this);
    this.forgotPassWordFormHandler = this.forgotPassWordFormHandler.bind(this);
    this.forgotPassWordOtpHanlder = this.forgotPassWordOtpHanlder.bind(this);
    this.forgotPassValidation = Yup.object().shape({
      email: Yup.string().email('Please enter a valid email address').required('Required'),
    })

    this.newPassvalidation = Yup.object().shape({
      password: Yup.string().required('Required'),
      confirmpassword: Yup.string().required('Required').when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password & Confirm Password does not match"
        )
      }),
    })

    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const sucessJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (sucessJson && !sucessJson.errors) {

        this.apiSuccessResponse(apiRequestCallId, sucessJson)

      } else if (sucessJson && sucessJson.errors) {

        this.apiErrorResponse(apiRequestCallId, errorReponse)

      }
    }
  }
  // Customizable Area End

  // Customizable Area Start

  forgotPassWordOtpHanlder({
    values,
    handleChange,
    handleSubmit,
  }:any){ 
    return (
    <OtpInputField
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )}
  forgotPassWordFormHandler ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
}:any) {
  return (
    <ForgotPassForm
        data-test-id="forgotPassWrapperId"
        values={values}
        handleChange={handleChange}
        handleFromValidation={this.handleFromValidation}
        errors={errors}
        touched={touched}
        state={this.state}
        setFieldValue={setFieldValue}
        handleSubmit={handleSubmit}
        disableBtn={this.state.disableBtn}
    />
)
}
  createdNewPasswordFormHandler ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
}:any) {
  return (
      <NewPasswordForm
          values={values}
          handleChange={handleChange}
          handleFromValidation={this.handleFromValidation}
          errors={errors}
          touched={touched}
          state={this.state}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
      />
  )
  }
  
  apiSuccessResponse = (apiCallId: any, sucessResponse: any) => {
    if (apiCallId === this.forgotPassApiCallId) {
      this.props.history.push(`/ForgotPasswordOTP`, { email: sucessResponse?.data.attributes.email, token: sucessResponse.meta.token })
      this.setState({
        disableBtn:false
      })
    }
    if (apiCallId === this.forgotPassOTPApiCallId) {
      this.props.history.push(`/NewPassword`, { email: this.state.forgotPassEmail })
    }
    if (apiCallId === this.newpasswordApiCallId) {
      this.props.history.push(`/EmailAccountLogin`)
    }
  }

  apiErrorResponse = (apiCallId: any, errorResponse: any) => {
    if (apiCallId === this.forgotPassApiCallId) {
      this.emailNotFound()
      this.setState({
        disableBtn:false
      })
    }
    if (apiCallId === this.forgotPassOTPApiCallId) {
      this.otpNotMatch()
    }
   
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body, token } = data
    const header = {
      "Content-Type": contentType,
      token: token || ""
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMessage),
      configJSON.baseURL
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    )
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
    runEngine.sendMessage(requestMessage.id, requestMessage)
    return requestMessage.messageId
  }

  sendEmailForForgotPass = async (attrs: any) => {
    this.setState({
      disableBtn:true
    })
    let payload = {}
    payload = {
      email: attrs.email,
    }
    this.forgotPassApiCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.forgotPassEndPoint,
      body: payload
    })
  }
  newPassForForgotPass = async (attrs: any, email: any) => {
    let payload = {}
    payload = {
      password: attrs.password,
      password_confirmation: attrs.confirmpassword,
      email: email
    }
    this.newpasswordApiCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.newPasswordEndPoint,
      body: payload
    })
  }


  handleOtpFormSubmit = (values: any, url: any, token:any) => {
    this.setState({
      forgotPassEmail: url,
    })
    let str = values.otp1 + values.otp2 + values.otp3 + values.otp4
    this.OtpVerificationForWeb(str, token)
  }

  OtpVerificationForWeb = async (attrs: any, token:any) => {
    console.log("token funct", token)
    this.forgotPassOTPApiCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.forgotPassOTPEndPoint + "?pin=" + attrs,
      token: token
    })
  }

  emailNotFound = () => {
    toast.error("Email not found.")
  }
  otpNotMatch = () => {
    toast.error("Incorrect OTP")
  }
  otpSendAgain = () => {
    
    toast.info("OTP sent again")
    this.setState({
      disableResendBtn:true
    })
   
    setTimeout(() => {
      this.setState( {
        disableResendBtn: false
      })
    }, 120000);
    
  }
  handleFromValidation(error: any, touched: any) {
    return (
        <div className="errorText">
            {error && touched ? error : ""}
        </div>
    )
}
  // Customizable Area End
}
