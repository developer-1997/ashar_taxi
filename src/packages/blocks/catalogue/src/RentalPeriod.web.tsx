import React, { FunctionComponent } from "react";
import { Grid, Box, Typography, Button, Checkbox, } from "@material-ui/core";
import 'rsuite/dist/styles/rsuite-default.css';
import { DateRangePicker } from "rsuite";
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { imgSearchLocation, imgSearchTargetLocation, imgClock } from "./assets";
import CustomFilterCatalogueSelectBox from "../../../components/src/CustomFilterCatalogueSelectBox.web";
import "./RentalCard.css";

const options = ["Hackney", "Brixton", "Putney", "Golders Green", "Borehamwood", "Gants Hill", "Radlett", "Rochester"];


export type Props = {
    depotCheck: string;
    handleRentalPeriodMenuClose?: () => void;
    handleDepotChange?: (event: { target: { value: string } }) => void;
    handleSearch?: () => void;
    handleConfirm?: () => void;
    handleDateRangeClean?: () => void;
    tempDepotCheck: string;
    startDate: string ;
    endDate: string ;
    handleDateRangeSelect?: (date: any) => void;
    rentalPriceFilter: any;
    rentalTimeFilter: any;
    shiftCheck: string | null;
    nearestLocation:string;
    handleLocationAccess?: () => void;
}


const RentalPeriod: FunctionComponent<Props>  = (props) => {

    
     const { combine, allowedMaxDays, beforeToday } = DateRangePicker;
    return (
        <Box className="rentalPeriodContainer" height={'100%'}>
            <Grid container spacing={2} className="rentalPeriodGrid">
                <Grid item xs={12} sm={5} md={5} lg={5} >
                    <CustomFilterCatalogueSelectBox
                        label="Search Depot"
                        labelIcon={imgSearchLocation}
                        value={props.depotCheck}
                    >
                        <Box style={{ color: '#222B45', display: 'flex', alignItems: 'center', gap: '2%' }}><img src={imgSearchLocation} height={'18rem'} /><Typography variant="subtitle1">Select Pickup Location</Typography></Box>
                        <Box className="locationMenuGridBox" data-test-id='location'>
                            {options.map((item, index) => {
                                return (<Box key={`${item}-${index}`}>
                                    <Checkbox value={item} checked={props.tempDepotCheck === item} style={{ color: '#05BF61', fontWeight: 300 }} onChange={props.handleDepotChange} icon={<CircleUnchecked />} checkedIcon={<CircleChecked />} />
                                    <Box className="locationMenuListChildBox">
                                        <Typography variant="subtitle2">{item}</Typography>
                                    </Box>
                                </Box>)
                            })}
                        </Box>
                        <Box onClick={props.handleRentalPeriodMenuClose} data-test-id='handleRentalPeriodMenuCloseButton' style={{ width: '100%', marginTop: "5px" }}>
                            <Button onClick={props.handleConfirm} data-test-id="handleConfirm" style={{ backgroundColor: '#010039', color: '#E4E4E4', width: '100%' }}>
                                CONFIRM
                            </Button>
                        </Box>
                    </CustomFilterCatalogueSelectBox>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} >
                    <Box className="dateRangeContainer">
                        <DateRangePicker
                            style={{ width: "100%" }}
                            value={props.startDate && props.endDate ?  [new Date(props.startDate), new Date(props.endDate) ] : [] }
                            onOk={props.handleDateRangeSelect}
                            character=" - "
                            placeholder="Select Pickup & Drop off date"
                            onClean={props.handleDateRangeClean}
                            disabledDate={combine(allowedMaxDays(30), beforeToday())}
                        />


                    </Box>
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5}>
                    <CustomFilterCatalogueSelectBox
                        label="Search your nearby location"
                        labelIcon={imgSearchTargetLocation}
                        value={props.nearestLocation}
                        handleClick={props.handleLocationAccess}
                    >

                    </CustomFilterCatalogueSelectBox>
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} >
                    <CustomFilterCatalogueSelectBox
                        label="Select Pickup & Drop off time"
                        labelIcon={imgClock}
                        value={props.shiftCheck ? props.rentalTimeFilter[props.shiftCheck]?.time : ""}
                    >
                    </CustomFilterCatalogueSelectBox>
                </Grid>
            </Grid>
            <Box>

                <Grid item xs={12}>
                    <Box textAlign="center" marginTop="16px" display={"flex"} justifyContent={"center"}>
                        <Button variant="contained"
                            onClick={props.handleSearch}
                            className={"SearchButton"}
                            style={{ color: "white" }}
                            data-test-id="searchButton"
                        >
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Box>

        </Box>


    )
};
export default RentalPeriod

