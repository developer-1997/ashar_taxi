Feature: forgotPasswordOtpConfirmation

    Scenario: Forgot password Otp
        Given I am a User loading Forgot password otp page
        When I navigate to the Forgot password otp Screen
        And Forgotpasswordotp page create a snapshot
        And I can handle the forgot pasword otp input field
        And I can handle the submit button in forgotpasswordotp
        And I can handle the form resend OTP
        And Check forgotPassword otp api is working
        Then I can leave the screen with out errors
        
        