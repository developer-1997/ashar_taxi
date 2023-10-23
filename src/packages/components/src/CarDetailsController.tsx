import { IBlock } from "../../framework/src/IBlock";
import { Message } from "../../framework/src/Message";
import { BlockComponent } from "../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../framework/src/RunEngine";

export interface Match {
    params: Params;
}

export interface Params {
    id: string;
}

export interface Props {
    navigation: any;
    id: string;
    match: Match;
    history: any;
    //   location:any;
    //   staticContext:any;
}
interface Payload {
    cab_id: string,
    shift: string,
    pick_up: string;
    drop_off: string;
}
interface RentalPeriod {
    id: number;
    shift_name: string;
    price: number;
    selected?: boolean;
}

interface AvailableDates {
    cab_id: number;
    end_date: string;
    id: number;
    start_date: string;
}
interface CarDetails {
    id: string;
    attributes: {
        cab_name: string;
        cab_image: string;
        other_cab_images: string[];
        number_of_seats: number;
        colour: string;
        shifts: string[];
        depot?: string;
        depot_information: {
            full_address: string;
            latitude: string;
            longitude: string;
            name: string;
            address: string;
        };
        available_dates: AvailableDates[]
    }
}
interface S {
    carDetails: CarDetails;
    token: string;
    rentalPeriod: RentalPeriod[];
    pickupDate: Date | undefined;
    error: string;
    bookingDetails: any;
    bookingTriggered: boolean;
    CarNotAvailableModal: boolean;
    InvalidTokenModal: boolean;
    RentalPeriodnModal: boolean;
    LoginModal: boolean;
}

interface SS {
    id: any;
}

export default class CarDetailsController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    getRentalPriceListApiCallId: any;
    getBookingDetailsApiCallId: any;
    postBookingsApiCallId: any;
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        this.handleBooking = this.handleBooking.bind(this)
        this.handleBookingDetails = this.handleBookingDetails.bind(this)
        this.showRentalPeriodPrice = this.showRentalPeriodPrice.bind(this)
        this.setPickupDate = this.setPickupDate.bind(this)
        this.handleCloseCarNotAvailableModal = this.handleCloseCarNotAvailableModal.bind(this)
        this.handleCloseInvalidTokenModal = this.handleCloseInvalidTokenModal.bind(this)
        this.handleEditBookingDetails = this.handleEditBookingDetails.bind(this)
        this.redirectToLogin = this.redirectToLogin.bind(this)
        this.handleDisabledDate = this.handleDisabledDate.bind(this)
        this.handleCloseRentalPeriodnModal = this.handleCloseRentalPeriodnModal.bind(this)
        this.handleOpenRentalPeriodnModal = this.handleOpenRentalPeriodnModal.bind(this)
        this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this)
        this.subScribedMessages = [
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage)
        ];

        this.state = {
            carDetails: {
                id: '',
                attributes: {
                    cab_name: '',
                    cab_image: '',
                    other_cab_images: [],
                    number_of_seats: 0,
                    colour: '',
                    shifts: [],
                    depot_information: {
                        name: "",
                        latitude: "",
                        longitude: "",
                        full_address: '',
                        address: ''
                    },
                    available_dates: []
                }
            },
            rentalPeriod: [],
            pickupDate: undefined,
            bookingDetails: {},
            error: '',
            token: "",
            bookingTriggered: false,
            CarNotAvailableModal: false,
            InvalidTokenModal: false,
            RentalPeriodnModal: false,
            LoginModal: false,
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this.getToken();
        if (this.isPlatformWeb() === false) {
            this.props.navigation.addListener("willFocus", () => {
                this.getToken();
            });
        }
        this.getCarDetails(this.state.token)
        this.getRentalPriceList(this.state.token)
    }

    componentDidUpdate(prevProps: Props, prevState: S) {
        let { rentalPeriod, carDetails } = this.state;
        if (((prevState.rentalPeriod.length !== rentalPeriod.length) || (prevState.carDetails !== carDetails)) && rentalPeriod.length) {
            if (rentalPeriod.length && carDetails.attributes && carDetails.attributes.shifts.length) {
                const minPriceObject = rentalPeriod.filter((item: any) => carDetails.attributes.shifts.includes(item.shift_name)).reduce((min: RentalPeriod, obj: RentalPeriod) => obj.price < min.price ? obj : min);
                minPriceObject.selected = true;
            }
            this.setState({ rentalPeriod })
        }
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    handleDisabledDate({ date }: any) {
        const { carDetails: { attributes: { available_dates } } } = this.state
        let inRange = {};
        available_dates.forEach((Adate) => {
            const startDate = new Date(Adate.start_date);
            const endDate = new Date(Adate.end_date);
            console.log((date?.valueOf() || 0) >= startDate.valueOf() && (date?.valueOf() || 0) <= endDate.valueOf(), "datatetetr")
            if ((date?.valueOf() || 0) >= startDate.valueOf() && (date?.valueOf() || 0) <= endDate.valueOf()) {
                inRange = {
                    disabled: false,
                }
            } else {
                inRange = {
                    disabled: true,
                    style: {
                        color: "#ccc",
                        textDecoration: 'line-through'
                    },
                }
            }
        })
        return inRange
    }

    handleCloseCarNotAvailableModal() {
        this.setState({ CarNotAvailableModal: false })
    }
    
    handleCloseInvalidTokenModal() {
        this.setState({ InvalidTokenModal: false })
    }

    handleOpenRentalPeriodnModal() {
        this.setState({ RentalPeriodnModal: true })
    }

    handleCloseRentalPeriodnModal() {
        this.setState({ RentalPeriodnModal: false })
    }

    handleCloseLoginModal(){
        this.setState({ LoginModal: false })
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
    showRentalPeriodPrice() {
        return this.state.rentalPeriod.find(item => item.selected)?.price || 0
    }
    setPickupDate(value: any) {
        const date = new Date(value.format())
        console.log(date, 'value')
        this.setState({ pickupDate: date || '' })
    }
    getCarDetails = (token: any) => {
        const header = {
            "Content-Type": "application/json",
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getProductApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "cab" + "/" + this.props.match.params.id
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    getRentalPriceList = (token: any) => {
        const header = {
            "Content-Type": "application/json",
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getRentalPriceListApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            'rental_price'
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    getBookingDetails(params: string) {
        const header = {
            "Content-Type": "application/json",
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getBookingDetailsApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            'booking_details' + params
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    postBookings = (token: any, payload: Payload) => {
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
            'bookings'
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

    handleBooking() {
        const { carDetails, bookingDetails } = this.state

        const jsonData =  JSON.stringify({ carDetails , bookingDetails})
        this.props.history.push({ 
            pathname: '/payments',
            state: jsonData
           });
    }

    redirectToLogin() {
        localStorage.setItem('redirectToken',`/CataloguePage/${this.props.match.params.id}`)
        this.props.history.push('/EmailAccountLogin')
    }

    changeFormat(date: string, isTime: boolean = true) {
        const newDate = new Date(date)
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? 0 + minutes : minutes;
        var strTime = (hours + '').padStart(2, "0") + ':' + (minutes + '').padStart(2, "0") + ' ' + ampm;
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${isTime ? " - " + strTime : ''}`
    }

    handleEditBookingDetails() {
        this.setState({ bookingTriggered: false, bookingDetails: {} })
    }

    handleBookingDetails() {
        const { rentalPeriod, pickupDate, carDetails } = this.state
        const selected = rentalPeriod.find(item => item.selected)
        if (selected && pickupDate) {
            this.setState({ error: '' })
            const payload: any = {
                cab_id: carDetails.id,
                shift: selected.shift_name,
                pick_up_date: pickupDate.toDateString()
            }
            let params = '?' + new URLSearchParams(payload).toString()
            this.getBookingDetails(params)
        } else {
            this.setState({ error: 'please Select Rental Period and pickup date to book' })
        }
    }
    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            // let token = localStorage.getItem('authToken');
            this.setState({ token: token });
        }
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            let errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );
            if (apiRequestCallId === this.getProductApiCallId) {
                if (responseJson && !responseJson.errors && responseJson.data) {
                    this.setState({ carDetails: responseJson.data });
                    runEngine.debugLog("carDetails", this.state.carDetails);
                } else {
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.getRentalPriceListApiCallId) {
                if (responseJson && !responseJson.errors && responseJson.prices) {
                    this.setState({ rentalPeriod: responseJson.prices });
                    runEngine.debugLog("rentalPeriod", this.state.rentalPeriod);
                } else {
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.getBookingDetailsApiCallId) {
                if (responseJson && !responseJson.error) {
                    console.log("responseJson>>>>>>>" , responseJson)
                    this.setState({ bookingDetails: responseJson });
                    this.setState({ bookingTriggered: true });
                    runEngine.debugLog("bookingDetails", this.state.bookingDetails);
                } else {
                    this.setState({ CarNotAvailableModal: true })
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.postBookingsApiCallId) {
                if (responseJson && !responseJson.errors) {
                    const jsonData =  JSON.stringify({ carDetails:this.state.carDetails , responseJson})
                    this.props.history.push({ 
                        pathname: '/payments',
                        state: jsonData
                       });
                    this.setState({ bookingTriggered: false });
                    runEngine.debugLog("bookingTriggered", this.state.bookingTriggered);
                } else {
                    this.setState({ InvalidTokenModal: true })
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            }
        }
    }
}
