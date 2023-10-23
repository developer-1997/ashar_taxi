Feature: emailAccountRegistration

    Scenario: Register Email Account
        Given I am a User loading Registration page
        When I navigate to the Registration Screen
        Then Registration page will load with out errors
        When click on sign up tab
        Then should open sign up form and sign up button should be there with content Sign Up
        When when i input in first name
        Then I can handle the firstname in account registration
        When I click re-type password in registration
        Then enableReTypePasswordField should be update and it will be false
        When I can handle the deleteFront button in registration
        Then state value of licenseFrontReuploadCheck should be true
        When I can handle the deleteBack button in registration
        Then state value of licenseBackReuploadCheck should be true
        When I can handle the deleteBill button in registration
        Then state value of billDocumentReuploadCheck should be true
        And I can handle the verify button in registration
        When I can handle the show/hide password
        Then enablePasswordField state value will change
        When registration form submit with already register phone and email
        Then toastr error should be appear