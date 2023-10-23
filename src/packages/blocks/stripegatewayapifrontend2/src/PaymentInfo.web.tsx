import React from "react";

import {
  Box,
  Button,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import "./stripe.css"
import NavbarComponent from "../../landingpage/src/Navbar.web"
import FooterComponent from "../../landingpage/src/Footer.web"
import { calendar, imgLocation, imgTime , onlinePayment} from "./assets"
import KeyboardBackspaceSharpIcon from '@material-ui/icons/KeyboardBackspaceSharp';
import moment from "moment";
import Stripegatewayapifrontend2Controller, {
  Props,
} from "./Stripegatewayapifrontend2Controller";
import Loader from "../../../web/src/Loader.web";
// Customizable Area End


export default class PaymentInfo extends Stripegatewayapifrontend2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <>
        {
          this.state.loading ? 
          <Loader  /> :
          <Box className="landingPageContainerBox">
            <NavbarComponent />
            

            <div className="CarDetailsMain">
              <div className="CarDetailsBox CarDetailsBox-payment">
                <div className="LeftSideBox payment-page-box">
                  <div className="carDetails">
                    <div className="headingAndTag">
                      <h1 data-testId="Title">
                        <KeyboardBackspaceSharpIcon onClick={() => this.redirectToLanding()} />
                        Booking History
                      </h1>
                      <p className="levc-dec"> {this.state?.paymentSuccessResponse?.cab_name}</p>
                      {this.state.pathname == "/payment/success" && !this.state.bookingCancelStatus && <div className="taxi-1">Your Taxi has been Booked!</div> }
                      {this.state.bookingCancelStatus  &&  <div className="taxi-1" style={{"color":"#ff3b30"}}>Your Booking has been cancelled!</div>}
                      {this.state.pathname == "/payment/failed" &&  <div className="taxi-1" style={{"color":"#ff3b30"}}>Your Booking has been failed!</div>}

                      <div className="taxi-2">{"(Booking No: #"+this.state.paymentSuccessResponse?.booking_details?.id+")"}</div>
                    </div>
                  </div>
                  <div className="BookingDetailsMain">
                    <div data-testId="details" className="BookingDetails">
                      <div className="details">
                        <img src={calendar} alt="" />
                        <div className="text">
                          <h6 data-testId={"pickupdate"}>Pick up Date & Time</h6>
                          <p>{this.state.paymentSuccessResponse?.booking_details?.scheduled_pick_up}</p>
                        </div>
                      </div>

                      <div className="details-half">
                        <div className="details">
                          <img src={imgLocation} alt="" />
                          <div className="text">
                            <h6>Depot Location</h6>
                            <div className="time-box">
                              <img src={imgTime} alt="" />
                              {moment( this.state.paymentSuccessResponse?.booking_details?.scheduled_pick_up ).format("hh:mm a")}
                            </div>
                            <p>{this.state.paymentSuccessResponse?.booking_details?.pick_up_depot}</p>
                          </div>
                        </div>
                        <div className="details">
                          <img src={imgLocation} alt="" />
                          <div className="text">
                            <h6>Drop Location</h6>
                            <div className="time-box">
                              <img src={imgTime} alt="" />
                              {moment( this.state.paymentSuccessResponse?.booking_details?.scheduled_drop_off ).format("hh:mm a")}
                            </div>
                            <p>{this.state.paymentSuccessResponse?.booking_details?.drop_off_depot}</p>
                          </div>
                        </div>
                      </div>

                      <div className="details before-taxes-box">
                        <img src={onlinePayment} alt="" />
                        <div className="text">
                          <h6>Payment</h6>
                          <div className="before-taxes">
                            <div className="taxes-box">
                              <div className="taxes-left">Before taxes</div>
                              <div className="taxes-right">{"£" + this.state?.paymentSuccessResponse?.bill?.base_amount}</div>
                            </div>
                            <div className="taxes-box">
                              <div className="taxes-left">VAT</div>
                              <div className="taxes-right">{'£' + this.state?.paymentSuccessResponse?.bill?.vat_amount}</div>
                            </div>
                            <div className="taxes-box total-sub-bar">
                              <div className="taxes-left Total-headign">Total</div>
                              <div className="taxes-right Total-value">{'£' + this.state?.paymentSuccessResponse?.bill?.billed_amount}</div>
                            </div>

                            <div className="taxes-box">
                              <div className="taxes-left">Payment method:</div>
                              <div className="taxes-right">Credit Card</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {
                        this.state.pathname == "/payment/success" && !this.state.bookingCancelStatus &&
                            <div className="pay-btn-box">
                              <Button
                                data-test-id={"btnCancel"}
                                variant="contained"
                                type="submit"
                                fullWidth
                                className="normalText loginHeader verifyBtn-border"
                                onClick={this.handleCancelBooking}
                              >
                                Cancel
                              </Button>
                              <Button
                                data-test-id={"btnEmailVerify"}
                                variant="contained"
                                type="submit"
                                fullWidth
                                className="normalText loginHeader extendBtn"
                              >
                                Extend
                              </Button>
                            </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterComponent />
          </Box>
        }
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

// Customizable Area End
