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

