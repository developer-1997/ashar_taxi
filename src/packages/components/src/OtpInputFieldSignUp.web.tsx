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
  }: any) => {
  
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
      // handleStateError("pin")
    }
  
    return (
      <Grid container spacing={3} className="inputText">
        <Grid item xs={3}>
          <FormInputContainer>
            <Input
              data-test-id="txtInputFirst"
              fullWidth={true}
              name="otp1"
              value={values.otp1}
              inputRef={otp1Input}
              onChange={(e) => {
                handleInputChange(e, otp2Input)
              }}
              style={sign_up_styles.formInputOutline}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          </FormInputContainer>
        </Grid>
        <Grid item xs={3}>
          <FormInputContainer>
            <Input
              data-test-id="txtInputSecond"
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
              style={sign_up_styles.formInputOutline}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          </FormInputContainer>
        </Grid>
        <Grid item xs={3}>
          <FormInputContainer>
            <Input
              inputRef={otp3Input}
              data-test-id="txtInputThird"
              fullWidth={true}
              style={sign_up_styles.formInputOutline}
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
        </Grid>
  
        <Grid item xs={3}>
          <FormInputContainer>
            <Input
              inputRef={otp4Input}
              data-test-id="txtInputFourth"
              fullWidth={true}
              style={sign_up_styles.formInputOutline}
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
        </Grid>
        <Grid item xs={12}>
          <Button
            data-test-id={"btnOtpVerify"}
            variant="contained"
            color="primary"
            fullWidth
            style={otpCheck ? sign_up_styles.verifyBtn : sign_up_styles.disableBtn}
            onClick={(values) => handleSubmit(values)}
            disabled={!otpCheck ? true : false}
            className="loginHeader"
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

  const sign_up_styles: any = {
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
      border: '1px solid #c5c5c5',
      padding: '5px 15px',
      borderRadius: '5px',
      margin: '5px 0',
      fontSize: '30px',
      fontWeight: '400',
      width: '88%',
      minHeight: '68px'
    },
    IsResend: {
      display: 'flex',
      width: '100%',
      marginBottom: "40px",
    },
    isResendHeading: {
      width: '100%',
      fontSize: '14px',
      textAlign: 'center',
      fontWeight: 700,
      color: '#3d3d3d'
    },
  };