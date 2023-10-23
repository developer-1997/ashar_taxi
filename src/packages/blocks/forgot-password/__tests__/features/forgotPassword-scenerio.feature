Feature: forgotpassword

    Scenario: Forgot password
        Given I am a User loading Forgot password page
        When I navigate to the Forgot password Screen
        Then Forgotpassword page will load with out errors
        And I can handle the form validation in the forgotpassword
        And I can handle the inputs in forgotpassword
        And I can handle the submit button in forgotpassword
        And Check forgotPassword api is working
        And I can handle function for api call
        And I can leave the screen with out errors