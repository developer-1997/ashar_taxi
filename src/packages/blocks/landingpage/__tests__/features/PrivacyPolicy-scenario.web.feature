Feature: Footer

    Scenario: User navigates to Privacy Policy Page
        Given I am a User loading Privacy Policy Page
        When I navigate to the Privacy Policy Page
        Then I can see Privacy Policy Page render successfully
        