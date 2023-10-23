Feature: CataloguePage

    Scenario: User navigates to CataloguePage
        Given I am a User loading CataloguePage
        When I navigate to the CataloguePage
        Then I can see CataloguePage render successfully
        