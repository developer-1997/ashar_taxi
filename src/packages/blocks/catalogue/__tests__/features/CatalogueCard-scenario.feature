Feature: CatalogueCard

    Scenario: User navigates to catalogue Page
        Given I am a User loading catalogue Page
        When I navigate to the catalogue
        Then catalogue card list will load with out errors