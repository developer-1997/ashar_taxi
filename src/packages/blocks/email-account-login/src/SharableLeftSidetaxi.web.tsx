import React from "react";
// Customizable Area Start
import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import {styled } from "@material-ui/core/styles";
import { imgTaxi, imageVector } from "./assets"

export default class SharableLeftSidetaxi extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      // Required for all blocks
        <Grid container>
            <Paper style={sharable_stylesForLogin.paper}>
              <Box style={sharable_stylesForLogin.contentBg}></Box>
              <SharableContentWrapperForLogin>
                <Box style={sharable_stylesForLogin.contentSize}>
                  <Typography variant="h4" style={sharable_stylesForLogin.contentHeadValue} className="leftSideTittle font">
                    Rent your Electric Taxi from your nearest depot anytime
                  </Typography>
                  <Typography variant="h6" className="leftSideBody font">
                    We're proud to be one of the only eco-friendly fully Electric Taxi companies in London, leading the way towards an eco-friendly greener, safer future and building a stronger legacy for the iconic taxi.
                  </Typography>
                </Box>
                <Box style={sharable_stylesForLogin.contentMainBox}>
                  <SharableContentBoxLftForLogin >
                    <img src={imgTaxi} alt="Taxi Image" />
                  </SharableContentBoxLftForLogin>
                </Box>
              </SharableContentWrapperForLogin>
            </Paper>
          </Grid>
    );
  }
}

const SharableContentBoxLftForLogin: any = styled(Box)({
  width: '100%',
  position: 'absolute',
  top: '100%',
  transform: 'scale(1.1)',
  '& img': {
    maxWidth: '750px',
  },
  '@media (max-width: 1800px)': {
    left: '-20px',
    '& img': {
      maxWidth: 'calc(100% + 20px)',
    },
  }
})

const SharableContentWrapperForLogin: any = styled(Box)({
  backgroundColor: '#05bf61',
  borderRadius: '25px',
  color: '#fff',
  width: '80%',
  margin: '0 auto',
  height: '550px',
  position: 'relative',
  '@media (max-width: 1200px)': {
    width: '90%',
  },
  '@media (min-width: 1600px)': {
    maxWidth: '750px',
  },
})

const sharable_stylesForLogin: any = {
  // Customizable Area Start
  contentSize: {
    width: '80%',
    padding: '35px 40px',
    marginRight: 'auto',
    marginLeft: '5px',
    color: '#01055c',
  },
  contentBg: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundImage: `url(${imageVector})`,
    backgroundSize: 'auto',
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
  },
  contentMainBox: {
    position: 'relative',
  },
  paper: {
    backgroundColor: '#090168',
    height: '100%',
    borderRadius: 0,
    width: '100%',
    padding: '2.8rem 0 15rem',
    position: 'relative',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  contentHeadValue: {
    paddingBottom: '15px',
    fontWeight: 'bold',
  },
  '@media only screen and (max-width: 570px)': {
    contentHeadValue: {
      fontSize: '30px',
    },
  },

};