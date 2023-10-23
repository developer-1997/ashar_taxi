import React from "react";

// Customizable Area Start
import { Box } from "@material-ui/core";
import { Formik } from "formik";
import { logoImg } from "../../email-account-registration/src/assets";
import { Link } from "react-router-dom";

import ForgotPasswordController from "./ForgotPasswordController.web";
import ForgotPassContainer from "./ForgotPasswordContainer.web";
import ForgotPassHeader from "./ForgotPasswordHeader.web";
import ArrowBack from "@material-ui/icons/ArrowBack";
import "./CreatedNewPassword.web.css";

// Customizable Area End

export default class CreateNewPassword extends ForgotPasswordController {
  render() {
    return (
      // Required for all blocks
      <ForgotPassContainer>
        <Box
          className="logoContainerStyle"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Link to="/ForgotPassword">
            <ArrowBack />
          </Link>
          <Link to="/LandingPage">
            <img src={logoImg} alt="Logo" className="logoImgStyle" />
          </Link>
        </Box>
        <Box className="verificationForm">
          <ForgotPassHeader
            title="Reset password"
            paragraph="Please set your new password, making sure it contains at least one uppercase letter, one lowercase letter, one number, and one special character for security"
          />
          <Box id="newPasswordForm" display="flex">
            <Formik
              initialValues={{
                password: "",
                confirmpassword: ""
              }}
              validationSchema={this.newPassvalidation}
              onSubmit={values => {
                this.newPassForForgotPass(
                  values,
                  this.props.location.state.email
                );
              }}
            >
              {this.createdNewPasswordFormHandler}
            </Formik>
          </Box>
        </Box>
      </ForgotPassContainer>
    );
  }
}
