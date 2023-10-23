Feature: CardBox

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then I can see CardBox render successfully

        