//@ts-nocheck
import React, { lazy, Suspense } from 'react';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import Loader from './Loader.web'
//* Routes List start

const InfoPage = lazy(() => import('../../blocks/info-page/src/InfoPageBlock'));
const AlertBlock = lazy(() => import('../../blocks/alert/src/AlertBlock.web'));
const Customisableuserprofiles2 = lazy(() => import("../../blocks/customisableuserprofiles2/src/Customisableuserprofiles2"));
const Customform3 = lazy(() => import("../../blocks/customform3/src/Customform3"));
const OTPInputAuth = lazy(() => import("../../blocks/otp-input-confirmation/src/OTPInputAuth"));
const Automaticcheckoutcalculation2 = lazy(() => import("../../blocks/automaticcheckoutcalculation2/src/Automaticcheckoutcalculation2"));
const Knowyourcustomerkycverification2 = lazy(() => import("../../blocks/knowyourcustomerkycverification2/src/Knowyourcustomerkycverification2"));
const Adminconsole2 = lazy(() => import("../../blocks/adminconsole2/src/Adminconsole2"));
const Storelocator2 = lazy(() => import("../../blocks/storelocator2/src/Storelocator2"));
const Location = lazy(() => import("../../blocks/location/src/Location"));
const Geofence = lazy(() => import("../../blocks/geofence/src/Geofence"));
const Stripegatewayapifrontend2 = lazy(() => import("../../blocks/stripegatewayapifrontend2/src/Stripegatewayapifrontend2.web"));
const PaymentInfo = lazy(() => import("../../blocks/stripegatewayapifrontend2/src/PaymentInfo.web"));
const CountryCodeSelector = lazy(() => import("../../blocks/country-code-selector/src/CountryCodeSelector"));
const Catalogue = lazy(() => import("../../blocks/catalogue/src/Catalogue"));
const CataloguePage = lazy(() => import("../../blocks/catalogue/src/CatalogueCardContainer.web"));
const Pushnotifications = lazy(() => import("../../blocks/pushnotifications/src/Pushnotifications"));
const Scheduling = lazy(() => import("../../blocks/scheduling/src/Scheduling.web"));
const Settings2 = lazy(() => import("../../blocks/settings2/src/Settings2"));
const Rolesandpermissions = lazy(() => import("../../blocks/rolesandpermissions/src/Rolesandpermissions"));
const SocialMediaAccountLoginScreen = lazy(() => import("../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen"));
const Search = lazy(() => import("../../blocks/search/src/Search"));
const SocialMediaAccountRegistrationScreen = lazy(() => import("../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen"));
const EmailAccountLoginBlock = lazy(() => import("../../blocks/email-account-login/src/EmailAccountLoginBlock"));
const ForgotPassword = lazy(() => import("../../blocks/forgot-password/src/ForgotPassword"));
const ForgotPasswordOTP = lazy(() => import("../../blocks/forgot-password/src/ForgotPasswordOTPconfirmation.web"));
const NewPassword = lazy(() => import("../../blocks/forgot-password/src/CreatedNewPassword.web"));
const StripePayments = lazy(() => import("../../blocks/stripepayments/src/StripePayments"));
const Inventorymanagement2 = lazy(() => import("../../blocks/inventorymanagement2/src/Inventorymanagement2"));
const InvoiceBilling = lazy(() => import("../../blocks/invoicebilling/src/InvoiceBilling"));
const MobileAccountLoginBlock = lazy(() => import("../../blocks/mobile-account-login/src/MobileAccountLoginBlock"));
const Uploadmedia3 = lazy(() => import("../../blocks/uploadmedia3/src/Uploadmedia3"));
const LandingPage = lazy(() => import("../../blocks/landingpage/src/LandingPage.web"));
const EmailAccountRegistration = lazy(() => import("../../blocks/email-account-registration/src/EmailAccountRegistration.web"));
const EmailAccountLoginWithMobileNo = lazy(() => import("../../blocks/email-account-login/src/EmailAccountLoginWithMobileNo.web"));
const EmailAccountLogin = lazy(() => import("../../blocks/email-account-login/src/EmailAccountLogin.web"));
const SignUpOtpConfirmation = lazy(() => import("../../blocks/email-account-registration/src/SignUpOtpConfirmation.web"));
const LoginOtpConfirmation = lazy(() => import("../../blocks/email-account-login/src/LoginOtpConfirmation.web"));
const AccountSuccessfulCreation = lazy(() => import("../../blocks/email-account-registration/src/AccountSuccessfulCreation.web"));
const Maps = lazy(() => import("../../blocks/maps/src/Maps"));
const TermsAndCondition = lazy(() => import("../../blocks/landingpage/src/Terms&Condition.web"));
const PrivacyPolicy = lazy(() => import("../../blocks/landingpage/src/PrivacyPolicy.web"));
const CarDetails = lazy(() => import("../../blocks/catalogue/src/CarDetails.web"));

// /* Routes List End /

// /* Private Routes start /
import LoginProtected from "./LoginProtected.web"

// /* Private Roues End /

function WebRoutes(rootProps: any) {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route
                    path="/Customisableuserprofiles2"
                    exact
                    render={props => <Customisableuserprofiles2 {...props} />}
                />
                <Route
                    path="/Customform3"
                    exact
                    render={props => <Customform3 {...props} />}
                />
                <Route
                    path="/CataloguePage"
                    exact
                    render={props => <CataloguePage {...props} />}
                />
                <Route
                    path="/OTPInputAuth"
                    exact
                    render={props => <OTPInputAuth {...props} />}
                />
                <Route
                    path="/Automaticcheckoutcalculation2"
                    exact
                    render={props => <Automaticcheckoutcalculation2 {...props} />}
                />
                <Route
                    path="/Knowyourcustomerkycverification2"
                    exact
                    render={props => <Knowyourcustomerkycverification2 {...props} />}
                />
                <Route
                    path="/Adminconsole2"
                    exact
                    render={props => <Adminconsole2 {...props} />}
                />
                <Route
                    path="/Storelocator2"
                    exact
                    render={props => <Storelocator2 {...props} />}
                />
                <Route
                    path="/Location"
                    exact
                    render={props => <Location {...props} />}
                />
                <Route
                    path="/LocatiStripePaymentson"
                    exact
                    render={props => <LocatiStripePaymentson {...props} />}
                />
                <Route
                    path="/StripePayments"
                    exact
                    render={props => <StripePayments {...props} />}
                />
                <Route
                    path="/Geofence"
                    exact
                    render={props => <Geofence {...props} />}
                />
                <Route
                    path="/payments"
                    exact
                    render={props => <Stripegatewayapifrontend2 {...props} />}
                />

                <Route
                    path="/payment/success"
                    exact
                    render={props => <PaymentInfo {...props} />}
                />

                <Route
                    path="/payment/failed"
                    exact
                    render={props => <PaymentInfo {...props} />}
                />

                <Route
                    path="/payment/cancel"
                    exact
                    render={props => <PaymentInfo {...props} />}
                />

                <Route
                    path="/CountryCodeSelector"
                    exact
                    render={props => <CountryCodeSelector {...props} />}
                />
                <Route
                    path="/Catalogue"
                    exact
                    render={props => <Catalogue {...props} />}
                />
                <Route
                    path="/Pushnotifications"
                    exact
                    render={props => <Pushnotifications {...props} />}
                />
                <Route
                    path="/Scheduling"
                    exact
                    render={props => <Scheduling {...props} />}
                />
                <Route
                    path="/Settings2"
                    exact
                    render={props => <Settings2 {...props} />}
                />
                <Route
                    path="/Rolesandpermissions"
                    exact
                    render={props => <Rolesandpermissions {...props} />}
                />
                <Route
                    path="/SocialMediaAccountLoginScreen"
                    exact
                    render={props => <SocialMediaAccountLoginScreen {...props} />}
                />
                <Route
                    path="/Search"
                    exact
                    render={props => <Search {...props} />}
                />
                <Route
                    path="/SocialMediaAccountRegistrationScreen"
                    exact
                    render={props => <SocialMediaAccountRegistrationScreen {...props} />}
                />
                <Route
                    path="/EmailAccountLoginBlock"
                    exact
                    render={props => <EmailAccountLoginBlock {...props} />}
                />
                <Route
                    path="/ForgotPassword"
                    exact
                    render={props => <ForgotPassword {...props} />}
                />
                <Route
                    path="/ForgotPasswordOTP"
                    exact
                    render={props => <ForgotPasswordOTP {...props} />}
                />
                <Route
                    path="/NewPassword"
                    exact
                    render={props => <NewPassword {...props} />}
                />
                <Route
                    path="/NewPassword"
                    exact
                    render={props => <NewPassword {...props} />}
                />
                <Route
                    path="/Inventorymanagement2"
                    exact
                    render={props => <Inventorymanagement2 {...props} />}
                />
                <Route
                    path="/InvoiceBilling"
                    exact
                    render={props => <InvoiceBilling {...props} />}
                />
                <Route
                    path="/MobileAccountLoginBlock"
                    exact
                    render={props => <MobileAccountLoginBlock {...props} />}
                />
                <Route
                    path="/Uploadmedia3"
                    exact
                    render={props => <Uploadmedia3 {...props} />}
                />
                <Route
                    path="/LandingPage"
                    exact
                    render={props => <LandingPage {...props} />}
                />
                <LoginProtected
                    path="/EmailAccountRegistration"
                    exact
                    render={props => <EmailAccountRegistration {...props} />}
                />
                <LoginProtected
                    path="/EmailAccountLogin"
                    exact
                    render={props => <EmailAccountLogin {...props} />}
                />
                <LoginProtected
                    path="/EmailAccountLoginWithMobileNo"
                    exact
                    render={props => <EmailAccountLoginWithMobileNo {...props} />}
                />
                <LoginProtected
                    path="/SignUpOtpConfirmation"
                    exact
                    render={props => <SignUpOtpConfirmation {...props} />}
                />
                <LoginProtected
                    path="/LoginOtpConfirmation"
                    exact
                    render={props => <LoginOtpConfirmation {...props} />}
                />
                <Route
                    path="/Maps"
                    exact
                    render={props => <Maps {...props} />}
                />
                <Route
                    path="/"
                    exact
                    render={props => <LandingPage {...props} />}
                />
                <Route
                    path="/TermsAndCondition"
                    exact
                    render={props => <TermsAndCondition {...props} />}
                />
                <Route
                    path="/PrivacyPolicy"
                    exact
                    render={props => <PrivacyPolicy {...props} />}
                />
                <LoginProtected
                    path="/AccountSuccessfulCreation"
                    exact
                    render={props => <AccountSuccessfulCreation {...props} />}
                />

                <Route
                    path="/InfoPage"
                    exact
                    render={props => <InfoPage {...props} />}
                />
                <Route
                    path="/AlertBlock"
                    exact
                    render={props => <AlertBlock {...props} />}
                />
                <Route
                    path="/CataloguePage/:id"
                    exact
                    render={props => <CarDetails {...props} />}
                />
            </Switch>
        </Suspense>
    );
}

//@ts-ignore
export default withRouter(WebRoutes);