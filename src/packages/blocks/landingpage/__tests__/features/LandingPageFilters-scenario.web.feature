Feature: LandingPageFilters

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then I can see LandingPageFilters render successfully
        When User click on confirm
        Then Dropdown is closed
        When User click on shift selection
        Then Shift is selected
        When User click on confirm type
        Then Dropdown is closed for depot
        When User click on Rental Depot Selection
        Then Value is selected on depot field