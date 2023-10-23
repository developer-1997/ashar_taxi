
import React from "react";
import {
    Box,
    Button,
    Input,
    Typography,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
  } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import {cloudUpload} from "../../blocks/email-account-registration/src/assets"

export const HandlePassword = ({handleClickShowPassword  , enablePasswordField}:any) => {
  return <InputAdornment position="end">
            <IconButton
              data-test-id="iconButton"
              aria-label="toggle password visibility"
              onClick={() => handleClickShowPassword()}
              edge="end"
            >
              {enablePasswordField ? (<VisibilityOff />) : (<Visibility />)}
            </IconButton>
          </InputAdornment>
}

export const HandleClickShowPasswordRetype = ({handleClickShowPasswordRetype  , enableReTypePasswordField}:any) => {
  return <InputAdornment position="end">
            <IconButton
              data-test-id="iconButton"
              aria-label="toggle password visibility"
              onClick={handleClickShowPasswordRetype}
              edge="end"
            >
              {enableReTypePasswordField ? (<VisibilityOff />) : (<Visibility />)}
            </IconButton>
          </InputAdornment>
}

export const RegistrationForm = ({
    values,
    handleChange,
    handleFromValidation,
    errors,
    touched,
    state,
    handleClickShowPassword,
    handleClickShowPasswordRetype,
    setFieldValue,
    handleSubmit,
    setReuploadedState,
  }: any) => {
    return (
      <Grid container spacing={3} data-test-id="GridWrapperId" style={{margin:"0", marginTop: "30px"}}>
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            First Name
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtFirstName"
              type="text"
              name="first_name"
              placeholder={"Enter first name"}
              fullWidth={true}
              value={values.first_name}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => handleChange(e)}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.first_name, touched?.first_name)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Last Name
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="lastName"
              type="text"
              name="last_name"
              placeholder={"Enter last name"}
              fullWidth={true}
              value={values.last_name}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => handleChange(e)}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.last_name, touched?.last_name)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Phone Number
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputPhone"
              type="text"
              name="full_phone_number"
              placeholder={"Enter phone number"}
              fullWidth={true}
              value={values.full_phone_number}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.full_phone_number, touched?.full_phone_number)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Email
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputEmail"
              type="text"
              name="email"
              placeholder={"Enter email"}
              fullWidth={true}
              value={values.email}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.email, touched?.email)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Password
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputPassword"
              type={state.enablePasswordField ? "password" : "text"}
              placeholder={"Enter password"}
              name="password"
              fullWidth={true}
              style={email_registration_styles.formInputOutline}
              value={values.password}
              onChange={(e) => handleChange(e)}
              endAdornment={<HandlePassword handleClickShowPassword={handleClickShowPassword} enablePasswordField={state.enablePasswordField}/>}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.password, touched?.password)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Confirm Password
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputPasswordConfirm"
              type={state.enableReTypePasswordField ? "password" : "text"}
              placeholder={"Enter confirm password"}
              fullWidth={true}
              name="password_confirmation"
              style={email_registration_styles.formInputOutline}
              value={values.password_confirmation}
              onChange={(e) => handleChange(e)}
              endAdornment={<HandleClickShowPasswordRetype handleClickShowPasswordRetype={handleClickShowPasswordRetype}   enableReTypePasswordField={state.enableReTypePasswordField}/>
              } />
          </FormInputContainer>
          {handleFromValidation(errors?.password_confirmation, touched?.password_confirmation)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Driving License Number
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputLicense"
              type="text"
              name="license_number"
              placeholder={"Enter driving license number"}
              fullWidth={true}
              value={values.license_number}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => handleChange(e)}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.license_number, touched?.license_number)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Driving License Expiry Date
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputDate"
              type="date"
              name="license_exp_date"
              fullWidth={true}
              value={values.license_exp_date}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => handleChange(e)}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.license_exp_date, touched?.license_exp_date)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <FormControl style={email_registration_styles.formControl}>
            <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
              Badge Color
            </InputLabel>
            <FormInputContainer>
              <Select
                displayEmpty
                style={email_registration_styles.formInputOutline}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={(e) => handleChange(e)}
                name="badge"
                value={values.badge}
                data-test-id="badgeColor"
              >
                <MenuItem value="">
                  <em>Select Color</em>
                </MenuItem>
                {
                  ["Yellow", "Green"].map((key: any, index: any) => {
                    return (
                      <MenuItem value={key} key={index}>{key}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormInputContainer>
            {handleFromValidation(errors?.badge, touched?.badge)}
          </FormControl>
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Badge Number/Bill
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputBadge"
              type="text"
              name="badge_number"
              placeholder={"Enter badge number/bill"}
              fullWidth={true}
              value={values.badge_number}
              style={email_registration_styles.formInputOutline}
              onChange={(e) => handleChange(e)}
            />
          </FormInputContainer>
          {handleFromValidation(errors?.badge_number, touched?.badge_number)}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl style={email_registration_styles.formControl}>
            <InputLabel style={email_registration_styles.formInputLabel} shrink htmlFor="bootstrap-input" className="fontWeightMedium">
              Sector
            </InputLabel>
            <FormInputContainer>
              <Select
                displayEmpty
                style={email_registration_styles.formInputOutline}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={(e) => handleChange(e)}
                name="sector"
                value={values.sector}
                data-test-id="sectorData"
              >
                <MenuItem value="">
                  <em>Select Sector</em>
                </MenuItem>
                {
                  Array(9).fill('Sector').map((key: any, index: any) => {
                    return (
                      <MenuItem value={`${key} ${index + 1}`}>{key} {index + 1}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormInputContainer>
            {handleFromValidation(errors?.sector, touched?.sector)}
          </FormControl>
        </Grid>
  
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 'bold', marginBottom: '10',color:"#242424" }} className="loginHeader">
            Upload your driving license
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel
            style={email_registration_styles.formInputLabel}
            shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Front Side
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputLicenseFront_Side"
              type="file"
              name="license_front"
              placeholder={"license_front"}
              fullWidth={true}
              inputProps={{
                accept: "image/jpeg"
              }}
              style={email_registration_styles.formInputOutlineClick}
              onChange={(event: any) => {
                setFieldValue("license_front", event?.currentTarget?.files[0])
              }}
            />
            <Button variant="outlined"
              style={email_registration_styles.formInputUpload} className="fileUploadButton"
            >
              <img src={cloudUpload} alt="..." style={email_registration_styles.uploadCloud} />
              {!values?.license_front && "Click to upload"}
            </Button>
            {state?.licenseFrontReuploadCheck && !values?.license_front &&
              <Box style={email_registration_styles.license_styles}>
                <Typography
                  style={email_registration_styles.licenseReloadeBtn} className="fontWeightMedium">
                  ReUpload
                </Typography>
              </Box>}
            <Box style={email_registration_styles.license_styles}>
              {values?.license_front ?
                <>
                  <img src={URL.createObjectURL(values?.license_front)} alt="license" style={email_registration_styles.licenseImg} />
                  <Button
                    data-test-id="deleteFront"
                    onClick={(e) => {
                      e?.preventDefault();
                      setFieldValue('license_front', "")
                      setReuploadedState("licenseFront")
                    }} style={email_registration_styles.licenseDeleteBtn}
                    className="fontWeightMedium"
                  >
                    Delete
                  </Button>
                </>
                :
                ""
              }
            </Box>
          </FormInputContainer>
          {handleFromValidation(errors?.license_front, touched?.license_front)}
        </Grid>
  
        <Grid item xs={12} md={6}>
          <InputLabel
            style={email_registration_styles.formInputLabel}
            shrink htmlFor="bootstrap-input" className="fontWeightMedium">
            Back Side
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputLicenseBack_Side"
              type="file"
              name="license_back"
              inputProps={{
                accept: "image/jpeg"
              }}
              placeholder={"license_back"}
              fullWidth={true}
              style={email_registration_styles.formInputOutlineClick}
              onChange={(event: any) => {
                setFieldValue("license_back", event?.currentTarget?.files[0])
              }}
            />
            <Button variant="outlined"
              style={email_registration_styles.formInputUpload} className="fileUploadButton"
            >
              <img src={cloudUpload} alt="..." style={email_registration_styles.uploadCloud} />
              {!values?.license_back && "Click to upload"}
            </Button>
            {state?.licenseBackReuploadCheck && !values?.license_back &&
              <Box style={email_registration_styles.license_styles}>
                <Typography
                  style={email_registration_styles.licenseReloadeBtn} className="fontWeightMedium">
                  ReUpload
                </Typography>
              </Box>}
            <Box style={email_registration_styles.license_styles}>
              {values?.license_back ? <><img src={URL.createObjectURL(values?.license_back)} alt="license" style={email_registration_styles.licenseImg} />
                <Button
                  data-test-id="deleteBack"
                  onClick={(e) => {
                    e?.preventDefault();
                    setFieldValue('license_back', "")
                    setReuploadedState("licenseBack")
                  }} style={email_registration_styles.licenseDeleteBtn} className="fontWeightMedium">
                  Delete
                </Button> </> : ""}
            </Box>
          </FormInputContainer>
          {handleFromValidation(errors?.license_back, touched?.license_back)}
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel
            style={email_registration_styles.formInputLabel}
            shrink htmlFor="bootstrap-input">
            Bill Document
          </InputLabel>
          <FormInputContainer>
            <Input
              data-test-id="txtInputBillDocument"
              type="file"
              name="bill_document"
              inputProps={{
                accept: "image/jpeg"
              }}
              placeholder={"bill_document"}
              fullWidth={true}
              style={email_registration_styles.formInputOutlineClick}
              onChange={(event: any) => {
                setFieldValue("bill_document", event?.currentTarget?.files[0])
              }}
            />
            <Button variant="outlined"
              style={email_registration_styles.formInputUpload} className="fileUploadButton"
            >
              <img src={cloudUpload} alt="..." style={email_registration_styles.uploadCloud} />
              {!values?.bill_document && "Click to upload"}
            </Button>
            {state?.billDocumentReuploadCheck && !values?.bill_document &&
              <Box style={email_registration_styles.license_styles}>
                <Typography
                  style={email_registration_styles.licenseReloadeBtn}>
                  ReUpload
                </Typography>
              </Box>}
            <Box style={email_registration_styles.license_styles}>
              {values?.bill_document ? <><img src={URL.createObjectURL(values?.bill_document)} alt="license" style={email_registration_styles.licenseImg} />
                <Button
                  data-test-id="deleteBill"
                  onClick={(e) => {
                    e?.preventDefault();
                    setFieldValue('bill_document', "")
                    setReuploadedState("billDocument")
                  }} style={email_registration_styles.licenseDeleteBtn}>
                  Delete
                </Button> </> : ""}
            </Box>
          </FormInputContainer>
          {handleFromValidation(errors?.bill_document, touched?.bill_document)}
        </Grid>
  
        <Grid item xs={12}>
          <Button
            data-test-id={"btnEmailVerify"}
            variant="contained"
            color="primary"
            fullWidth
            className="normalText loginHeader"
            style={email_registration_styles.verifyBtn}
            onClick={(values) => handleSubmit(values)}
          >
            Sign Up{/*UI Engine::From Sketch*/}
          </Button>
        </Grid>
      </Grid>
    )
  }

  const FormInputContainer: any = styled('div')({
    position: 'relative',
    ' & ::before': {
      display: 'none',
    },
    ' & ::after': {
      display: 'none',
    },
    '& em': {
      color: 'rgb(144, 143, 157)',
      fontStyle: 'normal',
    },
    '& ::placeholder': {
      color: 'rgb(144, 143, 157)',
    }
  });

  const email_registration_styles: any = {
    // Customizable Area Start
    container: {
      flex: 1,
      padding: 16,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 650,
      backgroundColor: "#fff"
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
    formControl: {
      width: "100%"
    },
    verifyBtn: {
      backgroundColor: '#090069',
      padding: '10px',
      borderRadius: '10px',
      fontSize: '20px',
      fontWeight:"bold",
    },
    formInputLabel: {
      color: '#242424',
      fontWeight: 'bold',
      marginTop: '-15px',
      fontSize: '18px',
    },
    formInputOutline: {
      border: '1px solid #c5c5c5',
      padding: '5px 15px',
      borderRadius: '5px',
      margin: '5px 0',
      fontWeight: '700',
      fontSize: '15px',
      width: '100%'
    },
    formInputOutlineClick: {
      border: '1px solid #c5c5c5',
      borderRadius: '5px',
      margin: '5px 0',
      fontWeight: '700',
      fontSize: '15px',
      width: '100%',
      position: 'absolute',
      opacity: 0,
      minHeight: '50px'
    },
    formInputUpload: {
      border: '1px solid #c5c5c5',
      padding: '10px 15px 15px',
      borderRadius: '5px',
      margin: '5px 0',
      fontWeight: '500',
      fontSize: '15px',
      textDecoration: 'underline',
      justifyContent: 'flex-start',
      width: '100%',
      zIndex: '-1',
      height: '90px',
      display: 'flex',
      alignItems: 'center',
      color: "90859d",
      img: {
        marginRight: '10px'
      }
    },
    isHeadValueBox: {
      width: '50%',
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: 'bold',
      borderRight: '1px solid #c5c5c5'
    },
    isHeadValueBoxRht: {
      width: '50%',
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: 'bold',
    },
    isHeadValue: {
      color: '#908f9d',
      textDecoration: 'none',
      position: 'relative',
      paddingBottom: '15px',
      cursor:"pointer",
      fontSize: "26px",
      top:"2px",
    },
    isHeadValueActive: {
      color: '#090069',
      textDecoration: 'none',
      position: 'relative',
      paddingBottom: '15px',
      margin: 0,
      cursor:"pointer",
      fontSize:"26px",
    },
    inHeading: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginBottom: "40px",
      marginTop: "20px"
    },
    rhtBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: '40px 60px 100px',
      width: '100%',
      margin: '0px auto',
      maxHeight: '100%',
      overflow: 'hidden auto',
      boxSizing: 'border-box',
    },
    license_styles: {
      position: 'absolute',
      left: '0%',
      top: '50%',
      transform: 'translate(-0%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
    },
    licenseImg: {
      height: '73px',
    },
    licenseDeleteBtn: {
      position: 'absolute',
      right: 12,
      top: 12,
      color: 'red',
      border: '0',
      fontWeight: '700',
      height: '10px'
    },
    licenseReloadeBtn: {
      color: '#32a852',
      border: '0',
      fontWeight: '700',
      height: '10px',
      position: 'absolute',
      right: 12,
      top: -33,
    },
    uploadCloud: {
      width: '20px',
      marginRight: '10px'
    }
    // Customizable Area End
  };