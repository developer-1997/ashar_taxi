import React from "react";
// Customizable Area Start
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { imgLocation, imgCar, imgSeat } from "./assets";
import "./Card.css";

// Customizable Area End

import LandingPageTaxiController, { Props } from "./LandingPageTaxiController";

export default class CardBox extends LandingPageTaxiController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    return (
      <Box className="CardBox" data-testId="cardBox">
        <Box className="CardImageBox">
          <img src={this.props.prop.cab_image} />
        </Box>
        <Box className="CardTitleBox">
          <Typography className="featuretileText">
            LEVC TXE Comfort Plus{" "}
          </Typography>
          <Typography className="featuretileText">
            Electric - Automatic
          </Typography>
        </Box>
        <Box className="CardFeaturebox">
          <Box>
            <img src={imgLocation} />
            <Typography variant="caption" className="featureCaption">
              Dalston
            </Typography>
          </Box>
          <Box>
            <img src={imgSeat} />

            <Typography variant="caption" className="featureCaption">
              {this.props.prop.number_of_seats}
            </Typography>
            <Typography variant="caption" className="featureCaption">
              Seats
            </Typography>
          </Box>
          <Box>
            <img src={imgCar} />
            <Typography
              variant="caption"
              className="featureCaption carDescription"
            >
              {this.props.prop.colour}
            </Typography>
          </Box>
        </Box>
        <Box className="CardButtonbox">
          <Link
            className="buttonForBookNowWideRange"
            to="/CataloguePage"
            data-testId="blueButtonForTest"
            style={{
              backgroundColor: "#05BE61",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            <Button
              style={{
                color: "#FFF",
                textTransform: "none",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: 600
              }}
            >
              Book Electric Taxi
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }
}

// Customizable Area Start

// Customizable Area End
