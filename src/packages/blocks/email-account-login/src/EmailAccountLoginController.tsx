import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import * as Yup from 'yup'
import { toast } from "react-toastify";
import redirectToPrevius from "../../../components/src/redirectToPrevius";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history:any;
  mainProps: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  token: any;
  error: object;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  loginApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  emailLoginValidation: any;
  emailLoginOtpValidation: any;
  userLoginApiCallIdForWeb: any;
  UserLoginWithOtpApiCallIdForWeb: any;
  LoginOtpVerificationApiCallIdForWeb: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      token: localStorage?.getItem("token") ? localStorage?.getItem("token") : "",
      error: {},

    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    this.emailLoginValidation = Yup.object().shape({
      type: Yup.string()
        .required('Required'),
      attributes: Yup.object().shape({
        password: Yup.string()
          .required('Required'),
        email: Yup.string()
          .required('Required')
          .email('Please enter a valid email address')
      })
    })
    this.emailLoginOtpValidation = Yup.object().shape({
      type: Yup.string()
        .required('Required'),
      attributes: Yup.object().shape({
        full_phone_number: Yup.string()
          .required('Required')
      })
    })

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };

  btnEmailLogInProps = {
    onPress: () => this.doEmailLogIn(),
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  keyEventCaptureLoginOtp = (e: any, otpCurrent: any, otpPrevious: any) => {
    if (e.key === "Backspace" && !otpCurrent) {
      document.getElementsByName(otpPrevious)[0]?.focus()
    }
  }

  userLoginAccountApiForWeb(responseJson: any, errorReponse: any) {
    if (!responseJson.errors) {
      localStorage.setItem("token", responseJson?.meta?.token)
      redirectToPrevius(this.props.history)
    }
    else {
      this.setState({
        error: responseJson.errors
      })
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }

  handleStateError = (errorType: any) => {
    switch (errorType) {
      case "email":
        this.setState({ error: { ...this.state.error, email: "" } });
        break;
      case "password":
        this.setState({ error: { ...this.state.error, password: "" } });
        break;
      case "full_phone_number":
        this.setState({ error: { ...this.state.error, full_phone_number: "" } });
        break;
      case "pin":
        this.setState({ error: {} });
        break;
    }
  }

  routeHandler = (routeName: any) => {
    this.props.navigation.navigate(routeName)
  }

  userLoginByMobileNo(responseJson: any, errorReponse: any) {
    if (!responseJson.errors) {
      localStorage.setItem("token", responseJson?.meta?.token)
      localStorage.setItem("phone_number", responseJson?.user?.data?.attributes?.phone_number)
      this.props.history?.push(`/LoginOtpConfirmation`);
    } else {
      this.setState({
        error: responseJson.errors
      })
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }

  userEnterMobileNoOtp(responseJson: any, errorReponse: any) {
    if (!responseJson?.errors) {
      localStorage.setItem("token", responseJson?.meta);
      this.props.history?.push(`/LandingPage`); 
      localStorage.removeItem("phone_number");
    } else {
      this.setState({
        error: responseJson.errors[0]
      })
    }
  }

  handleOtpFormSubmit = (values: any) => {
    let str = values.otp1 + values.otp2 + values.otp3 + values.otp4
    this.OtpVerificationForWeb(str)
  }

  createLoginForWeb = (attrs: any) => {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.userLoginApiCallIdForWeb = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userLoginApiForWeb
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({ data: attrs })
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeUserLogin
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  LoginAccountWithPhoneForWeb = (attrs: any): any => {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.UserLoginWithOtpApiCallIdForWeb = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userLoginWithOtpApiForWeb
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({ data: attrs })
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeUserSmsConfirmation
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  OtpVerificationForWeb(attrs: any): boolean {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": this.state.token ? this.state.token : null,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.LoginOtpVerificationApiCallIdForWeb = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginOtpVerificationApiForWeb + "?pin=" + attrs
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeUserSmsConfirmation
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  handleRegex = (arrayholder: any) => {
    if (arrayholder && arrayholder.length !== 0) {
      let regexData = arrayholder[0];

      if (regexData && regexData.email_validation_regexp) {
        this.emailReg = new RegExp(regexData.email_validation_regexp);
      }
    }
  }

  handleApiLoginCall = (responseJson: any) => {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      this.saveLoggedInUserData(responseJson);
      this.sendLoginSuccessMessage();
      this.openInfoPage();
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
      this.sendLoginFailMessage();
    }
  }

  handleApiCallForWeb = (apiRequestCallId: any, responseJson: any, errorReponse: any) => {
    if (apiRequestCallId === this.userLoginApiCallIdForWeb) {
      this.userLoginAccountApiForWeb(responseJson, errorReponse);
    }
    else if (apiRequestCallId === this.UserLoginWithOtpApiCallIdForWeb) {
      this.userLoginByMobileNo(responseJson, errorReponse);
    }
    else if (apiRequestCallId === this.LoginOtpVerificationApiCallIdForWeb) {
      this.userEnterMobileNoOtp(responseJson, errorReponse);
    }
  }
  otpSendAgain = () => {
    toast.info("OTP sent again")
  }

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  // Customizable Area End

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

      if (apiRequestCallId != null) {
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          var arrayholder = responseJson.data;
          this.handleRegex(arrayholder);
        }

        if (apiRequestCallId === this.apiEmailLoginCallId) {
          this.handleApiLoginCall(responseJson);
          this.parseApiCatchErrorResponse(errorReponse);
        }

        this.handleApiCallForWeb(apiRequestCallId, responseJson, errorReponse)
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    // Merge Engine - Navigation - btnEmailLogIn - Start
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
    // Merge Engine - Navigation - btnEmailLogIn - End
  }

  goToForgotPassword() {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
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
}
