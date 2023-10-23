import React, { FunctionComponent } from "react";
import { Grid, Radio, Box, Typography, Checkbox, Card, Accordion, AccordionSummary, AccordionDetails, FormControlLabel } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./RentalCard.css";
import RentalPeriod from "./RentalPeriod.web";
import RadioGroup from '@material-ui/core/RadioGroup';
import CheckBoxWrapper from "./CheckBoxWrapper.web";

export type Props = {
  shiftCheck: string | null;
  depotCheck: string;
  handleRentalPeriodMenuClose?: () => void;
  handleDepotChange?: (event: { target: { value: string } }) => void;
  handleChange?: (event: { target: { value: string } }) => void;
  handleSearch?: () => void;
  handleConfirm?: () => void;
  handleDateRangeClean?: () => void;
  tempDepotCheck: string;
  startDate: string;
  endDate: string;
  handleDateRangeSelect?: (date: any) => void;
  rentalPriceFilter: any;
  rentalTimeFilter: any;
  nearestLocation: string;
}

const RentalCard: FunctionComponent<Props> = (props) => {
  return (
    <Grid container spacing={2} className="mainGrid">
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <Card className="cardRental">
          <Box className="weeklyChangeBox" data-test-id="check-one">
            <FormControlLabel
              control={
              <CheckBoxWrapper 
                  check={"Weekly"}
                  handleChange={props.handleChange}
                  id={"weekly-change"}
                  data-test-id="weekly-change"
                  shiftCheck={props.shiftCheck}           
                   />
        
            }
            
              label="Weekly"
              labelPlacement="end"
              className="rentalCardInputText"
            />
            <Typography className="rentalCardInputText" data-testId="Rental Price">£{props.rentalPriceFilter?.Weekly?.price || " "}</Typography>
          </Box>
          <Box className="monthlyCheckBox">
            <FormControlLabel
              control={
                <CheckBoxWrapper 
                  check={"Monthly"}
                  handleChange={props.handleChange}
                  id={"monthly-change"}
                  data-test-id="monthly-change" 
                  shiftCheck={props.shiftCheck}              />
             }
              label="Monthly"
              labelPlacement="end"
              className="rentalCardInputText"
            />
            <Typography className="rentalCardInputText">£{props.rentalPriceFilter?.Monthly?.price || " "}</Typography>
          </Box>
          <Box className="halfShiftCheck">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ height: "48px", padding: "0 10px" }}
              >
                <FormControlLabel
                  value="Half Shift - 1"
                  control={<Checkbox color="primary"
                    onChange={props.handleChange}
                    style={{ color: "green" }}
                    checked={props.shiftCheck === "Half Shift - 1" || props.shiftCheck === "Half Shift - 2"}
                  />}
                  data-test-id="half-shift-change" 
                  label="Half Shift(6 hours)"
                  labelPlacement="end"
                  className="rentalCardInputText"
                />
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup row aria-label="position" name="position" defaultValue="top"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 8px', boxShadow: '0px 1px 6px 0px #00000017' }}>
                  <Box className="halfShiftCheckbox">
                    <FormControlLabel
                      value="Half Shift - 1"
                      control={<Radio style={{ color: "green" }}
                        checked={props.shiftCheck === "Half Shift - 1"}
                        onChange={props.handleChange}
                      />}
                      label={props.rentalTimeFilter['Half Shift - 1']?.time || "7AM - 3PM"}
                      labelPlacement="end"
                      className="rentalCardInputText"
                    />
                    <Typography className="rentalCardInputText">£{props.rentalPriceFilter['Half Shift - 1']?.price}</Typography>
                  </Box>
                  <Box className="halfShiftCheckboxTwo">
                    <FormControlLabel
                      value="Half Shift - 2"
                      control={<Radio style={{ color: "green" }}
                        checked={props.shiftCheck === "Half Shift - 2"}
                        onChange={props.handleChange}
                      />}
                      label={props.rentalTimeFilter['Half Shift - 2']?.time || "4PM - 5AM"}
                      labelPlacement="end"
                      className="rentalCardInputText"
                    />
                    <Typography className="rentalCardInputText">£{props.rentalPriceFilter['Half Shift - 2']?.price}</Typography>
                  </Box>
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="fullShift">
            <FormControlLabel
              value="end"
              control={<Checkbox
                style={{ color: "green" }}
                value="Full Shift"
                checked={props.shiftCheck === "Full Shift"}
                onChange={props.handleChange}
              />}
              label="Full Shift(10 hours)"
              labelPlacement="end"
              className="rentalCardInputText"
            />
            <Typography className="rentalCardInputText">£{props.rentalPriceFilter['Full Shift']?.price}</Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={9}>
        <RentalPeriod
          handleSearch={props.handleSearch}
          handleDepotChange={props.handleDepotChange}
          depotCheck={props.depotCheck}
          tempDepotCheck={props.tempDepotCheck}
          handleRentalPeriodMenuClose={props.handleRentalPeriodMenuClose}
          handleConfirm={props.handleConfirm}
          startDate={props.startDate}
          endDate={props.endDate}
          handleDateRangeSelect={props.handleDateRangeSelect}
          handleDateRangeClean={props.handleDateRangeClean}
          shiftCheck={props.shiftCheck}
          rentalTimeFilter={props.rentalTimeFilter}
          rentalPriceFilter={props.rentalPriceFilter}
          nearestLocation={props.nearestLocation}
          data-test-id="rentalPeriodComponent"
        />
      </Grid>
    </Grid>
  );
};

export default RentalCard;
