Feature: LandingPage

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then Support api called with out errors
        Then CabList api called with out errors
        When Network response for Cabs is set
        Then Cabs list is populated with certain attributes
        When Network response for Support is set
        Then Support Contact is populated with certain attributes