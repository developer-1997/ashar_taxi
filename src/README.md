# **React Native** | _**AsherTaxiservices**_ | _**298406**_ | _**studio_pro**_

## **Catalog ProjectId: 155097** | **Catalog BuildId: 23044**

## NOTE FOR DEVELOPERS:
Clone the code-engine branch into your working branch. The contents of the branch may get overwritten.
## Author:
Code-Engine
## Keywords:
 - ashertaxiservices
 - web
## Assembled Features To Block Status

| **Feature-Name**        | **Block-Name**        | **Path**  | **Status**  |
|:-------------|:-------------|:-------------|:-------------|
| payments2      | stripepayments<br>core<br>utilities<br>      | {+packages/blocks/stripepayments+}<br>{+packages/blocks/core+}<br>{+packages/blocks/utilities+}<br> | {+Non-Empty+} |
| scheduling2      | scheduling<br>      | {+packages/blocks/scheduling+}<br> | {+Non-Empty+} |
| location2      | location<br>      | {+packages/blocks/location+}<br> | {+Non-Empty+} |
| search3      | search<br>      | {+packages/blocks/search+}<br> | {+Non-Empty+} |
| invoicebilling3      | invoicebilling<br>      | {+packages/blocks/invoicebilling+}<br> | {+Non-Empty+} |
| catalogue2      | catalogue<br>      | {+packages/blocks/catalogue+}<br> | {+Non-Empty+} |
| landingpage2      | landingpage<br>      | {+packages/blocks/landingpage+}<br> | {+Non-Empty+} |
| signuplogin      | social-media-account-registration<br>social-media-account<br>email-account-login<br>email-account-registration<br>country-code-selector<br>forgot-password<br>otp-input-confirmation<br>social-media-account-login<br>      | {+packages/blocks/social-media-account-registration+}<br>{+packages/blocks/social-media-account+}<br>{+packages/blocks/email-account-login+}<br>{+packages/blocks/email-account-registration+}<br>{+packages/blocks/country-code-selector+}<br>{+packages/blocks/forgot-password+}<br>{+packages/blocks/otp-input-confirmation+}<br>{+packages/blocks/social-media-account-login+}<br> | {+Non-Empty+} |
| pushnotifications2      | pushnotifications<br>      | {+packages/blocks/pushnotifications+}<br> | {+Non-Empty+} |
| geofence4      | geofence<br>      | {+packages/blocks/geofence+}<br> | {+Non-Empty+} |
| twiliointegration2      | mobile-account-login<br>      | {+packages/blocks/mobile-account-login+}<br> | {+Non-Empty+} |
| maps3      | maps<br>      | {+packages/blocks/maps+}<br> | {+Non-Empty+} |
| settings2      | settings2      | {-packages/blocks/settings2-} | {-Empty-} |
| storelocator2      | storelocator2      | {-packages/blocks/storelocator2-} | {-Empty-} |
| uploadmedia3      | uploadmedia3      | {-packages/blocks/uploadmedia3-} | {-Empty-} |
| automaticcheckoutcalculation2      | automaticcheckoutcalculation2      | {-packages/blocks/automaticcheckoutcalculation2-} | {-Empty-} |
| customisableuserprofiles2      | customisableuserprofiles2      | {-packages/blocks/customisableuserprofiles2-} | {-Empty-} |
| customform3      | customform3      | {-packages/blocks/customform3-} | {-Empty-} |
| knowyourcustomerkycverification2      | knowyourcustomerkycverification2      | {-packages/blocks/knowyourcustomerkycverification2-} | {-Empty-} |
| inventorymanagement2      | inventorymanagement2      | {-packages/blocks/inventorymanagement2-} | {-Empty-} |
| adminconsole2      | adminconsole2      | {-packages/blocks/adminconsole2-} | {-Empty-} |
| rolesandpermissions      | rolesandpermissions      | {-packages/blocks/rolesandpermissions-} | {-Empty-} |
| stripegatewayapifrontend2      | stripegatewayapifrontend2      | {-packages/blocks/stripegatewayapifrontend2-} | {-Empty-} |

## AWS BACKEND DEPLOYMENT URL
 - BaseURL exported as: "https://ashertaxiservices-298406-ruby.b298406.prd.eastus.az.svc.builder.ai"
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

See docs folder for additional information.

### Prerequisites

What things you need to install the software and how to install them

* React Native (last tested on react-native0.61.3)
  - https://facebook.github.io/react-native/docs/getting-started

* IFF brew is installed and user doesn't have permisions.
```
  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* XCode 11 or greater

* XCode Command Line Tools
```
  $ xcode-select --install
```

* Android SDK
```
  $ brew cask install android-sdk
```

* JDK 11
```
  $ brew tap homebrew/cask-versions
  $ brew cask install java
  $ brew cask install java11
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn
```
  $ brew install yarn
```

Install node

```
  $ brew install node
```

Web
```
  $ yarn
  $ yarn workspace web start 
  (Note: After udpating depencies run again if no cocde erros. )
```

iOS
```
  $ yarn
  $ cd packages/mobile/ios && pod install && cd ../../../ && cp node-runners/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios
```

Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/
```
  $ yarn
  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android
```

## Running the tests

```
  $ yarn test
```


## CI/CD Details

We use GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).



