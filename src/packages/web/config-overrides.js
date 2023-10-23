const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/stripepayments/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/scheduling/src/'),
resolveApp('../blocks/location/src/'),
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/invoicebilling/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/landingpage/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/geofence/src/'),
resolveApp('../blocks/mobile-account-login/src/'),
resolveApp('../blocks/maps/src/'),
resolveApp('../blocks/settings2/src/'),
resolveApp('../blocks/storelocator2/src/'),
resolveApp('../blocks/uploadmedia3/src/'),
resolveApp('../blocks/automaticcheckoutcalculation2/src/'),
resolveApp('../blocks/customisableuserprofiles2/src/'),
resolveApp('../blocks/customform3/src/'),
resolveApp('../blocks/knowyourcustomerkycverification2/src/'),
resolveApp('../blocks/inventorymanagement2/src/'),
resolveApp('../blocks/adminconsole2/src/'),
resolveApp('../blocks/rolesandpermissions/src/'),
resolveApp('../blocks/stripegatewayapifrontend2/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/radar_sdk_js'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../../node_modules/react-native-password-strength-meter'),
  resolveApp('../../node_modules/react-navigation-deprecated-tab-navigator'),
  resolveApp('../../node_modules/react-navigation-drawer'),
  resolveApp('../../node_modules/react-navigation-tabs'),
  resolveApp('../../node_modules/react-native-screens'),
  resolveApp('../../node_modules/react-navigation'),
  resolveApp('../../node_modules/react-native-fs'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    //gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    //brotli plugin
    new BrotliPlugin({ 
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}