Feature: newPassword

    Scenario: New password
        Given I am a User loading New password page
        When I navigate to the New password Screen
        Then NewPassword page will load with out errors
        Then I can handle the inputs in newPassword
        Then I can handle the submit button in newPassword
        Then Check new password api is working
        Then I can leave the screen with out errors