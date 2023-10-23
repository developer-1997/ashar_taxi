Feature: LoginWithOtpConfirmation

    Scenario:Login With Otp Confirmation Page
        Given User loading Login With Otp Confirmation page
        When User navigate to the Login With Otp Confirmation Screen
        Then User can handle the otp input field
        When User can click the otp verify Button
        Then User can handle the otp verify by submit
        When User can click the resend otp link
        Then User can resend otp again by click
        Then LoginOtpVerificationApiCallIdForWeb api will return success


    
    
