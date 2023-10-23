Feature: paymentinfo

    Scenario: User navigates to paymentinfo
        Given I am a User loading paymentinfo
        When I navigate to the paymentinfo
        Then paymentinfo will load with out errors
        When I can call confirmPaymentApiCallId API with out errors
        Then paymentStatus state should be update
        When I can call confirmPaymentApiCallId API with errors
        Then paymentStatus and loading state should be update
        When user click to cancel button for booking
        Then handleCancel function will called and loading state will be changed
        When I can call cancelBookingApiCallId API with errors
        Then loading state should be update


