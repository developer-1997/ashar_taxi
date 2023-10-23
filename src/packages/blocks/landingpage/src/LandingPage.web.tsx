import React from "react";
// Customizable Area Start

// Customizable Area End

import LandingPageTaxiController, { Props } from "./LandingPageTaxiController";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import NavbarComponent from "./Navbar.web";
import FooterComponent from "./Footer.web";
import "./LandingPage.css";
import FilterComponent from "./LandingPageFilters.web";
import LandingPageBannerBanner from "./LandingPageBanner.web";
import CardBox from "./CardBox.web";
import { Message } from "framework/src/Message";

export default class LandingPage extends LandingPageTaxiController {
  onReceiveRestAPISuccess(msgDeviceTokenAPI: Message) {
    throw new Error("Method not implemented.");
  }
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    
    return (
      <Box className="landingPageContainerBox">
        <NavbarComponent history={this.props.history} location={this.props.location} match={this.props.match} />
        <LandingPageBannerBanner />

        <FilterComponent history={this.props.history} location={this.props.location} match={this.props.match}/>
        <Box className="carRentalMianBox">
          <Box className="carRentalHeadingBox">
            <Typography variant="h4" className="carRentalHeading">
            Electric Taxi Rental Period
            </Typography>
            <Typography className="carRentalsubHeading" variant="subtitle2">
              Check out the most popular cars in stock today
            </Typography>
          </Box>
          <Box className="carRentalCardBox">
            <Box className="viewAllBox">
              <Link to="/CataloguePage" style={{ textDecoration: "none" }}>
                <Typography id="viewAllText">View All</Typography>
              </Link>
            </Box>

            <Box className="carRentalCardsGrid">
              {this.state.rentalCarData.length > 0 &&
                this.state.rentalCarData.map((el, index) => (
                  <Link
                    to="/CataloguePage"
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <Box className="card" data-label={el.price} >
                      <Box className="carRentalBoxImageBox">
                        <img src={el.image} alt="carimg" />
                      </Box>
                      <Box className="rentalCardbodyBoxGreen">
                        <Typography className="shiftText">
                          {el.shift}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                ))}
            </Box>
          </Box>
        </Box>

        <Box className="wideRangeMianBox">
          <Box className="wideRangeHeadingBox">
            <Typography variant="h4" className="wideRangeHeading">
              Choose from our wide range
            </Typography>
            <Typography className="wideRangesubHeading" variant="subtitle2">
              Check out the most popular cars in stock today
            </Typography>
          </Box>
          <Box className="wideRangeCardBox">
            <Box className="viewAllBox">
              <Link to="/CataloguePage" style={{ textDecoration: "none" }}>
                <Typography id="viewAllText">View All</Typography>
              </Link>
            </Box>
            {
              //  this.state.carData ?
               <Box className="wideRangeCardsGrid">
               {this.state.carData.slice(0, 3).map((el, index) => (
                 <CardBox
                   prop={el.attributes}
                   data-test-id="cardBoxListLanding"
                   key={index} 
                   history={this.props.history} 
                   location={this.props.location} 
                   match={this.props.match}               />
               ))}
             </Box>
            //  :
              // <Box className="noCabs">At this moment there are no cab available.</Box>
            }
          </Box>
        </Box>
        <FooterComponent {...this.props}/>
      </Box>
    );
  }
}

// Customizable Area Start

// Customizable Area End
