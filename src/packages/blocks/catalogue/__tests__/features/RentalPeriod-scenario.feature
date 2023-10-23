Feature: RentalPeriod

    Scenario: User navigates to catalogue Page with RentalPeriod
        Given I am a User loading catalogue Page with RentalPeriod
        When I navigate to the catalogue with RentalPeriod
        Then Rental Period Search list will load with out errors