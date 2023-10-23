import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";

import { runEngine } from "../../../framework/src/RunEngine";

export interface Props {
    id: string;
}

interface RentalPeriod {
    id: number;
    shift_name: string;
    price: number;
    selected?: boolean;
}
interface SchedulingList {
    id: string;
    type: string;
    attributes: {
        id: number;
        status: string;
        shift: string;
        extended_shifts: string;
        shift_for_extension: string[];
        scheduled_pick_up: string;
        scheduled_drop_off: string;
        scheduled_depot_location?: string;
        created_at: string;
        cab_name: string;
        price: number;
        cab_image: string;
    }
}
interface S {
    token: string | null;
    CancelModal: boolean;
    ExtendBookingModal: boolean;
    schedulingList: SchedulingList[];
    rentalPeriod: RentalPeriod[];
    PreviousSchedulingList: boolean;
    CancelId: string;
    ExtendId: string;
    pickupDate: Date | undefined;
    error: string;
}

interface SS {
    id: string;
}

export default class SchedulingControllerWeb extends BlockComponent<Props, S, SS> {
    getUpcomingBookingHistoryApiId: any;
    getPreviousBookingHistoryApiId: any;
    postCancelBookingApiId: any;
    getRentalPriceListApiCallId: any;
    getExtendBookingDetailsApiCallId: any;
    patchExtendBookingApiId: any;
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        this.handleOpenCancelModal = this.handleOpenCancelModal.bind(this)
        this.handleCloseCancelModal = this.handleCloseCancelModal.bind(this);
        this.handleCancelBooking = this.handleCancelBooking.bind(this)
        this.handleUpcomingBookingHistory = this.handleUpcomingBookingHistory.bind(this)
        this.handlePreviousBookingHistory = this.handlePreviousBookingHistory.bind(this)
        this.handleCloseExtendBookingModal = this.handleCloseExtendBookingModal.bind(this)
        this.subScribedMessages = [
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage)
        ];

        this.state = {
            token: window.localStorage.getItem('token'),
            CancelModal: false,
            ExtendBookingModal: false,
            schedulingList: [],
            rentalPeriod: [],
            PreviousSchedulingList: false,
            CancelId: '',
            ExtendId: '',
            pickupDate: undefined,
            error: ''
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this.getUpcomingBookingHistory(this.state.token)
        this.getRentalPriceList(this.state.token)
    }

    setPickupDate(value: any) {
        this.setState({ pickupDate: value || '' })
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

    handleOpenCancelModal(id: number) {
        this.setState({ CancelModal: true, CancelId: id.toString() })
    }

    handleOpenExtendBookingModal(id: number) {
        const date = this.state.schedulingList.find(item => +item.id === id)
        const shift = this.state.rentalPeriod.find(item => date?.attributes.shift === item.shift_name)
        const rentalPeriod = this.state.rentalPeriod.filter(item => (date?.attributes.shift_for_extension || []).includes(item.shift_name))
        this.handleBackground(shift?.id)
        this.setPickupDate(date?.attributes.scheduled_pick_up)

        this.setState({
            ExtendBookingModal: true,
            ExtendId: id.toString(),
            rentalPeriod: rentalPeriod
        })
    }

    handleCloseCancelModal() {
        this.setState({ CancelModal: false })
    }

    handleCloseExtendBookingModal() {
        this.setState({ ExtendBookingModal: false })
    }

    handleCancelBooking(id: string) {
        const payload = {
            booking_id: id
        }
        this.postCancelBooking(this.state.token, payload)
    }

    handleExtendBooking(id: string) {
        const selected = this.state.rentalPeriod.find(item => item.selected)
        this.setState({ error: '' })
        const payload: any = {
            booking_id: id,
            extended_shift: selected?.shift_name,
            extended_pick_up_date: this.state.pickupDate
        }
        let params = '?' + new URLSearchParams(payload).toString()
        this.getExtendBookingDetails(params, this.state.token)
    }

    handleUpcomingBookingHistory() {
        this.setState({ PreviousSchedulingList: false })
        this.getUpcomingBookingHistory(this.state.token)
    }

    handlePreviousBookingHistory() {
        this.setState({ PreviousSchedulingList: true })
        this.getPreviousBookingHistory(this.state.token)
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

    getUpcomingBookingHistory = (token: string | null) => {
        const header = {
            "Content-Type": "application/json",
            token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getUpcomingBookingHistoryApiId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "upcoming_bookings"
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

    getPreviousBookingHistory = (token: string | null) => {
        const header = {
            "Content-Type": "application/json",
            token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getPreviousBookingHistoryApiId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "booking_history"
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

    getExtendBookingDetails = (params: string, token: (string | null)) => {
        const header = {
            "Content-Type": "application/json",
            token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getExtendBookingDetailsApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            'extension_details' + params
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

    postCancelBooking = (token: string | null, formdata: { booking_id: string }) => {
        const header = {
            "Content-Type": "application/json",
            token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.postCancelBookingApiId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "cancel_booking"
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(formdata)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "POST"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    patchExtendBooking = (token: string | null, formdata: { booking_id: string }) => {
        const header = {
            "Content-Type": "application/json",
            token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.patchExtendBookingApiId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "extend_booking"
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(formdata)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "PATCH"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    async receive(from: string, message: Message) {

        runEngine.debugLog("Message Recived", message);
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
            if (apiRequestCallId === this.getUpcomingBookingHistoryApiId) {
                if (responseJson && !responseJson.errors && responseJson.data) {
                    this.setState({ schedulingList: responseJson.data });
                    runEngine.debugLog("schedulingList", this.state.schedulingList);
                } else {
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.getPreviousBookingHistoryApiId) {
                if (responseJson && !responseJson.errors && responseJson.data) {
                    this.setState({ schedulingList: responseJson.data });
                    runEngine.debugLog("schedulingList", this.state.schedulingList);
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
            } else if (apiRequestCallId === this.getExtendBookingDetailsApiCallId) {
                if (responseJson && !responseJson.error) {
                    this.patchExtendBooking(this.state.token, responseJson)
                    runEngine.debugLog("ExtendBookingDetails", responseJson);
                } else {
                    this.setState({ error: responseJson.error });
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.postCancelBookingApiId) {
                if (responseJson && !responseJson.error) {
                    this.handleCloseCancelModal()
                    this.handlePreviousBookingHistory()
                    runEngine.debugLog("CancelBooking", responseJson.message);
                } else {
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            } else if (apiRequestCallId === this.patchExtendBookingApiId) {
                if (responseJson && !responseJson.error) {
                    this.handleCloseExtendBookingModal()
                    this.handleUpcomingBookingHistory()
                    runEngine.debugLog("ExtendBookings", responseJson.message);
                } else {
                    this.parseApiCatchErrorResponse(errorReponse);
                }
            }
        }
    }
}
