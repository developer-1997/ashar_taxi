
import React from "react";
import {
  Button,
  Input,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { downArrow } from '../../blocks/email-account-login/src/assets'

export const ForgotPassForm = ({
  values,
  handleChange,
  handleFromValidation,
  errors,
  touched,
  handleSubmit,
  disableBtn
}: any) => {
  return (
    <Grid container spacing={3} data-test-id="GridWrapperId" style={{ margin: "0", marginTop: "30px" }}>
      <Grid item xs={12}>
        <InputLabel style={forgot_pass.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
          Email
        </InputLabel>
        <FormInputContainer style={forgot_pass.formContainerStyle}>
          <img style={forgot_pass.arrowImageStyle} src={downArrow} alt="" />
          <Input
            data-test-id="forgotPassEmail"
            type="text"
            name="email"
            placeholder={"Enter email"}
            fullWidth={true}
            value={values.email}
            style={forgot_pass.formInputOutline}
            onChange={(e) => handleChange(e)}
          />
        </FormInputContainer>
        {handleFromValidation(errors?.email, touched?.email)}
      </Grid>
      <Grid item xs={12}>
        <Button
          data-test-id={"forgotPassSubmitButton"}
          variant="contained"
          color="primary"
          fullWidth
          className={`normalText loginHeader ${disableBtn ? "disableBtn" : ""}`}
          style={forgot_pass.verifyBtn}
          onClick={() => handleSubmit()}
        >
          Send {/*UI Engine::From Sketch*/}
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