import React from "react"
import { Box, DialogContentText, Typography } from "@material-ui/core"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SchedulingControllerWeb, { Props } from "./SchedulingController.web";

import NavbarComponent from "../../landingpage/src/Navbar.web"
import FooterComponent from "../../landingpage/src/Footer.web"
import CustomModal from "../../../components/src/CustomModal.web";
import 'rsuite/dist/styles/rsuite-default.css';
import "./scheduling.css"
import { DatePicker } from "rsuite";

class Scheduling extends SchedulingControllerWeb {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { schedulingList, PreviousSchedulingList, CancelModal, ExtendBookingModal, CancelId, ExtendId, rentalPeriod, pickupDate, error } = this.state
        return (
            <Box className="landingPageContainerBox">
                <NavbarComponent />
                <div className="SchedulingPageHeader">
                    <ul>
                        <li className={!PreviousSchedulingList ? "active" : ''} data-testId="heading" onClick={this.handleUpcomingBookingHistory}>
                            Upcoming
                        </li>
                        <li className={PreviousSchedulingList ? "active" : ''} data-testId="heading" onClick={this.handlePreviousBookingHistory}>
                            Past
                        </li>
                    </ul>
                </div>
                <div className="SchedulingPageBody">
                    {schedulingList.length ?
                        schedulingList.map((item) => (
                            <div className="MainBox" key={item.id}>
                                <div className="imgBox">
                                    <img src={item.attributes.cab_image} alt="" />
                                </div>
                                <div className="right">
                                    <div className="heading">
                                        <h4 data-testId="Title">{item.attributes.cab_name}</h4>
                                    </div>
                                    <div className="body">
                                        <div className="details">
                                            <p><span className="label"> Booking Id :</span> <strong>{item.attributes.id}</strong>   </p>
                                            <p><span className="label"> Pickup date & time :</span>  <strong>{this.changeFormat(item.attributes.scheduled_pick_up)}</strong></p>
                                            <p><span className="label"> Drop Off date and time :</span><strong>{this.changeFormat(item.attributes.scheduled_drop_off)}</strong> </p>
                                            <p><span className="label"> Depot location :</span> <strong>  {item.attributes.scheduled_depot_location}</strong></p>
                                            <p><span className="label"> Total amount paid : </span> <strong>£{item.attributes.price}</strong></p>
                                        </div>
                                        <div className="actions">
                                            <div className="date">{this.changeFormat(item.attributes.created_at, false)}</div>
                                            {(item.attributes.status === "Booked" || item.attributes.status === "In-Progress") && <div className="btnList">
                                                {item.attributes.status === "In-Progress" && <button className="btn primary" data-testId="ExtendBtn" onClick={() => this.handleOpenExtendBookingModal(item.attributes.id)}>Extend</button>}
                                                <button className="btn" data-testId="CancelBtn" onClick={() => this.handleOpenCancelModal(item.attributes.id)}>Cancel</button>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div className="Rectangle">
                            <ErrorOutlineIcon />
                            <span className="No-available-cars" data-testId="NoBooking">
                                No Booking are Scheduled.
                            </span>
                        </div>
                    }
                </div>
                <FooterComponent />
                <CustomModal data-testId="CancelModal" open={CancelModal} handleClose={this.handleCloseCancelModal} >
                    <DialogContentText className="Text-Center-Menu-Placeholder" data-testId="CancelModalText">Are you sure you want to cancel?</DialogContentText>
                    <button className="yesBtn" data-testId="ConfirmCancelBtn" onClick={() => this.handleCancelBooking(CancelId)}>Yes</button>
                    <button className="cancelBtn" onClick={this.handleCloseCancelModal}>Cancel</button>
                </CustomModal>
                <CustomModal data-testId="ExtendBookingModal" maxWidth={'md'} heading="Extend Booking" open={ExtendBookingModal} handleClose={this.handleCloseExtendBookingModal} >
                    <div className="BookingDetails">
                        <h2 className="RentalPeriodHeading" data-testId="RentalPeriod">Select Rental Period</h2>
                        <Box className="RentalPeriodGridBoxMenu">
                            {rentalPeriod.map((item) => (
                                <div key={item.id} data-testId={'RentalPeriodGridBox'} className={`RentalPeriodGridBoxMenuItem ${item.selected ? 'selected' : ''}`} onClick={() => this.handleBackground(item.id)}>
                                    <Typography variant="subtitle2" className="heading">{item.shift_name}</Typography>
                                    <Typography variant="subtitle2" className="price">£{item.price}</Typography>
                                </div>
                            ))}
                        </Box>
                        {error && <p className="error" data-testId={'ExtendBookingErrorMessage'}>{error}</p> }
                    </div>
                    <div className="ExtendBookingModalActionBtn">
                        <button className="yesBtn" data-testId="ExtendBookingContinueBtn" onClick={() => this.handleExtendBooking(ExtendId)}>Continue</button>
                        <button className="cancelBtn" onClick={this.handleCloseExtendBookingModal}>Cancel</button>
                    </div>
                </CustomModal>
            </Box>
        )
    }
}

export default Scheduling