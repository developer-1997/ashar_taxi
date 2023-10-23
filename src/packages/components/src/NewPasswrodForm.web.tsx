
import React,{useState} from "react";
import {
  Button,
  Input,
  InputLabel,
  Grid,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { lock } from "../../blocks/email-account-login/src/assets";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

export const NewPasswordForm = ({
  values,
  handleChange,
  handleFromValidation,
  errors,
  touched,
  handleSubmit,
}: any) => {
    const [enablePasswordField, setenablePasswordField] = useState<boolean>(true)
    const [enablePasswordFieldTwo, setenablePasswordFieldTwo] = useState<boolean>(true)
    const handleClickShowPassword =() => {
        setenablePasswordField(prev => !prev)
    }
    const handleClickShowPasswordTwo =() => {
        setenablePasswordFieldTwo(prev => !prev)
    }
    
  return (
    <Grid container spacing={3} data-test-id="GridWrapperId" style={{ margin: "0", marginTop: "30px" }}>
      <Grid item xs={12}>
        <InputLabel style={forgot_pass.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
          New Password
        </InputLabel>
        <FormInputContainer style={forgot_pass.formContainerStyle}>
            <img style={forgot_pass.arrowImageStyle} src={lock} alt="" />
            <Input
              data-test-id="newFormPassword"
              type={enablePasswordField ? "password" : "text"}
              name="password"
              placeholder={"Enter password"}
              fullWidth={true}
              style={forgot_pass.formInputOutline}
              value={values.password}
              onChange={(e) => {
                handleChange(e)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {enablePasswordField ? (<VisibilityOff />) : (<Visibility />)}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormInputContainer>
        {handleFromValidation(errors?.password, touched?.password)}
      </Grid>
      <Grid item xs={12} className={`${errors?.confirmpassword && touched?.confirmpassword ? "errorConfirmPass":""}`}>
        <InputLabel style={forgot_pass.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
          Confirm Password
        </InputLabel>
        <FormInputContainer style={forgot_pass.formContainerStyle} >
            <img style={forgot_pass.arrowImageStyle} src={lock} alt="" />
            <Input
              data-test-id="newFormRetypePassword"
              type={enablePasswordFieldTwo ? "password" : "text"}
              name="confirmpassword"
              placeholder={"Enter password"}
              fullWidth={true}
              style={forgot_pass.formInputOutline}
              value={values.confirmpassword}
              onChange={(e) => {
                handleChange(e)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordTwo}
                    edge="end"
                  >
                    {enablePasswordFieldTwo ? (<VisibilityOff />) : (<Visibility />)}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormInputContainer>
        {handleFromValidation(errors?.confirmpassword, touched?.confirmpassword)}
      </Grid>
      <Grid item xs={12}>
        <Button
          data-test-id= "newPassSubmitButton"
          variant="contained"
          color="primary"
          fullWidth
          className="normalText loginHeader"
          style={forgot_pass.verifyBtn}
          onClick={() => handleSubmit()}
        >
          Continue {/*UI Engine::From Sketch*/}
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

const forgot_pass: any = {
  // Customizable Area Start
  formContainerStyle: {
    position: 'relative'
  },
  arrowImageStyle: {
    width: '25px', position: 'absolute', left: '18px', top: '22px'
  },
  verifyBtn: {
    backgroundColor: '#090069',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: "bold",
  },
  formInputLabel: {
    color: '#242424',
    fontWeight: 'bold',
    marginTop: '-15px',
    fontSize: '18px',
  },
  formInputOutline: {
    border: '1px solid #c5c5c5',
    padding: '5px 15px 5px 60px',
    borderRadius: '10px',
    margin: '5px 0',
    fontWeight: '700',
    fontSize: '15px',
    width: '100%',
    height: "60px"
  }
  // Customizable Area End
};