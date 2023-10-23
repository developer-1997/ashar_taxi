import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { logoImg, imageAllSet } from "./assets"
import SharableLeftSidetaxi from "../../../components/src/SharableLeftSideTaxi.web";
import { Link } from "react-router-dom"

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class AccountSuccessCreation extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      // Required for all blocks
      <ThemeProvider theme={theme} >
        <Grid container>
          <Grid item xs={12} lg={6} style={{width: "100%"}}>
            <SharableLeftSidetaxi />
          </Grid>
          <Grid item xs={12} lg={6} style={{ position: "relative" }}>
            <Box
              style={accountSuccessful_styles.rhtBox}>
              <Box style={{ width: '100%', textAlign: 'right' }}>
               <Link to="/LandingPage" className="link">
               <img style={{maxWidth:155}} src={logoImg} alt="Logo" />
               </Link>
              </Box>
              <Box style={accountSuccessful_styles.content}>
                <Box style={accountSuccessful_styles.logoBox}>
                  <img style={accountSuccessful_styles.logoImg} src={imageAllSet} alt="Image" />
                </Box>
                <Box>
                  <h1 style={accountSuccessful_styles.authTitle} > All Set !</h1>
                </Box>
                <Typography style={accountSuccessful_styles.paragraph} >
                  Your account has been created continue with reserving <br /> your Electric taxi. Please ensure  you bring the original <br /> hard copy of your driving linence and bill to the depot <br /> for the collection of your taxi
                </Typography>
              </Box>
            </Box>
            <Grid item xs={12}>
              <Box>
                <Link to="/LandingPage">
                  <Button style={accountSuccessful_styles.backbtn} className="normalText fontWeightMedium"> Back to home</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider >
    );
  }
}

const accountSuccessful_styles: any = {
  // Customizable Area Start
  body: {
    minHeight: '100vh',
  },
  backbtn: {
    position: "absolute",
    bottom: "1.875rem",
    right: "6.063rem",
    color: "#828282",
    fontWeight: "600",
    textDecoration: "underline",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '90%',
    paddingTop: "60px"
  },
  paragraph: {
    color: '#3f3f3f',
    textAlign: 'center'
  },
  authTitle: {
    fontWeight: 300
  },
  rhtBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '40px 100px 100px 100px',
    width: '100%',
    margin: '0px auto',
    maxHeight: '100vh',
    overflow: 'auto',
    boxSizing: 'border-box',
  },
};