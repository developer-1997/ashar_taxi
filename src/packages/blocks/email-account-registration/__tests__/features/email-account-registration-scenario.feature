Feature: Email Account Registration
    Scenario: Register Email Account
        Given I am a User attempting to Register after confirming OTP
        When I can toggle the Password Show/Hide with out errors
        Then enablePasswordField should be false
        When I can toggle the Confimation Password Show/Hide with out errors
        Then enableReTypePasswordField should be false
        When I can select the Submit button with out errors
        Then token value should be update

        

    Scenario: Empty First Name
        Given I am a User attempting to Register with a Email
        When I Register with an empty First Name
        Then Registration Should Fail
     

    Scenario: Invalid Email
        Given I am a User attempting to Register with a Email
        When I Register with an Invalid Email
        Then arrayholder should have value
        When wrong email format input
        Then Registration Should Fail
       


    Scenario: Password and RePassword do not match
        Given I am a User attempting to Register with a Email
        When I Register with Password and RePassword that do not match
        Then Registration Should Fail
        When RestAPI will return an error
        Then error state should be set

    Scenario: Valid Registration
        Given I am a User attempting to Register with a Email
        When I Register with all valid data
        Then Registration Should Succeed
        When RestAPI will return token
        Then token value should be update