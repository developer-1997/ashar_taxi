import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { toast } from 'react-toastify';


interface carDetailsInterface {
  id: string;
  attributes: {
    cab_image: string;
      cab_name: string;
      depot_information: {
        longitude: string;
        full_address: string;
        latitude: string;
        address: string;
        name: string;
    };
    colour: string;
      other_cab_images: string[];
      shifts: string[];
      number_of_seats: number;
     
  }
}
interface PayloadInterface {
  pick_up: string;
  cab_id: string,
  shift: string,
  drop_off: string;
}

interface PaymentPayload {
  billing_id: string,
  booking_id: string,
}

interface CancelPayload {
  booking_id: string,
}


// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  carDetails:carDetailsInterface,
  bookingDetails:any,
  pricingDetails:any,
  loading:boolean,
  billing_id:string,
  InvalidTokenModal:boolean,
  paymentSuccessResponse:any,
  pathname:string ,
  booking_id:string ,
  bookingCancelStatus:boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Stripegatewayapifrontend2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  confirmPaymentApiCallId:any;
  postBookingsApiCallId:any;
  postPaymentSessionApiCallId:any;
  cancelBookingApiCallId:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    const parseData = this.props.history.location.state && JSON.parse(this.props.history.location.state)
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      carDetails:parseData?.carDetails,
      bookingDetails:parseData?.bookingDetails ,
      billing_id:"",
      pricingDetails:"" ,
      InvalidTokenModal:false,
      loading:false,
      paymentSuccessResponse:"",
      pathname:"" ,
      booking_id:"",
      bookingCancelStatus:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    let errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
  );

    switch (apiRequestCallId) {
      case this.confirmPaymentApiCallId:
        this.getConfirmPaymentDetail(responseJson, message)
        break;
      case this.postBookingsApiCallId:
        this.getBookingDetails(responseJson, message , errorReponse)
        break;
      case this.postPaymentSessionApiCallId:
        this.getPaymentSessionDetails(responseJson, message)
      case this.cancelBookingApiCallId:
        this.getCancelBookingDetails(responseJson, message)

    } 
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  async componentDidMount() {
    let { pathname , search }= this.props.history.location
    const tokan = window.localStorage.getItem("token")
    if (!tokan) {
     this.setState({InvalidTokenModal : true}) 
    } 

    if(["/payment/success" ,  "/payment/failed" ].includes(pathname)) {
      this.setState({pathname})
      const str = search.split("&");
      const bookingString = str.length && str[0].split("=");
      const booking_id = bookingString.length && bookingString[1];
      const sessionIdString = str.length > 1 && str[1].split("=");
      const session_id = sessionIdString.length && sessionIdString[1];
      this.setState({booking_id})
      booking_id ? this.handleCheckConfirmatiom(booking_id , session_id) : toast.error("Booking details not found")
    }
  }
  

  handleCheckConfirmatiom = (booking_id:string , session_id:string) => {
    this.setState({loading:true})
   
    const tokan = window.localStorage.getItem("token")

    if (tokan) {
      this.postCheckConfirmation(booking_id , session_id , tokan)
    } else {
      this.props.history.push('/EmailAccountLogin')  
    }
  }

  handleBooking = () => {
    this.setState({loading:true})
    const { carDetails, bookingDetails } = this.state
    const tokan = window.localStorage.getItem("token")
    if (tokan) {
        const payload = {
            cab_id: +carDetails.id,
            ...bookingDetails
        }
        this.postBookings(tokan, payload)

    } else {
        this.setState({ InvalidTokenModal: true , loading:false})
    }
  }


  postBookings = (token: any, payload: PayloadInterface) => {
    const header = {
        "Content-Type": "application/json",
        token: token,
    };

    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    this.postBookingsApiCallId = requestMessage.messageId;
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.bookingApiEndPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(payload)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getBookingDetails = (responseJson:any , message:Message , errorReponse:any) => {
    if (responseJson && !responseJson.errors) { 
      const {billing_id , booking_id } = responseJson;
      this.handlePaymentSession(billing_id , booking_id)
    }else {
      this.setState({loading:false})
      this.setState({ InvalidTokenModal: true })
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }


  handlePaymentSession = (billing_id:string , booking_id:string) => {
    this.setState({loading:true})
    const tokan = window.localStorage.getItem("token")
    if (tokan) {
        const payload = {
            booking_id:booking_id,
            billing_id:billing_id
        }

        this.postPaymnetSession(tokan, payload)

    } else {
        this.setState({ InvalidTokenModal: true , loading:false})
    }
  }

  postPaymnetSession = (token: any, payload: PaymentPayload) => {
    const header = {
        "Content-Type": "application/json",
        token: token,
    };

    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    this.postPaymentSessionApiCallId = requestMessage.messageId;
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.paymentSessionApiEndPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(payload)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getPaymentSessionDetails = (responseJson:any , message:Message) => {
    if (responseJson && !responseJson.errors) { 
      const {url } = responseJson.body;
      this.setState({loading:false})
      window.location.replace(url);
    }else {
      this.setState({loading:false})
      responseJson.errors && responseJson.errors.length && toast.error("Server internal error")
    }
   
  }

  getConfirmPaymentDetail = (responseJson:any , message:Message) => {
    if(responseJson && !responseJson.errors &&  !responseJson.error) {
        this.setState({paymentSuccessResponse:responseJson , loading:false})
    } else {
      this.setState({loading:false})
      responseJson.errors && responseJson.errors.length && toast.error("Booking details not found")
      responseJson.error && toast.error(responseJson.error)
      setTimeout(()=> {
        this.props.history.push('/LandingPage')
      },2000)
    }

  }

  postCheckConfirmation = (booking_id:string , session_id:string , token:string) => {

    const header = {
      "Content-Type": configJSON.cardTokenApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.confirmPaymentApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.confirmPaymnetApiEndPoint+"?booking_id="+booking_id+"&session_id="+session_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.confirmPaymentApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleCancelBooking = () => {
    this.setState({loading:true})
    const tokan = window.localStorage.getItem("token")
    const { booking_id } = this.state 
    if (tokan) {
        const payload = {
            booking_id
        }

        this.postCancelBooking(tokan, payload)

    } else {
        this.setState({ InvalidTokenModal: true , loading:false})
    }
  }

  postCancelBooking = (token:string , payload:CancelPayload) => {
  
    this.setState({loading:true})

    const header = {
      "Content-Type": configJSON.cardTokenApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.cancelBookingApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cancelBookingAPIRestPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.cancelBookingMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getCancelBookingDetails =  (responseJson:any , message:Message) => {
    this.setState({loading:false})
    if(responseJson.message) {
      this.setState({bookingCancelStatus :true})
    } else {
      toast.error(responseJson.error) ;
      setTimeout(()=> {
        this.props.history.push('/LandingPage')
      },2000)
    }
  }


  redirectToLogin = () => {
    this.props.history.push('/EmailAccountLogin')
  }

  redirectToLanding = () => {
    this.props.history.push('/LandingPage')
  }

  handleCloseInvalidTokenModal = () => {
    this.setState({ InvalidTokenModal: false })
  }

  // Customizable Area End
}