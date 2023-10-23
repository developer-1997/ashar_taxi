Feature: CarDetails

    Scenario: User navigates to CarDetails page
        Given I am a User loading CarDetails page

        When I navigate to the CarDetails page
        Then CarDetails page will load with out errors
        And CarDetails api called with out errors
        And RentalPrice api called with out errors

        When Network response for CarDetails is set
        Then Title of car show

        When Network response for RentalPrice is set
        Then RentalPrice of car show
        
    Scenario: Selecting rental period
        When I select a rental period
        Then the selected rental period should be highlighted

    Scenario: Booking a car without error
        When I click on the "Book" button
        Then it should trigger the booking process

        When I again click on the "Book" button
        Then Check Booking is done

    Scenario: Booking a car with error
        When I click on the "Book" button
        Then it should trigger the booking process
        When I again click on the "Book" button
        Then Check Error popup