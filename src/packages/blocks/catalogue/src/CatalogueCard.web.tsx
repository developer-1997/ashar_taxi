import React,{FunctionComponent} from "react";
// Customizable Area Start
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { imgLocation, imgCar, imgSeat } from "./assets";
import "./Card.css";

// Customizable Area End


export type Props = {
  id: string;
  element: any;
  datatestId :  string;
  key: any;
}
const CatalogueCard: FunctionComponent<Props> = (props) =>  {
  
  
    // Customizable Area Start

    // Customizable Area End
  

  // Customizable Area Start

  // Customizable Area End
  
    return (
      <Box className="CardBoxCatalogue" data-testId="cardBox">
        <Box className="CardImageBoxCatalogue">
          <img src={props.element.cab_image} />
        </Box>
        <Box className="CardTitleBox">
          <Typography className="featuretileText">
            {props.element.cab_name}{" "}
          </Typography>
        </Box>
        <Box className="CardFeatureboxCatalogue">
          <Box>
            <img src={imgLocation} />
            <Typography variant="caption" className="featureCaption">
              {props.element.depot}
            </Typography>
          </Box>
          <Box>
            <img src={imgSeat} />

            <Typography variant="caption" className="featureCaption">
              {props.element.number_of_seats}
            </Typography>
            <Typography variant="caption" className="featureCaption">
              Seats
            </Typography>
          </Box>
          <Box>
            <img src={imgCar} />
            <Typography variant="caption" className="featureCaption carDescription">
              {props.element.colour}
            </Typography>
          </Box>
        </Box>
        <Box className="CardButtonboxCatalogue">
          <Link
            className="buttonForBookNowWideRange"
            to={'/CataloguePage/'+props.id}
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

export default CatalogueCard;
// Customizable Area Start

// Customizable Area End
