Feature: Navbar

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then I can see Navbar render successfully
        And I can press the LogInButton with with out errors
        And I can press the IconButton with with out errors
        And I can press the MenuItem with with out errors
        When User clicks on logout button
        Then token is cleared