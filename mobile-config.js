// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.comp231.messengerapp',
  name: 'MessengerApp',
  description: 'Messenger Application',
  author: 'Team Pulivarthi',
  email: 'contact@example.com',
  website: 'http://52.22.19.104',
  version: '0.0.2'
});

App.icons({
  // iOS
  'iphone': 'resources/icons/ios/Icon-60.png',
  'iphone_2x': 'resources/icons/ios/Icon-60@2x.png',
  'iphone_3x': 'resources/icons/ios/Icon-60@3x.png',
  'ipad': 'resources/icons/ios/Icon-76.png',
  'ipad_2x': 'resources/icons/ios/Icon-76@2x.png',

  // Android
  'android_ldpi': 'resources/icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'resources/icons/android/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'resources/icons/android/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'resources/icons/android/drawable-xhdpi/ic_launcher.png'
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-320x568@2x.png',
  'iphone6': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-375x667@2x.png',
  'iphone6p_portrait': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-414x736@3x.png',
  'iphone6p_landscape': 'resources/splash/splash-375x667@2x.png',				//'resources/splash/splash-736x414@3x.png',

  // 'ipad_portrait': 'resources/splash/splash-768x1024.png',
  // 'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  // 'ipad_landscape': 'resources/splash/splash-1024x768.png',
  // 'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  'android_ldpi_portrait':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-200x320.png',
  'android_ldpi_landscape':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-320x200.png',
  'android_mdpi_portrait':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-320x480.png',
  'android_mdpi_landscape':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-480x320.png',
  'android_hdpi_portrait':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-480x800.png',
  'android_hdpi_landscape':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-800x480.png',
  'android_xhdpi_portrait':  'resources/splash/splash-375x667@2x.png', 			 // 'resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape':  'resources/splash/splash-375x667@2x.png' 			 // 'resources/splash/splash-1280x720.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

App.accessRule("*");

// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
