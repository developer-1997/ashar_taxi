import React from "react";
// Customizable Area Start

import 'rsuite/dist/styles/rsuite-default.css';
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { Box, Typography,  Button,  FormControlLabel,  RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom"
import './LandingPageFilters.css'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { imgLocation, imgCar, imgTime } from "./assets";

// Customizable Area End


import LandingPageTaxiController, {
  Props,
} from "./LandingPageTaxiController";
import CustomFilterSelectBox from "../../../components/src/customFilterSelectBox.web";
import RadioWrapper from "./RadioWrapper.web";


export default class FilterComponent extends LandingPageTaxiController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { combine, allowedMaxDays, beforeToday } = DateRangePicker;
    return (

      <Box className="LandingPageFiltersBox" >
        <Typography className="ForSmallScreenText" >Apply Filters</Typography>
        <Box className="LandingPageFilterschildBox" >
          <CustomFilterSelectBox
            label="Select Rental Period"
            labelIcon={imgCar}
            value={this.state.rentalShift.includes("Half") ? "Half Shift" : this.state.rentalShift}
          >
            <Typography className="dropdownHeading">SELECT RENTAL PERIOD</Typography>
            <Box className="RentalPeriodGridBoxMenu">
              {this.state.rentalPeriod.map((item) => (
                <div key={item.heading} data-test-id='RentalPeriodGridBox' className={`RentalPeriodGridBoxMenuItem ${item?.selected ? 'selected' : ''}`} onClick={() => this.handleBackground(item.id)}>
                  <img src={item.img} />
                  <Typography variant="subtitle2" className="heading">{item.heading}</Typography>
                  <Typography variant="subtitle2" className="price">£{item.price}</Typography>
                </div>
              ))}
            </Box>
            <Box onClick={() => this.handleRentalPeriodMenuClose("confirm")} data-test-id='handleRentalPeriodMenuCloseButton' style={{ width: '100%' }}><Button style={{ backgroundColor: '#010039', color: '#E4E4E4', width: '100%' }}>CONFIRM</Button></Box>
          </CustomFilterSelectBox>
          <CustomFilterSelectBox
            label="Select pickup/drop location"
            labelIcon={imgLocation}
            value={this.state.rentalDepot}
          >
            <Box style={{ color: '#222B45', display: 'flex', alignItems: 'center', gap: '2%' }}><img src={imgLocation} height={'18rem'} /><Typography variant="subtitle1">Select Pickup Location</Typography></Box>
            <RadioGroup aria-label="gender" name="gender1" className="locationMenuGridBox">
              <FormControlLabel
                value="LG"
                control={
                  <RadioWrapper
                    handleDepotSelection={this.handleDepotSelection}
                    tempDepot={this.state.tempDepot}
                    id={"Hackney"} 
                    data-test-id="Hackney"      
                    />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Hackney</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="AL"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Brixton"}  
                  data-test-id="Brixton"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Brixton</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="LS"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Putney"}  
                  data-test-id="Putney"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Putney</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="LG1"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Golders Green"}  
                  data-test-id="Golders Green"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Golders Green</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="LS1"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Borehamwood"}  
                  data-test-id="Borehamwood"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Borehamwood</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="LG2"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Gants Hill"}  
                  data-test-id="Gants Hill"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Gants Hill</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="LC"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Radlett"}  
                  data-test-id="Radlett"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Radlett</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="BT"
                control={
                  <RadioWrapper
                  handleDepotSelection={this.handleDepotSelection}
                  tempDepot={this.state.tempDepot}
                  id={"Rochester"}  
                  data-test-id="Rochester"      
                  />
                }
                label={
                  <Box className="locationMenuListChildBox">
                    <Typography variant="subtitle2">Rochester</Typography>
                  </Box>
                }
              />
            </RadioGroup>
            <Box onClick={() => this.handleRentalPeriodMenuClose("depot")} data-test-id='handleRentalPeriodMenuCloseButtonDepot' style={{ width: '100%' }}><Button style={{ backgroundColor: '#010039', color: '#E4E4E4', width: '100%' }}>CONFIRM</Button></Box>
          </CustomFilterSelectBox>

          <Box className="dateRange dropdownMain">
            <DateRangePicker
              value={this.state.rangeDate}
              onChange={(value: any) => this.setState({ rangeDate: value })}
              character=" - "
              placeholder="Select Date" 
              disabledDate={combine(allowedMaxDays(30), beforeToday())}
              />
          </Box>
          <Box className="timeFilter dropdownMain">
            <CustomFilterSelectBox
              label="Select time"
              labelIcon={imgTime}
              value={this.state.shiftTime}
            >

            </CustomFilterSelectBox>
          </Box>
          <Box >
            <Link to={`/CataloguePage?shift=${this.state.rentalShift}&depot=${this.state.rentalDepot}&startDate=${this.state.rangeDate[0] ? moment(this.state.rangeDate[0]).format("YYYY-MM-DD") : ""}&endDate=${this.state.rangeDate[1] ? moment(this.state.rangeDate[1]).format("YYYY-MM-DD"): ""}`}>
              <Button className="BookNowButtonForFileter" variant="contained" endIcon={<TrendingFlatIcon />}>Book Now</Button>
            </Link>
          </Box>
        </Box>

      </Box>
    );
  }
}

// Customizable Area Start

// Customizable Area End
