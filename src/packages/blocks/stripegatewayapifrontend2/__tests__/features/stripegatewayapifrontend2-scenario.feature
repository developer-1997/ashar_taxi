Feature: stripegatewayapifrontend2

    Scenario: User navigates to stripegatewayapifrontend2
        Given I am a User loading stripegatewayapifrontend2
        When I navigate to the stripegatewayapifrontend2
        Then stripegatewayapifrontend2 will load with out errors
        When I can enter text with out errors
        Then state txtSavedValue value should be change
        When I can select the button with with out errors
        Then state txtSavedValue value should be change
        When I can press btnShowHide the button with out errors
        Then state enableField value should be change
