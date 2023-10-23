import React from "react"
import { Box, Button, DialogContentText, Typography } from "@material-ui/core"
import NavbarComponent from "../../landingpage/src/Navbar.web"
import FooterComponent from "../../landingpage/src/Footer.web"
import 'rsuite/dist/styles/rsuite-default.css';
import { Calendar } from "react-multi-date-picker";
import "./CarDetails.css"
import { calendar, imageCar, imgElectric_Taxi_Rental_mage, imgLocation, imgTime } from "./assets"
import ImageSlider from "../../../components/src/ImageSlider.web";
import { DatePicker } from "rsuite";
import CarDetailsController from "../../../components/src/CarDetailsController";
import CustomModal from "../../../components/src/CustomModal.web";
import MapView from "react-native-maps";

class CarDetails extends CarDetailsController {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { carDetails, rentalPeriod, error, bookingTriggered, bookingDetails, pickupDate } = this.state;
        
        return (
            <Box className="landingPageContainerBox">
                <NavbarComponent match={undefined} history={undefined} location={undefined} />
                <div className="CarDetailsMain">
                    <div className="CarDetailsBox">
                        <div className="LeftSideBox">
                            <ImageSlider images={carDetails.attributes ? [carDetails.attributes.cab_image, ...carDetails.attributes.other_cab_images] : []} />
                            <div className="LocationMain">
                                <div className="heading">
                                    <h1>Depot locations</h1>
                                    <p>{carDetails.attributes.depot_information.full_address}</p>
                                </div>
                                <MapView
                                    style={{ height: 350, marginTop: 20 }}
                                    initialRegion={{
                                        latitude: 51.5437818804,
                                        longitude: -0.05532844878,
                                        latitudeDelta: 10,
                                        longitudeDelta: 45,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="RightSideBox">
                            <h6 data-testId={"heading"}>Electric Taxi Detail</h6>
                            <div className="carDetails">
                                <div className="headingAndTag">
                                    <h1 data-testId="Title">
                                        {carDetails.attributes.cab_name}
                                    </h1>
                                </div>
                                <div className="TotalPrice">
                                    <span><b>£{bookingDetails?.price || this.showRentalPeriodPrice()}</b>  / {bookingDetails?.price ? 'Total' : 'Upto'} </span>
                                </div>
                                <div className="othersDetails">
                                    <span className="box">
                                        <img src={imageCar} />
                                        {carDetails.attributes.number_of_seats} seats
                                    </span>
                                    <span className="box">
                                        <span className="color" style={{ backgroundColor: 'black' }}></span>
                                        {carDetails.attributes.colour}
                                    </span>
                                </div>
                            </div>
                            <div className="BookingDetailsMain">
                                {!bookingTriggered ? (
                                    <div className="BookingDetails">
                                        <h2 className="RentalPeriodHeading" data-testId="RentalPeriod">Select Rental Period</h2>
                                        <Box className="RentalPeriodGridBoxMenu">
                                            {rentalPeriod.map((item) => (
                                                carDetails.attributes.shifts.includes(item.shift_name) && <div key={item.id} data-testId={'RentalPeriodGridBox'} className={`RentalPeriodGridBoxMenuItem ${item.selected ? 'selected' : ''}`} onClick={() => this.handleBackground(item.id)}>
                                                    <img src={imgElectric_Taxi_Rental_mage} />
                                                    <Typography variant="subtitle2" className="heading">{item.shift_name}</Typography>
                                                    <Typography variant="subtitle2" className="price">£{item.price}</Typography>
                                                </div>
                                            ))}
                                        </Box>
                                        <div className="RentalPeriodPickupDate">
                                            <DatePicker
                                                testid={'pickupDate'}
                                                oneTap
                                                size="lg"
                                                placeholder="Select pickup date"
                                                style={{ width: '100%' }}
                                                defaultValue={pickupDate}
                                                value={pickupDate}
                                            />
                                            <div className="overlay" onClick={this.handleOpenRentalPeriodnModal}></div>
                                        </div>
                                        {error && <p className="error">{error}</p>}
                                    </div>
                                ) : (
                                    <div data-testId="details" className="BookingDetails">
                                        <div className="details">
                                            <img src={calendar} alt="" />
                                            <div className="text">
                                                <Typography variant="h6" className="detailTitle" data-testId={"pickupdate"}>Pick up Date & Time</Typography>
                                                <Typography className="detailValue">{this.changeFormat(bookingDetails.pick_up)}</Typography>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <img src={imgTime} alt="" />
                                            <div className="text">
                                                <Typography variant="h6" className="detailTitle">Drop off Date & Time</Typography>
                                                <Typography className="detailValue">{this.changeFormat(bookingDetails.drop_off)}</Typography>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <img src={imgLocation} alt="" />
                                            <div className="text">
                                                <Typography variant="h6" className="detailTitle">Depot</Typography>
                                                <Typography className="detailValue">{carDetails.attributes.depot}</Typography>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <img src={imgLocation} alt="" />
                                            <div className="text">
                                                <Typography variant="h6" className="detailTitle">Address</Typography>
                                                <Typography className="detailValue">{carDetails.attributes.depot_information.full_address}</Typography>
                                            </div>
                                        </div>
                                        <button className="EditDetails" onClick={this.handleEditBookingDetails}>Edit</button>
                                    </div>
                                )}
                                <Button variant="contained" color="primary"
                                    onClick={bookingTriggered ? this.handleBooking : this.handleBookingDetails}
                                    className="fontWeightMedium"
                                >
                                    { !bookingTriggered ? 'Proceed' : 'Pay'}
                                </Button>
                            </div>
                            <div className="CancellationPolicy">
                                <ul>
                                    <li>
                                        <div className="details">
                                            <h4>Cancellation policy</h4>
                                            <p>If the booking is cancelled in less than 4 hours of your
                                                booking time, a cancellation fee of 40% will be charged.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent match={undefined} history={undefined} location={undefined} />
                <CustomModal heading={'OOPS!!!'} open={this.state.CarNotAvailableModal} handleClose={this.handleCloseCarNotAvailableModal} >
                    <DialogContentText>
                        Sorry, This car is not available... we’re
                        redirecting you to the available
                        car page.
                    </DialogContentText>
                    <button className="yesBtn" onClick={this.handleCloseCarNotAvailableModal}>Yes</button>
                    <button className="cancelBtn" onClick={this.handleCloseCarNotAvailableModal}>Cancel</button>
                </CustomModal>
                <CustomModal heading={'ERROR'} open={this.state.InvalidTokenModal} handleClose={this.handleCloseInvalidTokenModal} >
                    <DialogContentText variant="inherit">
                        Sorry, You need to login again... we’re
                        redirecting you to the login
                        page.
                    </DialogContentText>
                    <button className="yesBtn" onClick={this.redirectToLogin}>Yes</button>
                    <button className="cancelBtn" onClick={this.handleCloseInvalidTokenModal}>Cancel</button>
                </CustomModal>
                <CustomModal heading={'ERROR'} open={this.state.LoginModal} handleClose={this.handleCloseLoginModal} >
                    <DialogContentText variant="inherit">
                        Please login/sign to book the taxi..we are redirecting you to login page
                    </DialogContentText>
                    <button className="yesBtn" onClick={this.redirectToLogin}>Yes</button>
                    <button className="cancelBtn" onClick={this.handleCloseLoginModal}>Cancel</button>
                </CustomModal>
                <CustomModal heading={'Rental period'} maxWidth={'lg'} open={this.state.RentalPeriodnModal} handleClose={this.handleCloseRentalPeriodnModal} >
                    <div className="MuiDialogContentMainBody">
                        <label htmlFor="">Select pickup date</label>
                        <DatePicker
                            testid={'pickupDate'}
                            oneTap
                            size="lg"
                            placeholder="YYYY MM DD"
                            // defaultOpen={true}
                            style={{ width: '100%' }}
                            defaultValue={pickupDate}
                            value={pickupDate}
                            disabled
                        />
                        <Calendar
                            shadow={false}
                            numberOfMonths={2}
                            onChange={this.setPickupDate}
                            mapDays={this.handleDisabledDate}
                        />
                    </div>
                    <div className="RentalPeriodnModalActionBtn">
                        <button className="yesBtn" onClick={this.handleCloseRentalPeriodnModal}>Continue</button>
                        <button className="cancelBtn" onClick={this.handleCloseRentalPeriodnModal}>Cancel</button>
                    </div>
                </CustomModal>
            </Box>
        )
    }
}

export default CarDetails;
