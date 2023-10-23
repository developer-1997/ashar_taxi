import React,{useRef} from "react"
import {
    Button,
    Input,
    Grid,
} from "@material-ui/core";
import {
    styled,
} from "@material-ui/core/styles";

export const OtpInputField = ({
    values,
    handleChange,
    handleSubmit,
    handleStateError,
    state
}: any) => {
    const { otp1, otp2, otp3, otp4 } = values;
    const otpCheck = !(otp1 && otp2 && otp3 && otp4);
    const otp1InputForMobile: any = useRef();
    const otp2InputForMobile: any = useRef();
    const otp3InputForMobile: any = useRef();
    const otp4InputForMobile: any = useRef();

    const keyEventCaptureForMobile = (e: any, otpCurrent: any, otpPrevious: any) => {
        if (e.key === "Backspace") {
            otpCurrent === "" && otpPrevious.current.focus()
        }
    }

    const handleInputChangeForMobile = (e: any, otpCurrent: any = false) => {
        otpCurrent && e.target?.value !== "" && otpCurrent.current?.focus();
        handleChange(e)
        setTimeout(() => {
            handleStateError("pin")
        }, 0)
    }
    return (
        <Grid container spacing={3} >
            <Grid item xs={3}>
                <FormInputContainer>
                    <Input
                        inputRef={otp1InputForMobile}
                        data-test-id="txtInputFirst"
                        fullWidth={true}
                        name="otp1"
                        value={values.otp1}
                        onChange={(e) => {
                            handleInputChangeForMobile(e, otp2InputForMobile)
                        }}
                        style={sign_up_styles_for_login_confirm.formInputOutline}
                        inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                    />
                </FormInputContainer>
            </Grid>
            <Grid item xs={3}>
                <FormInputContainer>
                    <Input
                        inputRef={otp2InputForMobile}
                        data-test-id="txtInputSecond"
                        fullWidth={true}
                        name="otp2"
                        value={values.otp2}
                        onChange={(e) => {
                            handleInputChangeForMobile(e, otp3InputForMobile)
                        }}
                        onKeyDown={(e) => {
                            keyEventCaptureForMobile(e, otp2, otp1InputForMobile)
                        }}
                        style={sign_up_styles_for_login_confirm.formInputOutline}
                        inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                    />
                </FormInputContainer>
            </Grid>
            <Grid item xs={3}>
                <FormInputContainer>
                    <Input
                        inputRef={otp3InputForMobile}
                        data-test-id="txtInputThird"
                        fullWidth={true}
                        style={sign_up_styles_for_login_confirm.formInputOutline}
                        name="otp3"
                        value={values.otp3}
                        onChange={(e) => {
                            handleInputChangeForMobile(e, otp4InputForMobile)
                        }}
                        onKeyDown={(e) => {
                            keyEventCaptureForMobile(e, otp3, otp2InputForMobile)
                        }}
                        inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                    />
                </FormInputContainer>
            </Grid>

            <Grid item xs={3}>
                <FormInputContainer>
                    <Input
                        inputRef={otp4InputForMobile}
                        data-test-id="txtInputFourth"
                        fullWidth={true}
                        style={sign_up_styles_for_login_confirm.formInputOutline}
                        name="otp4"
                        value={values.otp4}
                        onChange={(e) => {
                            handleInputChangeForMobile(e)
                        }}
                        onKeyDown={(e) => {
                            keyEventCaptureForMobile(e, otp4, otp3InputForMobile)
                        }}
                        inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                    />
                </FormInputContainer>
            </Grid>
            <div className="errorText">
                {state?.error.pin}
            </div>
            <Grid item xs={12}>
                <Button
                    data-test-id="btnVerifyotp"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={otpCheck ? sign_up_styles_for_login_confirm.disableBtn : sign_up_styles_for_login_confirm.verifyBtn}
                    onClick={() => handleSubmit()}
                    disabled={otpCheck}
                    className="loginHeader"
                >
                    Continue
                </Button>
            </Grid>
        </Grid>
    );
};

const FormInputContainer = styled("div")({
    " & ::before": {
        display: "none",
    },
    " & ::after": {
        display: "none",
    },
});
const sign_up_styles_for_login_confirm: any = {
    // Customizable Area Start
    verifyBtn: {
        backgroundColor: "#090168",
        padding: "15px",
        borderRadius: "10px",
        fontSize: '18px',
        textTransform: "capitalize",
    },
    disableBtn: {
        backgroundColor: "#c8c7c7",
        padding: "15px",
        borderRadius: "10px",
        color:"#fff",
        fontSize: '18px',
        textTransform: "capitalize",
    },
    formInputOutline: {
        border: "1px solid #c5c5c5",
        padding: "5px 15px",
        borderRadius: "5px",
        margin: "5px 0",
        width: "88%",
        minHeight: "68px",
        fontSize: '30px',
        fontWeight: '400'

    }
};