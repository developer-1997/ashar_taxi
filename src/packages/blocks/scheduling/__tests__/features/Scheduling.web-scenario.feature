Feature: Scheduling

    Scenario: User navigates to Scheduling page
        Given I am a User loading Scheduling page

        When I navigate to the Scheduling page
        Then Scheduling page will load with out errors

        When Network response for Scheduling with data is set
        Then Upcoming Booking data show

        When Network response for Scheduling without data is set
        Then No Booking Error show
    
    Scenario: User click to cancel button
        Given Upcoming Booking data show

        When I click to cancel button
        Then Cancel model appear

        When I click to yes button
        Then Cancel model disappear
    
    Scenario: User click to Extend button
        Given Rental Period Api called

        When I click to Extend button
        Then Extend model appear

        When I select a rental period
        Then the selected rental period should be highlighted

        When I click to Continue button api give error
        Then error message appear

        When I click to Continue button api without Error
        Then Extend model disappear

    Scenario: User click to Past Tab

        When I click to Past Tab
        Then Active past tab

        When Network response for booking history with data is set
        Then booking history data show

        When Network response for booking history without data is set
        Then No Booking Error show
    
        