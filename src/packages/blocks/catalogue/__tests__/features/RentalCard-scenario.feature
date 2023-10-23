Feature: RentalCard

    Scenario: User navigates to catalogue Page with Rental Card
        Given I am a User loading catalogue Page with Rental Card
        When I navigate to the catalogue with Rental Card
        Then Rental Search list will load without errors
        Then Rental Search list should render the shift checkbox
        When user selects a particular rental period
        Then particular shift is selected for the rental period