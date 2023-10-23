Feature: SignInSignUpHeader

    Scenario:Sign In Sign Up Header
        Given I am a User loading signInSignUpHeader page
        When I navigate to the signInSignUpHeader page
        Then SignInSignUpHeader page page will load with out error
        And I can handle the sign-in route in header
        And I can handle the sign-up route in header
        And I can leave the screen with out errors