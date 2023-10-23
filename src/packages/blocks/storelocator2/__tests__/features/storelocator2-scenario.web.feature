Feature: storelocator2

    Scenario: User navigates to storelocator2
        Given I am a User loading storelocator2
        When I navigate to the storelocator2
        Then storelocator2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors