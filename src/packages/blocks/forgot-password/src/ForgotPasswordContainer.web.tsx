import React, { Component } from "react";

// Customizable Area Start
import { Box, Button, Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./ForgotPasswordContainer.web.css"
import SharableLeftSideTaxi from "../../../components/src/SharableLeftSideTaxi.web";

// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff"
    }
  }
});

export default class ForgotPassContainer extends Component {
  render() {
    return (
      // Required for all blocks
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item md={12} lg={6}>
            <SharableLeftSideTaxi />
          </Grid>
          <Grid item md={12} lg={6}>
            <Box id="rightBoxContainer">
              {this.props.children}
              <Box
                className="backToHomeContainer"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Link to="/LandingPage">
                  <Button className="normalText fontWeightMedium backToHomeButton">
                    Back to home
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
