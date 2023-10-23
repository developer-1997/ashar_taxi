import React from "react";
// Customizable Area Start
import {
  Box,
  Typography,
} from "@material-ui/core";
import {styled } from "@material-ui/core/styles";
import { logoImg } from "./assets"
import {Link} from "react-router-dom"
import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class SignInSignUpHeader extends EmailAccountLoginController {
  constructor(props: Props) {
      super(props);
  }

  render() {
    return (
      // Required for all blocks
      <>
        <Box style={{ width: '100%', marginBottom:"40px" }} display="flex" flexDirection="row" justifyContent="flex-end">
          <Link to="LandingPage">
            <img src={logoImg} alt="Logo" style={{ width: '155px' }} />
          </Link>
        </Box>
        <Box style={header_signin_signup.inHeading}>
          <Typography style={header_signin_signup.isHeadValueBoxRht}>
            <LinkActive variant="h4" style={header_signin_signup.isHeadValueActive}>
              <span data-test-id={"sign-in-route"} style={header_signin_signup.isHeadValueActive} className="loginHeader">Sign In</span>
            </LinkActive>
          </Typography>
          <Typography style={header_signin_signup.isHeadValueBox}>
            <Link to="/EmailAccountRegistration" style={header_signin_signup.isHeadValue}>
              <span data-test-id={"sign-up-route"}  style={header_signin_signup.isHeadValue} className="loginHeader">Sign Up</span>
            </Link>
          </Typography>
        </Box>
      </>
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

const header_signin_signup: any = {
  // Customizable Area Start
  inHeading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: "20px"
  },
  isHeadValueBoxRht: {
    width: '50%',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRight: '1px solid #c5c5c5'
  },
  isHeadValueActive: {
    color: '#090069',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
    margin: 0,
    cursor: "pointer",
    fontSize: "26px"
  },
  isHeadValueBox: {
    width: '50%',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  isHeadValue: {
    color: '#908f9d',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '15px',
    cursor: "pointer",
    fontSize: "26px"
  },
};
