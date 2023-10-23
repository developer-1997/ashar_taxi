import React from "react";

// Customizable Area Start
import {
    Box,
    Button,
    Input,
    InputLabel,
    Grid
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { downArrow } from '../../blocks/email-account-login/src/assets';
import "./LoginWithMobileNoForm.web.css";

export const LoginWithMobileNo = ({
    values,
    state,
    handleChange,
    handleSubmit,
    handleFormValidationForLogin,
    errors,
    handleStateError,
    touched
}: any) => {

    const handleInputHandlerInMobile = (e: any, errorType: any) => {
        handleChange(e)
        setTimeout(() => {
            handleStateError(errorType)
        }, 0)
    }

    return (
        <>
            <Grid container className="inputText mainBoxContainer">
                <Grid item xs={12} style={login_with_otp_ForWeb.constainerBlock}>
                    <InputLabel style={login_with_otp_ForWeb.formInputLabel} shrink htmlFor="bootstrap-input" >
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                            <Box className="fontWeightMedium">Enter Registered Phone Number</Box>
                            <Box className="errorText">
                                {state?.error.full_phone_number}
                                {handleFormValidationForLogin(errors?.attributes?.full_phone_number, touched?.attributes?.full_phone_number)}
                            </Box>
                    </Box>
                    </InputLabel>
                    <FormInputContainerLoginForWeb >
                        <img src={downArrow} alt="" />

                        <Input
                            data-test-id="full_phone_number"
                            type="text"
                            name="attributes.full_phone_number"
                            placeholder="Enter phone number without country code(+41)"
                            fullWidth={true}
                            value={values.attributes?.full_phone_number}
                            style={login_with_otp_ForWeb.formInputOutline}
                            onChange={(e) => {
                                handleInputHandlerInMobile(e, "full_phone_number")
                            }}
                        />
                    </FormInputContainerLoginForWeb>
                </Grid>
                <Grid item xs={12} style={login_with_otp_ForWeb.buttonContainer}>
                    <Button
                        data-test-id={"submit_mobile_no"}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={login_with_otp_ForWeb.verifyBtn}
                        onClick={() => handleSubmit()}
                        className="loginHeader"
                    >
                        Continue{/*UI Engine::From Sketch*/}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

const FormInputContainerLoginForWeb = styled('div')({
    position: 'relative',
    ' & ::before': {
        display: 'none',
    },
    ' & ::after': {
        display: 'none',
    },
    '& img': {
        width: '25px',
        position: 'absolute',
        left: '18px',
        top: '21px',
    },

});

const login_with_otp_ForWeb: any = {
    // Customizable Area Start

    formInputOutline: {
        border: '1px solid #c5c5c5',
        padding: '5px 15px 5px 60px',
        borderRadius: '10px',
        margin: '5px 0',
        fontWeight: '700',
        fontSize: '15px',
        width: '100%',
        height: "60px"
    },
    inHeading: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: "20px"
    },
    // errorMessage: {
    //     color: "red"
    // },
    mainContainer: { margin: '5rem auto' },
    isHeadValue: {
        color: '#908f9d',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '15px',
    },
    verifyBtn: {
        backgroundColor: '#090069',
        padding: '15px',
        borderRadius: '10px',
        textTransform: 'capitalize',
        fontSize: '18px',
        fontWeight: "bold"
    },
    formInputLabel: {
        transform:"none",
        color: '#242424',
        fontWeight: 'bold',
        marginTop: '-20px',
        fontSize: '16px',
    },
    isHeadValueBox: {
        width: '50%',
        textAlign: 'center',
        fontSize: '26px',
        fontWeight: 'bold',
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
    constainerBlock: { margin: 'auto' },
    buttonContainer: { margin: '24px auto' },
    isHeadValueBoxRht: {
        width: '50%',
        textAlign: 'center',
        fontSize: '26px',
        fontWeight: 'bold',
    },
    isHeadValueActive: {
        color: '#090069',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '15px',
        margin: 0,
    },
    logoStyle: { width: '100%', textAlign: 'right', marginBottom: "40px" },
    container: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 650,
        backgroundColor: "#fff",
        height: '100%'
    },
    // Customizable Area End
};