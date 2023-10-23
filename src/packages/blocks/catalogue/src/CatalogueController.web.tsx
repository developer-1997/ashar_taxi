import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import moment from "moment";

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
  navigation: any;
  id: string;
  handleSearch?: () => void;
  match: Match;
  history: any;
  location: any;

  // Customizable Area Start
  // Customizable Area End
}
export interface Card {
  element: any;
  datatestId: string;
  key: any;
}


interface S {
  arrayHolder: any;
  token: string;
  cabsData: any;
  shiftCheck: string | null;
  depotCheck: string;
  tempDepotCheck: string;
  rentalPriceFilter: object;
  rentalTimeFilter: object;
  search: boolean;
  filteredCabsData: any;
  message: string;
  startDate: string;
  endDate: string;
  depotList: Array<string>;
  nearestLocation: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

interface RentalDataItem {
  price: number;
  shift_name: string;
  // Other properties in your item object, if any
}
interface RentalDurationItem {
  attributes: {
    shift_name: string,
    start_time: string,
    end_time: string,
  }
  // Other properties in your item object, if any
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  getProductApiCallId: any;
  getCabsTimeApiCallId: any;
  getCabsRentalApiCallId: any;
  getDepotsApiCallId: any;
  getProductParamsApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDepotChange = this.handleDepotChange.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      cabsData: [],
      filteredCabsData: [],
      shiftCheck: "",
      tempDepotCheck: '',
      rentalPriceFilter: {},
      rentalTimeFilter: {},
      depotCheck: "",
      search: false,
      message: '',
      startDate: '',
      endDate: '',
      depotList: [],
      nearestLocation: '',

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    if (this.state.cabsData.length === 0) {
      const query = new URLSearchParams(this.props.location.search);
      this.getCabsData("token", configJSON.productAPiEndPoint)
      if (query) {
        if (query.get('depot') || query.get('shift') || (query.get('startDate') && query.get('endDate'))) {
          this.getParamBasedStates()
        }
      }
    }
    this.getPricesForCabs("token", configJSON.rentalPricesApiEndPoint)
    this.getRentalTime("token", configJSON.rentalTimeApiEndPoint)

  }

  getParamBasedStates = () => {
    const query = new URLSearchParams(this.props.location.search);
    let param = configJSON.productAPiEndPoint;
    const shift = query.get('shift');
    const depot = query.get('depot');
    const startDate = query.get('startDate');
    const endDate = query.get('endDate');
    if (depot && shift) {
      param = `${configJSON.productAPiEndPoint}?shift=${shift}&depot=${depot}`;
    } else if (!depot && shift) {
      param = `${configJSON.productAPiEndPoint}?shift=${shift}`;
    } else if (depot && !shift) {
      param = `${configJSON.productAPiEndPoint}?depot=${depot}`;
    }
    if (startDate && endDate) {
      const dateParams = `start_date=${startDate}&end_date=${endDate}`;
      param = shift || depot ? `${param}&${dateParams}` : `${param}?${dateParams}`;
    }
    this.getCabsData("token", param);
    if (shift) {
      this.setState({ shiftCheck: shift });
    }
    if (depot) {
      this.setState({ depotCheck: depot, tempDepotCheck: depot });
    }
    if (startDate && endDate) {
      this.setState({ startDate, endDate });
    }
  }

  getProductData = (productData: { errors: string, data: object }, message: Message) => {
    if (productData && !productData.errors && productData.data) {
      this.setState({ cabsData: productData.data });
    } else {
      this.setState({ message: 'No Cabs Available' });
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  getProductFilteredData = (productData: { errors: string, data: object }, message: Message) => {
    if (productData && !productData.errors && productData.data) {
      this.setState({ filteredCabsData: productData.data, message: '' });
    } else {
      this.setState({ filteredCabsData: [], message: 'No Cabs Available' });
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  getCabsRentalPriceData = (productData: { errors: string, prices: [] }, message: Message) => {
    if (productData && !productData.errors && productData.prices) {
      let rentalFilter: { [shiftName: string]: any } = {};
      productData.prices.forEach((item: RentalDataItem) => {
        rentalFilter[item.shift_name] = { price: item.price }
      })
      this.setState({ rentalPriceFilter: rentalFilter })

    } else {
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  getCabsTimeRentalData = (productData: { errors: string, data: [] }, message: Message) => {
    if (productData && !productData.errors && productData.data) {
      let timeFilter: { [shiftName: string]: any } = {};
      productData.data.forEach((item: RentalDurationItem) => {
        timeFilter[item.attributes.shift_name] = { time: `${item.attributes.start_time} - ${item.attributes.end_time}` }
      })

      this.setState({ rentalTimeFilter: timeFilter })

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
      case this.getProductApiCallId:
        this.getProductData(responseJson, message)
        break;
      case this.getProductParamsApiCallId:
        this.getProductFilteredData(responseJson, message)
        break;
      case this.getCabsRentalApiCallId:
        this.getCabsRentalPriceData(responseJson, message)
        break;

      case this.getCabsTimeApiCallId:
        this.getCabsTimeRentalData(responseJson, message)
        break;

    }

    // Customizable Area End
  }



  getCabsData = (token: string, param: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (param === "cabs") {
      this.getProductApiCallId = requestMessage.messageId;
    }
    else {
      this.getProductParamsApiCallId = requestMessage.messageId
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      param
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getPricesForCabs = (token: string, param: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCabsRentalApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      param
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getRentalTime = (token: string, param: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCabsTimeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      param
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };


  handleRentalPeriodMenuClose = () => {
    document.getElementById('root')?.click()
  };



  handleChange = (event: { target: { value: string } }) => {
      this.setState({ shiftCheck: event.target.value === this.state.shiftCheck ? "" : event.target.value })
  };


  handleDepotChange = (event: { target: { value: string } }) => {
    if (event.target.value) {
      this.setState({ tempDepotCheck: event.target.value === this.state.tempDepotCheck ? "" : event.target.value })
    }
  };

  handleConfirm = () => {
    this.setState({ depotCheck: this.state.tempDepotCheck, nearestLocation: "" })
    this.handleRentalPeriodMenuClose()
  }

  getSearchParamList = (paramValue : string,dateValue:string) =>{
    const { depotCheck, nearestLocation, shiftCheck, startDate, endDate } = this.state;
    if (startDate && endDate) {
      dateValue = `start_date=${startDate}&end_date=${endDate}`;
    }
    if ((depotCheck.length || nearestLocation) && shiftCheck?.length) {
      paramValue = `${configJSON.productAPiEndPoint}?shift=${shiftCheck}&depot=${depotCheck || nearestLocation}`;
    } else if ((depotCheck.length === 0 || nearestLocation.length === 0) && shiftCheck?.length) {
      paramValue = `${configJSON.productAPiEndPoint}?shift=${shiftCheck}`;
    } else if (shiftCheck?.length === 0 && (depotCheck.length > 0 || nearestLocation.length > 0)) {
      paramValue = `${configJSON.productAPiEndPoint}?depot=${depotCheck || nearestLocation}`;
    }
    return {paramValue,dateValue}
  }

  handleSearch = () => {
    let param = configJSON.productAPiEndPoint;
    let date = '';
  
    const { paramValue, dateValue } = this.getSearchParamList(param,date)
    param = paramValue
    date = dateValue
    if (date) {
      param += (param.includes('?') ? '&' : '?') + date;
    }
  
    this.getCabsData("token", param);
  }

  handleDateRangeSelect = (dates: [Date, Date]) => {
    this.setState({ startDate: moment(dates[0]).format("YYYY-MM-DD"), endDate: moment(dates[1]).format("YYYY-MM-DD") });
  };

  handleDateRangeClean = () => {
    this.setState({ startDate: "", endDate: "" })
  };

  // Customizable Area Start
  // Customizable Area End
}
