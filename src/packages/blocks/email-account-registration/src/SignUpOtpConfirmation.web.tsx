import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { ThemeProvider, createTheme, styled } from "@material-ui/core/styles";
import EmailAccountRegistrationController from "./EmailAccountRegistrationController";
import { Formik } from "formik";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import { Link } from "react-router-dom";
import { OtpInputField } from "../../../components/src/OtpInputFieldSignUp.web";
export const configJSON = require("./config");
import { logoImg } from "../../email-account-registration/src/assets"
import "./SignUpOtpConfirmation.web.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});



export default class SignUpOtpConfirmation extends EmailAccountRegistrationController {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme} >
        <Grid container>
          <Grid container >
            <Grid item sm={12} lg={6} style={{ width: "100%" }}>
              <SharableLeftSidetaxi />
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box id="rightBoxContainer">              
                <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="flex-end">
                  <Link to="/LandingPage">
                    <img src={logoImg} alt="Logo" className="logoImgStyle"/>
                  </Link>
                </Box>
                <Box style={{
                  maxWidth: '500px',
                  margin: '0 auto'
                }}>
                  <Typography
                    variant="h2"
                    className="otpFormTitle loginHeader"
                  >
                    Sign Up
                  </Typography>
                  <Typography variant="body1" component="h2" className="otpFormParagraph">
                    Enter 4 Digit Verification code sent to<br /><b>{this.state?.email ? this.state.email : null}</b>
                  </Typography>
                  <Formik
                    initialValues={{
                      otp1: "",
                      otp2: "",
                      otp3: "",
                      otp4: "",
                    }
                    }
                    onSubmit={this.handleOtpFormSubmit}
                  >

                        {({
                            values,
                            handleChange,
                            handleSubmit,
                          }) => 
                            (
                              <OtpInputField
                                values={values}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                state={this.state}
                              />
                            )
                          
                        }
                  </Formik>
                  <Grid item xs={12}>
                    <Box style={sign_up_styles.IsResend}>
                      <Typography variant="h4" component="h2" className="isResendHeading fontWeightMedium">
                        {configJSON.dntReceiveCode}<span onClick={() => [this.otpSendAgain()]} data-test-id="otpsendButton" style={{cursor:"pointer",color:"#090168"}}>{configJSON.resendCodeBtn}</span>
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
                <Box className="backToHomeContainer" display="flex" flexDirection="row" justifyContent="flex-end">
                  <Link to="/LandingPage">
                    <Button className="normalText fontWeightMedium backbtn" data-test-id="backId">Back to home</Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </ThemeProvider >
    );
  }
}

const LinkActive: any = styled('a')({
  fontSize: '26px',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '20px',
    borderRadius: 5,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderBottom: '5px solid #090069',
  },
});
const sign_up_styles: any = {
  // Customizable Area Start
  body: {
    minHeight: '100vh',
  },
  IsResend: {
    display: 'flex',
    width: '100%',
    marginBottom: "40px",
  },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff",
    height: '100%'
  },

  inHeading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: "40px",
    marginTop: "20px"
  },
  isHeadValueBox: {
    width: '50%',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
    borderRight: '1px solid #c5c5c5'
  },
  isHeadValueBoxRht: {
    width: '50%',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  isHeadValue: {
    color: '#908f9d',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
    fontSize: '26px',
    fontWeight: 'bold',

  },
  isHeadValueActive: {
    color: '#090069',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
    margin: 0,
  },
  inSubHeading: {
    display: 'flex',
    width: '100%',
    marginBottom: "40px",
  },
  isEmail: {
    width: '100%',
    fontSize: '18px',
    color: '#3f3f3f',
    marginTop: "20px"
  },
  rhtBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '40px 100px 100px 100px',
    width: '100%',
    margin: '0px auto',
    maxHeight: '100%',
    overflow: 'auto',
    boxSizing: 'border-box',
  },
};