import React from "react";
// Customizable Area Start
import {
    Box,
    Button,
    Typography,
    Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom"
import {
    ThemeProvider,
    createTheme,
} from "@material-ui/core/styles";
import { Formik } from "formik";
import EmailAccountLoginController, {
} from "./EmailAccountLoginController";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import { OtpInputField } from "../../../components/src/OtpInputField.web";
import { logoImg } from "../../email-account-registration/src/assets"
import "./LoginOtpConfirmation.web.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0000ff",
            contrastText: "#fff",
        },
    },
});

export default class LoginOtpConfirmation extends EmailAccountLoginController {

    render() {
        
        return (
            // Required for all blocks
            <ThemeProvider theme={theme}>
                <Grid container className="inputText">
                    <Grid item xs={12} lg={6}>
                        <SharableLeftSidetaxi />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box id="rightBoxContainer">          
                            <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="flex-end">
                                <Link to="/LandingPage">
                                    <img src={logoImg} alt="Logo" className="logoImgStyle"/>
                                </Link>
                            </Box>
                            <Box className="contentForm">
                                <Typography
                                variant="h2"
                                className="otpFormTitle loginHeader"
                                >
                                    Sign In
                                </Typography>
                                <Typography variant="body1" component="h2" className="otpFormParagraph">
                                    Enter 4 Digit Verification code sent to <br />
                                    <b>XXXXXXX260</b>
                                </Typography>
                                <Formik
                                    initialValues={{
                                        otp1: "",
                                        otp2: "",
                                        otp3: "",
                                        otp4: "",
                                    }}
                                    onSubmit={this.handleOtpFormSubmit}
                                >
                                    {({ values, handleChange, handleSubmit }) => (
                                        <OtpInputField
                                            state={this.state}
                                            values={values}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                            handleStateError={this.handleStateError}
                                        />
                                    )}
                                </Formik>
                                <Grid item xs={12}>
                                    <Box style={sign_up_styles_for_login_confirm.IsResend}>
                                        <Typography variant="h4" className="isResendHeading fontWeightMedium">
                                            Didn't receive code ? <span onClick={() => [this.LoginAccountWithPhoneForWeb({ attributes: { full_phone_number: localStorage.getItem("phone_number") } }), this.otpSendAgain()]} style={{ cursor: "pointer", color: "#090168" }} data-test-id="otpsendButton">Resend code</span>
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
            </ThemeProvider>
        );
    }
}


const sign_up_styles_for_login_confirm: any = {
    // Customizable Area Start
    body: {
        minHeight: "100vh",
    },
    container: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 650,
        backgroundColor: "#fff",
        height: "100%",
    },
    backbtn: {
        position: "absolute",
        bottom: "1.875rem",
        right: "6.063rem",
        color: "#828282",
        fontWeight: "600",
        textDecoration: "underline",
        cursor: "pointer",
    },
    errorMessageOtp: { color: "red" },

    rhtBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 30px",
        width: "100%",
        margin: "0px auto",
        boxSizing: 'border-box',
        height: '100vh',
        overflow: 'auto',
    },
    inSubHeading: {
        display: "flex",
        width: "100%",
        marginBottom: "40px",
    },
    isEmail: {
        width: "100%",
        fontSize: "18px",
        color: "#3f3f3f",
        marginTop: "20px"
    },
    IsResend: {
        display: "flex",
        width: "100%",
        marginBottom: "40px",
    },
    isResendHeading: {
        width: "100%",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: 700,
        color: "#3d3d3d",
        marginTop: "45px"
    }
};