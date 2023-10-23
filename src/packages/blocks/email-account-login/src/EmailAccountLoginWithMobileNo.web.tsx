import React from "react";

// Customizable Area Start
import {
    Box,
    Button,
    Grid
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Formik } from "formik";
import { logoImg } from './assets';
import { Link } from "react-router-dom"
import { LoginWithMobileNo } from "../../../components/src/LoginWithMobileNoForm.web";

import EmailAccountLoginController, {
    Props,
} from "./EmailAccountLoginController";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import "./loginWithMobileNo.css";

// Customizable Area End



export default class EmailAccountLoginWithMobileNo extends EmailAccountLoginController {
    constructor(props: Props) {
        super(props);
    }
    handleFormValidationForLogin(error: any, touched: any) {
        return (
            <div className="errorText">
                {error && touched ? error : ""}
            </div>
        )
    }
    render() {
        return (
            // Required for all blocks
            <Grid container>
                <Grid item md={12} lg={6} style={{width: "100%"}}>
                    <SharableLeftSidetaxi />
                </Grid>
                <Grid item md={12} lg={6} style={{ width: "100%", position: "relative" }}>
                    <Box id="rightBoxContainer">
                        <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="flex-end">
                            <Link to="/LandingPage">
                                <img src={logoImg} alt="Logo" className="logoImgStyle" />
                            </Link>
                        </Box>
                        <Box className="contentForm">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <LinkActiveForOtpLogin varint="h4" component="h2" style={login_with_otp_ForWeb.isHeadValueActive} >
                                    <span className="loginHeader">Login with OTP</span>
                                </LinkActiveForOtpLogin>
                            </Box>
                            <Formik
                                initialValues={{
                                    type: "sms_account",
                                    attributes: {
                                        full_phone_number: ""
                                    }
                                }
                                }
                                validationSchema={this.emailLoginOtpValidation}
                                onSubmit={this.LoginAccountWithPhoneForWeb}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue,
                                }) => (
                                    <LoginWithMobileNo
                                        data-test-id="registrationWrapperId"
                                        values={values}
                                        handleChange={handleChange}
                                        errors={errors}
                                        touched={touched}
                                        state={this.state}
                                        handleClickShowPassword={this.handleClickShowPassword}
                                        setFieldValue={setFieldValue}
                                        handleSubmit={handleSubmit}
                                        handleStateError={this.handleStateError}
                                        handleFormValidationForLogin={this.handleFormValidationForLogin}

                                    />
                                )}
                            </Formik>
                        </Box>
                        <Box
                            className="backToHomeContainer"
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-end"
                        >
                            <Link to="/LandingPage">
                                <Button className="normalText fontWeightMedium backToHomeButton">
                                    Back to home
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

const LinkActiveForOtpLogin: any = styled('a')({
    fontSize: '26px',
    textAlign: 'center'
    // '&::before': {
    //     content: '""',
    //     position: 'absolute',
    //     width: '20px',
    //     borderRadius: 5,
    //     bottom: 0,
    //     left: '50%',
    //     transform: 'translateX(-50%)',
    //     borderBottom: '5px solid #090069',
    // },
});


const login_with_otp_ForWeb: any = {
    // Customizable Area Start
    formInputOutline: {
        border: '1px solid #c5c5c5',
        padding: '5px 15px 5px 60px',
        borderRadius: '10px',
        margin: '5px 0',
        fontWeight: '700',
        fontSize: '15px',
        width: '100%',
        height: "60px"
    },
    inHeading: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: "20px"
    },
    // errorMessage: {
    //     color: "red"
    // },
    mainContainer: { margin: '5rem auto' },
    isHeadValue: {
        color: '#908f9d',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '15px',
    },
    verifyBtn: {
        backgroundColor: '#090069',
        padding: '15px',
        borderRadius: '10px',
        textTransform: 'capitalize',
        fontSize: '18px',
        fontWeight: "bold"
    },
    formInputLabel: {
        transform:"none",
        color: '#242424',
        fontWeight: 'bold',
        marginTop: '-20px',
        fontSize: '16px',
    },
    isHeadValueBox: {
        width: '50%',
        textAlign: 'center',
        fontSize: '26px',
        fontWeight: 'bold',
    },
    backbtn: {
        // position: "absolute",
        // bottom: "1.875rem",
        // right: "6.063rem",
        color: "#828282",
        fontWeight: "600",
        textDecoration: "underline",
        cursor: "pointer",
    },
    constainerBlock: { margin: 'auto' },
    isHeadValueActive: {
        display: 'inline',
        color: '#090069',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '15px',
        margin: 0,
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
    // Customizable Area End
};
