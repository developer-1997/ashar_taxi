import React, { Component } from "react";
import { Grid, Box, Button, Typography } from "@material-ui/core"
import { landingPageCar} from "./assets"
import {Link} from "react-router-dom"
import "./LandingPage.css"

export default class LandingPageBannerBanner extends Component {
    render() {
        return (
            <>
                <Grid container className="landingPageBanner">
                    <Grid item style={{paddingTop:"30px"}} lg={6}>
                        <Box sx={{
                            paddingLeft: {
                                sm: "20px",
                                lg: "17%",
                            }
                        }}>
                            <Typography variant="subtitle1">Book your electric Taxi at your nearby depot.</Typography>
                            <Typography variant="h1" component="h1">The Electric Taxi Co, Leading the Way to  <span>Eco-Friendly</span></Typography>
                            <Typography style={{marginBottom:"34px"}} variant="h1" component="h1">Transport.</Typography>
                            <Link to="/CataloguePage">
                            <Button variant="contained" size="small" >Book taxi</Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item lg={6} style={{width: "100%"}}>
                    <Box>
                        <img src={landingPageCar} alt="" />
                    </Box>
                    </Grid>
                </Grid>
            </>
        )
    }
}

