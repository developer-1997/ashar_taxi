import React from "react";
// Customizable Area Start

// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController.web";
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Box, Typography, } from "@material-ui/core";
import "./Card.css"
import RentalCard from "./RentalCard.web";
import NavbarComponent from "../../landingpage/src/Navbar.web";
import FooterComponent from "../../landingpage/src/Footer.web";
import CatalogueCard from "./CatalogueCard.web";


 class CatalogueCardContainer extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {

    return (
      <Box className="" style={{ backgroundColor: "#F1F1FB" }}>
        <NavbarComponent match={undefined} history={undefined} location={undefined}  />
        <Box style={{ margin: '0 auto' }}>
          <Typography className="featuretileHeader" data-testId={"Catalogue Card Heading"} style={{ padding: '0 30px' }} >
            Electric Taxi rental Period
          </Typography>
          <RentalCard
            shiftCheck={this.state.shiftCheck}
            handleDepotChange={this.handleDepotChange}
            handleSearch={this.handleSearch}
            handleChange={this.handleChange}
            depotCheck={this.state.depotCheck}
            handleConfirm={this.handleConfirm}
            tempDepotCheck={this.state.tempDepotCheck}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            handleDateRangeSelect={this.handleDateRangeSelect} 
            handleDateRangeClean={this.handleDateRangeClean}
            rentalTimeFilter={this.state.rentalTimeFilter}
            rentalPriceFilter={this.state.rentalPriceFilter}
            nearestLocation = {this.state.nearestLocation}
            data-test-id="rentalCardComponent"
            />

          {this.state.message.length > 0 &&
            <Box className={this.state.cabsData.length !== 0 ? "noRecordFound" : ""}>
              <Box className="notAvailableCar" >
                <ErrorOutlineOutlinedIcon className="errorIcon" />
                <Typography className="noAvailable" data-testId={"No Cars"} >No available cars.</Typography>
              </Box>
            </Box>
          }
          <Box className={""}>
            {<Box className="wideRangeCardsGridTaxiContainerCatalogue" margin="1rem">
              <Typography className="featuretileHeader" data-testId={"Card Heading"}>
                Available Electric Taxi
              </Typography>
              <Box className="wideRangeCardsGridTaxiCatalogue">

                {(this.state.filteredCabsData.length > 0 ? this.state.filteredCabsData : this.state.cabsData).map((el: any, index: number) => (
                  <Box data-testId="cardBoxList">
                  <CatalogueCard
                    id={el.id}
                    element={el.attributes}
                    datatestId={"cardBox"}
                    key={index}
                  />
                  </Box>
                ))
                }
              </Box>
            </Box>}
          </Box>
        </Box>
        <FooterComponent match={undefined} history={undefined} location={undefined}   />
      </Box>
    );
  }
}

// Customizable Area Start
export default CatalogueCardContainer
// Customizable Area End



