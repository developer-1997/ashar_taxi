import React from "react";

// Customizable Area Start
import {
  Box,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import { Formik } from "formik";
import {logoImg } from "./assets"
import {Link} from "react-router-dom"

import EmailAccountRegistrationController, {
  Props
} from "./EmailAccountRegistrationController";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
export const configJSON = require("./config");

// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class EmailAccountRegistration extends EmailAccountRegistrationController {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid container className="inputText">
          <Grid item md={12} lg={6} style={{width: "100%"}}>
            <SharableLeftSidetaxi />
          </Grid>
          <Grid item md={12} lg={6} style={{position:"relative"}} >
            <Box style={email_registration_styles.rhtBox}>
              <Box style={{ width: '100%', marginBottom: "40px" }} display="flex" flexDirection="row" justifyContent="flex-end">
                <Link to={configJSON.landingPage}>
                  <img src={logoImg} alt="Logo" style={{ width: '155px' }} />
                </Link>
              </Box>
              <Box style={email_registration_styles.inHeading}>
                <Typography style={email_registration_styles.isHeadValueBox}>
                  <Link to={configJSON.emailAccountLogin} style={email_registration_styles.isHeadValue}>
                    <span  style={email_registration_styles.isHeadValue} className="loginHeader" data-test-id="signIN">{configJSON.signIn}</span>
                  </Link>
                </Typography>
                <Typography style={email_registration_styles.isHeadValueBoxRht}>
                  <LinkActive variant="h4" component="h2" style={email_registration_styles.isHeadValueActive}>
                    <span style={email_registration_styles.isHeadValueActive} className="loginHeader">{configJSON.signUp}</span>
                  </LinkActive>
                </Typography>
              </Box>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  password: "",
                  password_confirmation: "",
                  full_phone_number: "",
                  email: "",
                  license_number: "",
                  license_exp_date: "12/05/2023",
                  badge: "",
                  sector: "",
                  badge_number: "",
                  license_front: "",
                  license_back: "",
                  bill_document:"",
                  type: "email_account"
                }
                }
                validationSchema={this.emailRegistrationValidation}
                onSubmit={this.createNewAccountForWeb}
              >
                {this.registrationFormHanler}
              </Formik>
            </Box>
            <Grid item xs={12}>
              <Box>
                <Link to="/LandingPage">
                  <Button style={email_registration_styles.backbtn} className="normalText fontWeightMedium">{configJSON.backBtn}</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
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
const email_registration_styles: any = {
  // Customizable Area Start
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff"
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
  formControl: {
    width: "100%"
  },
  verifyBtn: {
    backgroundColor: '#090069',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight:"bold",
  },
  formInputLabel: {
    color: '#242424',
    fontWeight: 'bold',
    marginTop: '-15px',
    fontSize: '18px',
  },
  formInputOutline: {
    border: '1px solid #c5c5c5',
    padding: '5px 15px',
    borderRadius: '5px',
    margin: '5px 0',
    fontWeight: '700',
    fontSize: '15px',
    width: '100%'
  },
  formInputOutlineClick: {
    border: '1px solid #c5c5c5',
    borderRadius: '5px',
    margin: '5px 0',
    fontWeight: '700',
    fontSize: '15px',
    width: '100%',
    position: 'absolute',
    opacity: 0,
    minHeight: '50px'
  },
  formInputUpload: {
    border: '1px solid #c5c5c5',
    padding: '10px 15px 15px',
    borderRadius: '5px',
    margin: '5px 0',
    fontWeight: '500',
    fontSize: '15px',
    textDecoration: 'underline',
    justifyContent: 'flex-start',
    width: '100%',
    zIndex: '-1',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    color: "90859d",
    img: {
      marginRight: '10px'
    }
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
    cursor:"pointer",
    fontSize: "26px",
    top:"2px",
  },
  isHeadValueActive: {
    color: '#090069',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
    margin: 0,
    cursor:"pointer",
    fontSize:"26px",
  },
  inHeading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: "40px",
    marginTop: "20px"
  },
  rhtBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '40px 60px 100px',
    width: '100%',
    margin: '0px auto',
    maxHeight: '100%',
    overflow: 'hidden auto',
    boxSizing: 'border-box',
  },
  license_styles: {
    position: 'absolute',
    left: '0%',
    top: '50%',
    transform: 'translate(-0%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  licenseImg: {
    height: '73px',
  },
  licenseDeleteBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    color: 'red',
    border: '0',
    fontWeight: '700',
    height: '10px'
  },
  licenseReloadeBtn: {
    color: '#32a852',
    border: '0',
    fontWeight: '700',
    height: '10px',
    position: 'absolute',
    right: 12,
    top: -33,
  },
  uploadCloud: {
    width: '20px',
    marginRight: '10px'
  }
  // Customizable Area End
};