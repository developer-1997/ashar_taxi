import React from "react";

// Customizable Area Start
import {
  Box,
  Button,
  Input,
  Typography,
  InputAdornment,
  IconButton,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { Formik } from "formik";
import {Link} from "react-router-dom"
import { lock, downArrow, logoImg } from './assets'
import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import "./EmailAccountLogin.web.css";

export const LoginForm = ({
  values,
  handleChange,
  state,
  handleClickShowPassword,
  handleSubmit,
  handleFormValidation,
  errors,
  touched,
  handleStateError
}: any) => {

  const handleInputHandler = (e: any, errorType: any) => {
    handleChange(e)
    setTimeout(() => {
      handleStateError(errorType)
    }, 0)
  }

  return (
    <>
      <Grid container spacing={3} className="inputText fullGrid">
        <Grid item xs={12} md={10} style={email_login_styles.email_password_Style}>
          <InputLabel style={email_login_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Email
          </InputLabel>

          <FormInputContainer style={email_login_styles.formContainerStyle}>
            <img style={email_login_styles.arrowImageStyle} src={downArrow} alt="" />
            <Input
              data-test-id="txt_Input_Email"
              type="text"
              name="attributes.email"
              placeholder={"Enter email"}
              fullWidth={true}
              value={values.attributes?.email}
              style={email_login_styles.formInputOutline}
              onChange={(e) => {
                handleInputHandler(e, "email")
              }}
            />
          </FormInputContainer>
          {handleFormValidation(errors?.attributes?.email, touched?.attributes?.email)}
          <div className="errorText"> {state.error?.email}</div>
        </Grid>
        <Grid item xs={12} md={10} style={email_login_styles.email_password_Style}>
          <InputLabel style={email_login_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Password
          </InputLabel>

          <FormInputContainer style={email_login_styles.formContainerStyle}>
            <img style={email_login_styles.arrowImageStyle} src={lock} alt="" />
            <Input
              data-test-id="txt_Input_Password"
              type={state.enablePasswordField ? "password" : "text"}
              name="attributes.password"
              placeholder={"Enter password"}
              fullWidth={true}
              style={email_login_styles.formInputOutline}
              value={values.attributes?.password}
              onChange={(e) => {
                handleInputHandler(e, "password")
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {state.enablePasswordField ? (<VisibilityOff />) : (<Visibility />)}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormInputContainer>
          {handleFormValidation(errors?.attributes?.password, touched?.attributes?.password)}
          <div className="errorText"> {state.error?.password}</div>
        </Grid>
        <Grid item xs={12} md={10} style={email_login_styles.forgetPasswordMainGrid}>
          <Link to="/ForgotPassword" style={{textDecoration: "none"}}>
            <Typography className="loginHeader forgetPassword">Forgot Password?</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={10} style={email_login_styles.email_password_Style}>
          <Button
            data-test-id={"btnEmail_login"}
            variant="contained"
            color="primary"
            fullWidth
            className="loginHeader"
            style={email_login_styles.verifyBtn}
            onClick={() => {
              handleSubmit()
            }}
          >
            Continue{/*UI Engine::From Sketch*/}
          </Button>
        </Grid>
        <Grid item xs={12} style={email_login_styles.email_password_Style}>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Link
              data-test-id={"login_with_otp"}
              to="/EmailAccountLoginWithMobileNo"
              style={email_login_styles.linkContent}
              className="loginHeader">
              Login with OTP
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

const LinkActive: any = styled('a')({
  fontSize: '26px'
});

export default class EmailAccountLogin extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  handleFormValidation(error: any, touched: any) {
    return (
      <div className="errorText">
        {error && touched ? error : ""}
      </div>
    )
  }
  render() {
    return (
      // Required for all blocks
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item md={12} lg={6}>
            <SharableLeftSidetaxi />
          </Grid>
          <Grid item md={12} lg={6}>
            <Box id="rightBoxContainer">
              <Box className="logoContainerStyle" display="flex" flexDirection="row" justifyContent="flex-end">
                <Link to="LandingPage">
                  <img src={logoImg} alt="Logo" className="logoImgStyle" />
                </Link>
              </Box>
              <Box className="contentForm">
                <Box style={email_login_styles.inHeading}>
                  <span data-test-id={"sign-in-route"} style={email_login_styles.isHeadValueActive} className="loginHeader">Sign In</span>
                </Box>
                <Formik
                  initialValues={{
                    type: "email_account",
                    attributes: {
                      email: "",
                      password: ""
                    }
                  }
                  }
                  validationSchema={this.emailLoginValidation}
                  onSubmit={(values) => {
                    this.createLoginForWeb(values)
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <LoginForm
                      data-test-id="registrationWrapperId"
                      values={values}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      state={this.state}
                      handleClickShowPassword={this.handleClickShowPassword}
                      setFieldValue={setFieldValue}
                      handleSubmit={handleSubmit}
                      setState={this.setState}
                      handleFormValidation={this.handleFormValidation}
                      routeHandler={this.routeHandler}
                      handleStateError={this.handleStateError}
                    />
                  )}
                </Formik>
              </Box>
              <Box flexGrow="1" width="100%" alignItems="flex-end" alignSelf="flex-end" display="flex" flexDirection="row" justifyContent="space-between">
                <Box id="linkToSignUpText" className="normalText" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                  Don't have an account?
                  <Link to="/EmailAccountRegistration" style={email_login_styles.linkContentNoUnderline}>
                    Sign Up
                  </Link>
                </Box>
                <Box id="backToHomeContainer">
                  <Link to="/LandingPage">
                    <Button style={email_login_styles.backbtn} className="normalText fontWeightMedium backToHomeButton"> Back to home</Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const FormInputContainer = styled('div')({

  ' & ::before': {
    display: 'none',
  },
  ' & ::after': {
    display: 'none',
  },

});
const email_login_styles: any = {
  // Customizable Area Start
  verifyBtn: {
    backgroundColor: '#090069',
    padding: '10px',
    borderRadius: '10px',
    textTransform: 'capitalize',
    fontSize: '20px',
    fontWeight: "bold",
    marginTop: "30px"
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
  formInputLabel: {
    color: '#242424',
    fontWeight: 'bold',
    fontSize: '18px',
  },
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
  forgetPassword: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '14px',
    color: "#242424"
  },
  email_password_Style: {
    margin: 'auto',
    minHeight: 'min-content'
  },
  sign_up_link_text: {
    margin: '0 auto 60px',
    textAlign: 'center'
  },
  formContainerStyle: {
    position: 'relative'
  },
  arrowImageStyle: {
    width: '25px', position: 'absolute', left: '18px', top: '22px'
  },
  errorStyle: {
    color: "red"
  },
  forgetPasswordMainGrid:
  {
    margin: 'auto',
    padding: '0 15px'
  },
  linkContent: {
    textDecoration: 'underline',
    color: '#090168',
    display: 'block',
    fontSize: '24px',
    cursor: "pointer"
  },
  linkContentNoUnderline: {
    textDecoration: 'none',
    color: '250068',
    fontWeight: 'bold',
    cursor: "pointer",
    marginLeft: '10px'
  },
  inHeading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: '32px',
    boxSizing: 'border-box',
    minHeight: 'min-content'
  },
  isHeadValue: {
    color: '#908f9d',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
  },
  isHeadValueBox: {
    width: '50%',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  isHeadValueBoxRht: {
    width: '50%',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
    borderRight: '1px solid #ddd'
  },
  isHeadValueActive: {
    color: '#090069',
    textDecoration: 'none',
    paddingBottom: '0',
    margin: 0
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