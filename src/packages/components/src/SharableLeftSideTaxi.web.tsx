import React from "react";
// Customizable Area Start
import {
    Box,
    Typography,
    Grid,
    Paper,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { oldLogo } from "../../blocks/email-account-login/src/assets"

const theme = createTheme({
    palette: {
        primary: {
            main: "#0000ff",
            contrastText: "#fff",
        },
    },
});

export default class SharableLeftSideTaxi extends React.Component {
    render() {
        return (
            // Required for all blocks
            <ThemeProvider theme={theme}>
                <Grid container className="SharableLeftSideContent">
                    <Paper className="container">
                        {/* <Box className="vectorShape"></Box> */}
                        <Box className="contentContainer">
                            <Box className="contentArea">
                                <Typography variant="h4" className="leftSideTittle font title">
                                    Rent your taxi from <span><img className="logoImage" src={oldLogo} alt="Taxi Image" /></span>
                                </Typography>
                                <Typography variant="h4" className="leftSideTittle font title">
                                    the electric taxi sharing app
                                </Typography>
                                <Typography variant="h6" className="leftSideBody font">
                                    Now you can rent your electrix taxi by shift, by day, by week, by location.
                                </Typography>
                            </Box>
                        </Box>
                        {/* <Box className="imageContainer">
                            <img src={imgTaxi} alt="Taxi Image" />
                        </Box> */}
                    </Paper>
                </Grid>
            </ThemeProvider >
        );
    }
}
