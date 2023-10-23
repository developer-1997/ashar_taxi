Feature: stripegatewayapifrontend2

    Scenario: User navigates to stripegatewayapifrontend2
        Given I am a User loading stripegatewayapifrontend2
        When I navigate to the stripegatewayapifrontend2
        Then stripegatewayapifrontend2 will load with out errors
        When user click to pay button for booking
        Then handleBooking function will called and loading state will be changed
        When I can call booking API without  errors
        Then paymentStatus and loading state should be update
        When I can call booking API with  errors
        Then paymentStatus and loading state should be update
        When I can call payment session API without errors
