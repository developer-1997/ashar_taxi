import React,{useRef} from "react"
import {
    Box,
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
  }: any) => {
    console.log("values>>>>>",values)
    const { otp1, otp2, otp3, otp4 } = values
    const otpCheck = otp1 && otp2 && otp3 && otp4
    const otp1Input: any = useRef();
    const otp2Input: any = useRef();
    const otp3Input: any = useRef();
    const otp4Input: any = useRef();
  
    const keyEventCapture = (e: any, otpCurrent: any, otpPrevious: any) => {
      if (e.key === "Backspace") {
        otpCurrent === "" && otpPrevious.current.focus()
      }
    }
  
    const handleInputChange = (e: any, otpCurrent: any = false) => {
      otpCurrent && e.target?.value !== "" && otpCurrent.current?.focus();
      handleChange(e)

    }
  
    return (
      <Grid container spacing={2} className="inputText forgotpassOtpForm">
        <Grid item xs={12}>
            <Box  className="forgotpassOtpInput">
            <FormInputContainer>
            <Input
              data-test-id="forgotPassInputFirst"
              fullWidth={true}
              name="otp1"
              value={values.otp1}
              inputRef={otp1Input}
              onChange={(e) => {
                handleInputChange(e, otp2Input)
              }}
              className="formInputOutline"
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          </FormInputContainer>
          <FormInputContainer>
            <Input
              data-test-id="forgotPassInputSecond"
              fullWidth={true}
              name="otp2"
              inputRef={otp2Input}
              value={values.otp2}
              onChange={(e) => {
                handleInputChange(e, otp3Input)
              }}
              onKeyDown={(e) => {
                keyEventCapture(e, otp2, otp1Input)
              }}
              className="formInputOutline"
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          </FormInputContainer>
          <FormInputContainer>
            <Input
              inputRef={otp3Input}
              data-test-id="forgotPassInputThird"
              fullWidth={true}
              className="formInputOutline"
              name="otp3"
              value={values.otp3}
              onChange={(e) => {
                handleInputChange(e, otp4Input)
              }}
              onKeyDown={(e) => {
                keyEventCapture(e, otp3, otp2Input)
              }}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }} />
          </FormInputContainer>
          <FormInputContainer>
            <Input
              inputRef={otp4Input}
              data-test-id="forgotPassInputFourth"
              fullWidth={true}
              className="formInputOutline"
              name="otp4"
              value={values.otp4}
              onChange={(e) => {
                handleInputChange(e)
              }}
              onKeyDown={(e) => {
                keyEventCapture(e, otp4, otp3Input)
              }}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }} />
          </FormInputContainer>
            </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            data-test-id="forgotPassOtpVerify"
            variant="contained"
            color="primary"
            fullWidth
            className={otpCheck?"verifyBtn loginHeader":"disableBtn loginHeader"}
            onClick={() => handleSubmit(values)}
            disabled={!otpCheck ? true : false}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    )
  }

  const FormInputContainer = styled('div')({
    ' & ::before': {
      display: 'none',
    },
    ' & ::after': {
      display: 'none',
    },
  
  });