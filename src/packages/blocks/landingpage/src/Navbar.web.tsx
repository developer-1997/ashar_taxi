import React from "react";
// Customizable Area Start

import { imgLogo, imguserProfile, car, profile, logout } from "./assets";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import "./Navbar.css";

// Customizable Area End

import LandingPageTaxiController, { Props } from "./LandingPageTaxiController";

export default class NavbarComponent extends LandingPageTaxiController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <Box className="NavbarContainerOuterBox">
        <Box className="LogoBoxForNavbar">
          <Link to="/LandingPage" className="logoBoxNavBar">
          <img  className={"headerLogoImage"}src={imgLogo} alt="logo" />
          </Link>
        </Box>
        {this.state.isUserLoggedIn ? (
          <Box className="avatarBoxAndDownIconBox">
            <Avatar alt="user" variant="rounded" src={imguserProfile} className="profileAvatar"/>

            <IconButton
              className="downArrowIconForNavbar"
              aria-label="KeyboardArrowDown"
              id="basic-button"
              aria-controls={this.state.open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              data-testid="IconButton"
              onClick={this.handleClick}
            >
              <KeyboardArrowDown />
            </IconButton>
          </Box>
        ) : (
          <Link
            to="/EmailAccountLogin"
            style={{
              textDecoration: "none",
              textTransform: "none",
              marginRight: "3%"
            }}
          >
            <Button
              className="loginButtonNavbar"
              data-testid="LogInButton"
              variant="contained"
            >
              <Typography variant="body1" className="loginText">Login</Typography>
            </Button>
          </Link>
        )}
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          getContentAnchorEl={null}
        >
          <MenuItem data-testid="MenuItem" onClick={this.handleClose} className="profileDorpdown">
            <img src={profile} alt="" />
            <Typography variant="body1">Profile</Typography>
          </MenuItem>
          <Divider />
          <MenuItem className="profileDorpdown">
            <Link className="MuiListItem-root" to={'/Scheduling'}>
              <img src={car} alt="" />
              <Typography variant="body1">My bookings</Typography>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleLogout} className="profileDorpdown" data-test-id="logout-button">
            <img src={logout} alt=" " />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}

// Customizable Area Start

// Customizable Area End

