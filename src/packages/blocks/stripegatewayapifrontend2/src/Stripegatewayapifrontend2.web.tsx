import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  DialogContentText,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import "./stripe.css"
import NavbarComponent from "../../landingpage/src/Navbar.web"
import FooterComponent from "../../landingpage/src/Footer.web"
import { calendar, imgLocation, imgTime } from "./assets"
import KeyboardBackspaceSharpIcon from '@material-ui/icons/KeyboardBackspaceSharp';

// Customizable Area End

import Stripegatewayapifrontend2Controller, {
  Props,
  configJSON,
} from "./Stripegatewayapifrontend2Controller";
import Loader from "../../../web/src/Loader.web";
import CustomModal from "../../../components/src/CustomModal.web";

export default class Stripegatewayapifrontend2 extends Stripegatewayapifrontend2Controller {
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
          
          <div className="CarDetailsMain paymentMain">
            <div className="CarDetailsBox">
              <div className="LeftSideBox payment-page-box">
                <div className="carDetails">
                  <div className="headingAndTag">
                    <h1 data-testId="Title">
                      <KeyboardBackspaceSharpIcon onClick={() => this.props.history.go(-1)} />
                      {this.state.carDetails.attributes.cab_name}
                    </h1>
                  </div>
                </div>
                <div className="BookingDetailsMain">
                  <div data-testId="details" className="BookingDetails">
                    <div className="details">
                      <img src={calendar} alt="" />
                      <div className="text">
                        <h6 data-testId={"pickupdate"}>Pick up Date & Time</h6>
                        <p>{this.state.bookingDetails?.pick_up}</p>
                      </div>
                    </div>
                    <div className="details">
                      <img src={imgTime} alt="" />
                      <div className="text">
                        <h6>Drop off Date & Time</h6>
                        <p>{this.state.bookingDetails?.drop_off}</p>
                      </div>
                    </div>
                    <div className="details">
                      <img src={imgLocation} alt="" />
                      <div className="text">
                        <h6>Depot Location</h6>
                        <p>{this.state.carDetails?.attributes?.depot_information?.full_address}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="RightSideBox">
                <div className="light-green-bg">
                  <h2>Payment</h2>
                  <div className="before-taxes">
                    <div className="taxes-box">
                      <div className="taxes-left">Before taxes</div>
                      <div className="taxes-right">{"£" + this.state.bookingDetails.price}</div>
                    </div>
                    <div className="taxes-box">
                      <div className="taxes-left">VAT</div>
                      <div className="taxes-right">{'£' + this.state.bookingDetails.vat}</div>
                    </div>
                    <div className="taxes-box total-sub-bar">
                      <div className="taxes-left Total-headign">Total</div>
                      <div className="taxes-right Total-value">{'£' + this.state.bookingDetails.final_price}</div>
                    </div>
                    <Button
                      data-test-id={"btnEmailVerify"}
                      variant="contained"
                      type="submit"
                      fullWidth
                      className="normalText loginHeader payBtn"
                      onClick={this.handleBooking}
                    >
                      Pay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterComponent />
          <CustomModal heading={'ERROR'} open={this.state.InvalidTokenModal} handleClose={this.handleCloseInvalidTokenModal} >
              <DialogContentText variant="inherit">
                  Sorry, You need to login again... we’re
                  redirecting you to the login
                  page.
              </DialogContentText>
              <button className="yesBtn" onClick={this.redirectToLogin}>Yes</button>
              <button className="cancelBtn" onClick={this.handleCloseInvalidTokenModal}>Cancel</button>
          </CustomModal>
        </Box>
      }
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

// Customizable Area End
