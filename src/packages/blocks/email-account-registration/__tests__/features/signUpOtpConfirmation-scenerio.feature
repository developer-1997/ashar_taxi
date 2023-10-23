Feature: SignUpOtpConfirmation

    Scenario:SignUp With Otp Confirmation
        Given User loading signUpOtpConfirmation page
        When User navigate to the signUpOtpConfirmation Screen
        Then SignUpOtpConfirmation page will load with out errors
        When User can handle the otp input field
        Then User can click the otp verify Button
        When User can handle the otp verify by submit
        Then handleOtpFormSubmit should be called
        When User can resend otp again by click
        Then error state should should set
        When OtpVerificationApiCallIdForWeb api will return success
        Then location push should be called with AccountSuccessfulCreation
        When OtpVerificationApiCallIdForWeb api will return errors
        Then error state should should set
        When createAccountApiCallIdForWeb api will return error
        Then error state should should set
        When createAccountApiCallIdForWeb api will return success
        Then token should have valid value