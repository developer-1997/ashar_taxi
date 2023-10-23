import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import ForgotPasswordController from "./ForgotPasswordController.web";
import { Formik } from "formik";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import { Link } from "react-router-dom";
import ForgotPassHeader from "./ForgotPasswordHeader.web";
import { logoImg } from "../../email-account-registration/src/assets"
import ArrowBack from '@material-ui/icons/ArrowBack';
import "./ForgotPasswordOTPconfirmation.web.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class ForgotPasswordOTPconfirmation extends ForgotPasswordController {
  handleformSubmit = (values: any) => {
    this.handleOtpFormSubmit(values, this.props.location.state.email, this.props.location.state.token)
  }
  render() {
    return (
      // Required for all blocks
      <ThemeProvider theme={theme} >
        <Grid container>
          <Grid item md={12} lg={6}>
            <SharableLeftSidetaxi />
          </Grid>
          <Grid item md={12} lg={6}>
            <Box id="rightBoxContainer">
              <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="space-between">
                <Link to="/ForgotPassword">
                  <ArrowBack />
                </Link>
                <Link to="/LandingPage">
                  <img src={logoImg} alt="Logo" className="logoImgStyle"/>
                </Link>
              </Box>
              <Box className="verificationForm">
                <ForgotPassHeader
                  title="Forgot Password?"
                  paragraph={<span>
                    Enter 4 Digit Verification code sent to<br />
                    <b>
                      Email address: {this.props.location.state?.email ? this.props.location.state.email : null}
                    </b>
                  </span>}
                />

                <Formik
                  initialValues={{
                    otp1: "",
                    otp2: "",
                    otp3: "",
                    otp4: "",
                  }
                  }
                  onSubmit={this.handleformSubmit}
                >
                  {this.forgotPassWordOtpHanlder}
                </Formik>
                <Box className="IsResendContainer">
                  <Typography
                    variant="h4"
                    component="h2"
                    className="fontWeightMedium"
                  >
                    Didn't receive code ?
                    {
                      this.state.disableResendBtn?
                      <span className="resend"> Please wait for 2 minutes resend OTP again</span>
                      :
                      <span 
                      className="resend" 
                      onClick={() => [this.sendEmailForForgotPass({email:this.props.location?.state?.email}),this.otpSendAgain()]} data-test-id="forgotresend" 
                      > Resend code</span>
                    }
                  </Typography>
                </Box>
              </Box>
              <Box className="backToHomeContainer" display="flex" flexDirection="row" justifyContent="flex-end">
                <Link to="/LandingPage">
                  <Button className="normalText fontWeightMedium backToHomeButton">Back to home</Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider >
    );
  }
}
