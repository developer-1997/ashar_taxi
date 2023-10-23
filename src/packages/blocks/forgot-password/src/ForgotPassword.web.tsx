import React from "react";

// Customizable Area Start
import {
    Box
} from "@material-ui/core";
import { Formik } from "formik";
import { logoImg } from "../../email-account-registration/src/assets"
import { Link } from "react-router-dom"

import ForgotPasswordController from "./ForgotPasswordController.web";
import ForgotPassContainer from "./ForgotPasswordContainer.web";
import ForgotPassHeader from "./ForgotPasswordHeader.web";
import ArrowBack from '@material-ui/icons/ArrowBack';
import "./ForgotPassword.web.css";

// Customizable Area End
export default class ForgotPassword extends ForgotPasswordController {
    render() {
        return (
            // Required for all blocks
            <ForgotPassContainer>
                <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="space-between">
                    <Link to="/EmailAccountLogin">
                        <ArrowBack />
                    </Link>
                    <Link to="/LandingPage">
                        <img src={logoImg} alt="Logo" className="logoImgStyle" />
                    </Link>
                </Box>
                <Box className="contentForm">
                    <ForgotPassHeader
                        title="Forgot Password?"
                        paragraph="Enter your Registered email address to receive the OTP."
                    />
                    <Box display="flex" style={{ boxSizing: 'border-box' }}>
                        <Formik
                            initialValues={{
                                email: "",
                            }
                            }
                            validationSchema={this.forgotPassValidation}
                            onSubmit={this.sendEmailForForgotPass}

                        >
                            {this.forgotPassWordFormHandler}
                        </Formik>
                    </Box>
                </Box>
            </ForgotPassContainer>
        );
    }
}
