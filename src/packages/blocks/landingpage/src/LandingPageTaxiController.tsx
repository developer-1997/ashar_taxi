import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { imgElectric_Taxi_Rental_mage } from "./assets";



// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Match {
  params: Params;
}

export interface Params {
  id: string;
}
export interface Props {
  navigation?: any;
  id?: string;
  prop?: any;
  match?: Match;
  history?: any;
  location?:any;
  supportData?:{support_email:string,support_number:string}
  // Customizable Area Start
  // Customizable Area End
}

const RentalTimeData: any = {
  "Weekly": {
    "time": "07:00 - 18:00"
  },
  "Monthly": {
    "time": "07:00 - 18:00"
  },
  "Full Shift": {
    "time": "07:00 - 18:00"
  },
  "Half Shift - 1": {
    "time": "07:00 - 15:00"
  },
  "Half Shift - 2": {
    "time": "16:00 - 23:00"
  }
}

interface S {
  // Customizable Area Start
  anchorEl: any
  open: any,
  dateMenuOpen: boolean,
  RentalPeriodMenuOpen: boolean,
  isSelectRentalPeriod: boolean,
  selectedRentalPeriodValue: string,
  prevElement: any,
  LocationMenuOpen: boolean,
  isUserLoggedIn: boolean,
  rentalCarData: { image: string, shift: string, price: string }[],
  carData: any[],
  rentalShift: string,
  shiftTime:any,
  tempDepot:string,
  rentalDepot:string,
  rangeDate: any,
  rentalPeriod: any[],
  supportData?:{support_email:string,support_number:string}
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageTaxiController extends BlockComponent<
  Props,
  S,
  SS
> {
  getUserApiCallId: string = "";
  getSupportCallId:string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
    this.state = {
      anchorEl: null,
      open: false,
      dateMenuOpen: false,
      RentalPeriodMenuOpen: false,
      isSelectRentalPeriod: false,
      selectedRentalPeriodValue: "",
      prevElement: [],
      LocationMenuOpen: false,
      isUserLoggedIn: false,
      rentalCarData: [],
      carData: [],
      rangeDate: [],
      rentalShift: "",
      shiftTime:"",
      tempDepot:"",
      rentalDepot:"",
      supportData:{support_email:"",support_number:""},
      rentalPeriod: [
        {
          id: 1,
          heading: 'HALF SHIFT',
          value:"Half Shift - 1",
          price: '70',
          img: imgElectric_Taxi_Rental_mage
        },
        {
          id: 2,
          heading: 'FULL SHIFT',
          value:"Full Shift",
          price: '90',
          img: imgElectric_Taxi_Rental_mage
        },
        {
          id: 3,
          heading: 'WEEKLY',
          value:"Weekly",
          price: '380',
          img: imgElectric_Taxi_Rental_mage
        },
        {
          id: 4,
          heading: 'MONTHLY',
          value:"Monthly",
          price: '1500',
          img: imgElectric_Taxi_Rental_mage
        }
      ]
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getCabsDataLandingPage = (productData: { errors: string, data: [] }, message: Message) => {
    if (productData && !productData.errors && productData.data) {
      this.setState({ carData: productData.data })

    } else {
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  getSupportData = (productData: { support_email : string , support_number : string}, message: Message) => {
    if (productData) {
      this.setState({ supportData : {support_email:productData.support_email, support_number: productData.support_number} })
    } else {
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );
    switch (apiRequestCallId) {
      case this.getUserApiCallId:
        this.getCabsDataLandingPage(responseJson, message)
        break;
      case this.getSupportCallId:
        this.getSupportData(responseJson, message)
        break;
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };

   handleDepotSelection = (value:string) =>{
    this.setState({tempDepot:value})
  }
  handleRentalPeriodMenuClose = (type: string) => {
    if (type === "confirm") {
      let filteredValue = this.state.rentalPeriod.filter(item => item.selected)
      this.setState({ rentalShift: filteredValue[0].value })
      this.setState({shiftTime : RentalTimeData[filteredValue[0].value].time})
    }
    if(type === "depot"){
      this.setState({rentalDepot : this.state.tempDepot})
    }
    document.getElementById('root')?.click()
  };
  
  handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  };

  handleRentalCarData = () => {
    let arr = [{ id: 1, image: imgElectric_Taxi_Rental_mage, shift: 'Daily', price: 'From £90' },
    { id: 2, image: imgElectric_Taxi_Rental_mage, shift: 'Weekly', price: 'From £90' },
    { id: 3, image: imgElectric_Taxi_Rental_mage, shift: 'Monthly', price: 'From £90' },
    { id: 4, image: imgElectric_Taxi_Rental_mage, shift: 'Half/ Full Shifts', price: 'From £90' }]
    this.setState({ rentalCarData: arr })
  }

  handleBackground = (id: any) => {
    const rentalPeriod = this.state.rentalPeriod.map((item) => {
      if (item.id === id) {
        item.selected = true
      } else {
        item.selected = false
      }
      return item
    })
    this.setState({ rentalPeriod })
  }

  componentDidMount(): any {
    this.handleRentalCarData();
    this.getFooterData();
    if(this.props?.location?.pathname === "/LandingPage" || this.props?.location?.pathname === "/"){
    this.testData();
  }
    let token: string | null | undefined = window.localStorage.getItem("token");
    token && this.setState({ isUserLoggedIn: true });
  }


  testData = () => {
  
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUserApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cabsApiEndPoint
     );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.getUserApiCallId;
  };

  getFooterData = () => {
  
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSupportCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.footerAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.getSupportCallId;
  };


  // Customizable Area End
}
