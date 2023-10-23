import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import React from "react"
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RegistrationForm } from "../../../components/src/RegistrationForm.web";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  countryCodeSelected: string;
  phone: string;
  responseToken: any;
  responseOtp: any;
  token: any;
  error: Object,
  hasReuploaded: any;
  licenseFrontReuploadCheck: any;
  licenseBackReuploadCheck: any;
  billDocumentReuploadCheck: any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  createAccountApiCallIdForWeb: any;
  OtpVerificationApiCallIdForWeb: any;
  validationApiCallId: string = "";

  imgPasswordVisible: any;
  imgPasswordInVisible: any;

  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  emailRegistrationValidation: any;
  currentCountryCode: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      countryCodeSelected: "",
      phone: "",
      responseToken: "",
      responseOtp: "",
      hasReuploaded: { licenseFront: false, licenseBack: false },
      licenseFrontReuploadCheck: false,
      licenseBackReuploadCheck: false,
      billDocumentReuploadCheck: false,
      error: {},
      token: localStorage?.getItem("token") ? localStorage?.getItem("token") : "",
      // Customizable Area End
    };

    // Customizable Area Start
    
    this.registrationFormHanler = this.registrationFormHanler.bind(this)
    const yellowColor = "Yellow";
    const confirmPasswordValidation = Yup.string().required('Required').when("password", {
      is: val => (val?.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password & Confirm Password does not match"
      )
    })
    this.createNewAccountForWeb = this.createNewAccountForWeb.bind(this);
    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");
    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    this.emailRegistrationValidation = Yup.object().shape({
      first_name: Yup.string()
        .required('Required'),
      last_name: Yup.string()
        .required('Required'),
      full_phone_number: Yup.string()
        .required('Required').matches(/^\+(?:(?:\d,|[^\s,]){6,14}\d)$/, { message: configJSON.phoneErrorMsg, excludeEmptyString: false }),
      password: Yup.string()
        .required('Required'),
      password_confirmation: confirmPasswordValidation,
      license_number: Yup.string()
        .required('Required'),
      license_exp_date: Yup.date()
        .min(new Date().toISOString().split('T')[0], configJSON.licenseErrorMsg)
        .required('Required'),
      badge: Yup.string()
        .required('Required'),
      sector: Yup.string()
        .when("badge", {
          is: (badge) => badge === yellowColor,
          then: Yup.string().required(configJSON.badgeErrorMsg)
        }),
      badge_number: Yup.string()
        .required('Required'),
      email: Yup.string().email(configJSON.emailErrorMsg).required('Required'),
      license_front: Yup.string().required("Required"),
      license_back: Yup.string().required("Required"),
      bill_document: Yup.string().required("Required"),
    })

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.handleAPICallForRegistration(apiRequestCallId, responseJson, errorReponse)
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.handleNavigationOTPAuth(message);
    }

    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      let selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );
      this.handleSecretCode(selectedCode)
    }
    // Customizable Area End
  }

  // Customizable Area Start
  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  handleOtpFormSubmit = (values: any) => {
    let str = values.otp1 + values.otp2 + values.otp3 + values.otp4
    this.OtpVerificationForWeb(str)
  }


  handleFromValidation(error: any, touched: any) {
    return (
      <div className="errorText">
        {error && touched ? error : ""}
      </div>
    )
  }

  registrationFormHanler({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: any) {
    return (
      <RegistrationForm
        data-test-id="registrationWrapperId"
        values={values}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
        state={this.state}
        handleClickShowPassword={this.handleClickShowPassword}
        handleClickShowPasswordRetype={this.handleClickShowPasswordRetype}
        setFieldValue={setFieldValue}
        handleSubmit={handleSubmit}
        setState={this.setState}
        handleFromValidation={this.handleFromValidation}
        setReuploadedState={this.setReuploadedState}
      />
    )
  }

  handleAPICallForRegistration(apiRequestCallId: any, responseJson: any, errorReponse: any) {
    if (apiRequestCallId === this.validationApiCallId) {
      this.arrayholder = responseJson.data;

      if (this.arrayholder && this.arrayholder.length !== 0) {
        let regexData = this.arrayholder[0];
        this.handlePassWordValidation(regexData);

      }
    }
    else if (apiRequestCallId === this.createAccountApiCallId) {
      this.handleCreateAccountAPI(responseJson, errorReponse);
    }
    else if (apiRequestCallId === this.createAccountApiCallIdForWeb) {
      this.handleCreateAccountApiForWeb(responseJson, errorReponse);
    }
    else if (apiRequestCallId === this.OtpVerificationApiCallIdForWeb) {
      this.handleOTPAccountVerificationForWeb(responseJson, errorReponse)
    }
  }
  otpSendAgain = () => {
    this.setState({error: "OTP sent again"})
    toast.info("OTP sent again")
  }
  handlePassWordValidation(regexData: any) {
    if (regexData.password_validation_regexp) {
      this.passwordReg = new RegExp(
        regexData.password_validation_regexp
      );
    }

    if (regexData.password_validation_rules) {
      this.setState({
        passwordHelperText: regexData.password_validation_rules
      });
    }

    if (regexData.email_validation_regexp) {
      this.emailReg = new RegExp(regexData.email_validation_regexp);
    }
  }

  handleCreateAccountAPI(responseJson: any, errorReponse: any) {
    if (!responseJson.errors) {
      this.setState({token:responseJson.meta.token})
      const msg: Message = new Message(
        getName(MessageEnum.AccoutResgistrationSuccess)
      );
      msg.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );

      this.send(msg);
    } else {
      this.setState({error:responseJson.errors})
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }

  handleCreateAccountApiForWeb(responseJson: any, errorReponse: any) {
    if (!responseJson.errors) {
      this.setState({token:responseJson?.meta?.token})
      localStorage.setItem("token", responseJson?.meta?.token)
      this.props.history?.push(configJSON.signUpOtpConfirmationURL);
    } else {
      this.setState({ error: responseJson.errors })
      if (responseJson.errors.email) {
        toast.error(configJSON.emailExistErrorMsg)
      }
      if (responseJson.errors.full_phone_number) {
        toast.error(configJSON.phoneExistErrorMsg)
      }

    }
    this.parseApiCatchErrorResponse(errorReponse);
  }

  handleOTPAccountVerificationForWeb(responseJson: any, errorReponse: any) {
    if (!responseJson.errors) {
      this.props.history?.push(`/AccountSuccessfulCreation`);
    } else {
      toast.error("Invalid Token");
      this.setState({ error: responseJson.errors[0] })
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }

  handleNavigationOTPAuth(message: any) {
    const otpAuthTkn = message.getData(
      getName(MessageEnum.AuthTokenDataMessage)
    );
    if (otpAuthTkn && otpAuthTkn.length > 0) {
      this.setState({ otpAuthToken: otpAuthTkn });
      runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
      runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
    }
  }

  handleSecretCode(selectedCode: any) {
    if (selectedCode !== undefined) {
      this.setState({
        countryCodeSelected:
          selectedCode.indexOf("+") > 0
            ? selectedCode.split("+")[1]
            : selectedCode
      });
    }
  }
  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField
    })
  }

  handleClickShowPasswordRetype = () => {
    this.setState({
      enableReTypePasswordField: !this.state.enableReTypePasswordField
    })
  }

  setReuploadedState = (stateName: any) => {
    if (stateName === "licenseFront") {
      this.setState({ licenseFrontReuploadCheck: true })
    }
    if (stateName === "licenseBack") {
      this.setState({ licenseBackReuploadCheck: true })
    }
    if (stateName === "billDocument") {
      this.setState({ billDocumentReuploadCheck: true })
    }
  }


  createAccount(): boolean {
    if (
      this.isStringNullOrBlank(this.state.firstName) ||
      this.isStringNullOrBlank(this.state.lastName) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.password) ||
      this.isStringNullOrBlank(this.state.reTypePassword)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    }

    if (!this.passwordReg.test(this.state.password)) {
      this.showAlert(configJSON.errorTitle, configJSON.errorPasswordNotValid);
      return false;
    }

    if (this.state.password !== this.state.reTypePassword) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorBothPasswordsNotSame
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };

    const attrs = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      full_phone_number: "+" + this.state.countryCodeSelected + this.state.phone
    };

    const data = {
      type: "email_account",
      attributes: attrs
    };

    const httpBody = {
      data: data,
      token: this.state.otpAuthToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  createNewAccountForWeb(attrs: any): any {
 
    const header = {
    };
    let formdata = new FormData();
    formdata.append("license_front", attrs.license_front);
    formdata.append("license_back", attrs.license_back);
    formdata.append("bill_document", attrs.bill_document);
    formdata.append("type", "email_account");
    formdata.append("email", attrs.email);
    formdata.append("full_phone_number", attrs.full_phone_number);
    formdata.append("password", attrs.password);
    formdata.append("password_confirmation", attrs.password_confirmation);
    formdata.append("first_name", attrs.first_name);
    formdata.append("last_name", attrs.last_name);
    formdata.append("license_number", attrs.license_number);
    formdata.append("license_exp_date", attrs.license_exp_date);
    formdata.append("badge_number", attrs.badge_number);
    formdata.append("sector", attrs.sector);
    formdata.append("badge", attrs.badge);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    debugger;
    this.createAccountApiCallIdForWeb = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createAccountApiForWeb
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  OtpVerificationForWeb(attrs: any): boolean {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": this.state?.token ? this.state.token : null,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.OtpVerificationApiCallIdForWeb = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.otpVerificationApiForWeb + "?pin=" + attrs
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  imgEnableRePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField
      });
      this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
        .enableReTypePasswordField;
      this.imgEnableRePasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnSignUpProps = {
    onPress: () => this.createAccount()
  };

  btnLegalPrivacyPolicyProps = {
    onPress: () => this.goToPrivacyPolicy()
  };

  btnLegalTermsAndConditionProps = {
    onPress: () => this.goToTermsAndCondition()
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    }
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address"
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;


  txtInputLastNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNamePrpos.value = text;
    }
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    }
  };

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePassword: text });

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true
  };
  // Customizable Area End
}
