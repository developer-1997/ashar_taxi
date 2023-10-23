import React from "react";
// Customizable Area Start

import { Box, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  imgLogo,
  imgImage_Call,
  imgImage_Sms,
  imgFacebookIcon,
  imgTwitterIcon,
  imgInstagramIcon,
  imgImage_Linkedin
} from "./assets";
import "./Footer.css";


// Customizable Area End

import LandingPageTaxiController, { Props } from "./LandingPageTaxiController";

export default class FooterComponent extends LandingPageTaxiController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { supportData } = this.props;
    return (
      <Box className="FooterOuterBlueContainer">
        <Grid className="footerContainer" container spacing={2}>
          <Grid item className="col" xs={12} sm={6} md={3}>
            <h4>Get to known us</h4>
            <Link to="">
            <p>About us</p>
            </Link>
            {/* <Box id="logotdBox">
              <div>
                <img src={imgLogo} alt="" />
              </div>
            </Box> */}
             <Box id="logotdBox">
              <div>
          <Link to="/LandingPage" className="logoBoxNavBar">
          <img  className={"headerLogoImage"}src={imgLogo} alt="logo" />
          </Link>
          </div>
        </Box> 
            <Box className="footerSocialMediaMainBox">
              <h5>Follow Us:</h5>
              <Box className="footerSocialMediaIconFlexBox">
                <img src={imgInstagramIcon} />
                <Box className="iconBoxforBackground">
                  <img src={imgFacebookIcon} />
                </Box>
                <img src={imgTwitterIcon} />
                <Box className="iconBoxforBackground">
                  <img src={imgImage_Linkedin} />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item className="col" xs={12} sm={6} md={3}>
            <h4>Contact us</h4>
            <Box className="iconBox">
              <img src={imgImage_Call} />
              <Link to={`//tel:${supportData?.support_number  || this.state.supportData?.support_number}`}>
              <Typography data-test-id="footerContact">{supportData?.support_number  || this.state.supportData?.support_number}</Typography>
              </Link>
            </Box>
            <Box className="iconBoxSMS">
              <img src={imgImage_Sms} />
              <Link to={`//mailto:${supportData?.support_email  || this.state.supportData?.support_email}`}>
              <Typography data-test-id="footerContactDummy">{supportData?.support_email || this.state.supportData?.support_email}</Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item className="col" xs={12} sm={6} md={3}>
            <h4>Info</h4>
            <Link to={'/TermsAndCondition'}><p>Terms & Condition </p></Link>
            <Link to={'/PrivacyPolicy'}><p>Privacy Policy</p></Link>
          </Grid>
          <Grid item className="col" xs={12} sm={6} md={3}>
            <h4>Depot</h4>
            <Link to="/CataloguePage?depot=Dalston">
            <p>Dalston</p>
            </Link>
            <Link to="/CataloguePage?depot=Putney">
            <p>Putney</p>
            </Link>
            <Link to="/CataloguePage?depot=Brixton">
            <p>Brixton</p>
            </Link>
            <Link to="/CataloguePage?depot=Borehamwood">
            <p>Borehamwood</p>
            </Link>
          </Grid>
        </Grid>

        <Box className="footerBottomHorizontalLineBox">
          <Typography className="footerBottomText">
            Copyright 2023. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    );
  }
}

// Customizable Area Start

// Customizable Area End
