Feature: CatalogueCardContainer

    Scenario: User navigates to catalogue
        Given I am a User loading catalogue Page
        When I navigate to the Catalogue page
        Then Catalogue page will load with out errors
        And CabList api called with out errors
        And RentalPrice api called with out errors
        And Shift Timing api called with out errors
        When Network response for Cabs is set
        Then Cabs list is populated with certain attributes
        When Network response for filtered Cabs is set
        Then Filtered Cabs list is populated with certain attributes
        When Network response for filtered Cabs gives no result
        Then Filtered Cabs list is not populated
        When Network response for user location is set
        Then Filtered location list is populated on search field
        When Network response for user location throws error
        Then Filtered location list is populated by default
        When user selects a particular rental period
        Then particular shift is selected for the rental period
        When user get empty data for cabs
        Then no data will be rendered on screen
        When user get the data for cabs on rental prices
        Then data will be rendered on left panel
        When Network response for rental prices throws error
        Then rental prices wont be shown
        When user get the data for cabs on rental periods
        Then data will be saved for rental periods
        When Network response for rental periods throws error
        Then shift timing wont be added
        When user does not get the data for cabs
        Then No data will be displayed on screen
        When user selects rental location
        Then user can close the modal
        Then user can search in rental period
        Then user selects nearest location
        Then user selects monthly shift
        Then call handleConfirm in rental period
        When User lands on page with landing page query
        Then Page is loaded without errors
        When User lands on page with landing page query with only shift
        Then Page is loaded without errors for shift data
        When User lands on page with landing page query with only depot
        Then Page is loaded without errors for depot data