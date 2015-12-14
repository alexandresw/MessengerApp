# MessengerApp - COMP231 Computer Programmer Proj

## Requirements

* NodeJs
* Meteor
* MongoDB

## Quick Start

Run it:

    cd MessengerApp
    meteor

Access MongoDB:

    meteor mongo


Cordova plugin:
meteor add cordova:cordova-plugin-iosrtc@https://github.com/eface2face/cordova-plugin-iosrtc/tarball/7f730f983a9b29e5630c87d98bb281e93b8b0c86



<hook type="after_platform_add" src="hooks/iosrtc-swift-support.js" />



## Build

meteor run ios
cd .meteor/local/cordova-build
cordova platform remove ios
npm install
cordova platform add ios
cordova build ios


Google Android
Server API Key=AIzaSyAK7JOj06HRjFR7-Nz-vcVfZdo_Pxr-r7k
Sender ID=452021467302


Android APK Signature

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 android-release-unsigned.apk MessengerApp
$ANDROID_HOME/build-tools/23.0.1/zipalign 4 android-release-unsigned.apk production.apk

